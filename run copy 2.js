const fs = require('fs');
const solc = require('solc')
const Web3 = require('web3');
console.log(Web3);

console.log("====>Initialize the provider.<====")
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
console.log(web3);


console.log("====>Get the contract code.<====")
let code = fs.readFileSync('contracts/Voting.sol').toString();
console.log(code);

console.log("====>Get compiled code.<====")
let compiledCode = solc.compile(code)
console.log(compiledCode);

var solcInput = {
    language: "Solidity",
    sources: {
        contract: {
            content: code
        }
    },
    settings: {
        optimizer: {
            enabled: true
        },
        evmVersion: "byzantium",
        outputSelection: {
            "*": {
                "": ["legacyAST", "ast"],
                "*": [
                    "abi",
                    "evm.bytecode.object",
                    "evm.bytecode.sourceMap",
                    "evm.deployedBytecode.object",
                    "evm.deployedBytecode.sourceMap",
                    "evm.gasEstimates"
                ]
            }
        }
    }
};
console.log("====>Get solcInput code.<====")
solcInput = JSON.stringify(solcInput);
console.log(solcInput);

console.log("====>Get compiled solcInput code.<====")
compiledCode = solc.compile(solcInput);
console.log(compiledCode);

console.log("====>Get abiDefinition.<====")
let abiDefinition = JSON.parse(compiledCode)['contracts']['contract']['Voting']['abi']
console.log(abiDefinition);

console.log("====>Get byteCode.<====")
byteCode = JSON.parse(compiledCode)['contracts']['contract']['Voting']['evm']['bytecode']['object']
console.log(byteCode);

var accounts;
var addTristanHash;
var contractInstance;

async function addCandidate(candidate, contractInstance, accounts) {
    addTristanHash = await contractInstance.methods.addCandidate(name).send({ from: accounts[1] });
            // .then(
            //     result => {
            //         console.log(result);
            //         contractInstance.methods.voteForCandidate('Tristan').send({ from: accounts[2] }).then(result => console.log("Vote for Tristan=" + result));
            //     });
    console.log(addTristanHash);
}

async function test() {
    accounts = await web3.eth.getAccounts();
    let VotingContract = new web3.eth.Contract(abiDefinition, { from: accounts[0], gas: 470000 })
    console.log(VotingContract);
    contractInstance = await VotingContract.deploy({ data: byteCode }).send({ from: accounts[0], gas: 4700000 });
    console.log("CONTRACT INSTANCE=" + contractInstance);
    addCandidate("Tristan", contractInstance, accounts);
    // addTristanHash = contractInstance.methods.addCandidate('Tristan').send({ from: accounts[1] })
    //         .then(
    //             result => {
    //                 console.log(result);
    //                 contractInstance.methods.voteForCandidate('Tristan').send({ from: accounts[2] }).then(result => console.log("Vote for Tristan=" + result));
    //             });
    // console.log(addTristanHash);
}

test();
// async function getAccounts() {
//     console.log("====>Get the accounts.<====")
//     //let list = await web3.eth.getAccounts().then(web3Accounts => { accounts = web3Accounts; return accounts; });
//     let list = await web3.eth.getAccounts();
//     //return new Promise((resolve, reject) => { … })
//     console.log("ADDRESSES\n" + list);
//     accounts = list;
//     //Promise.resolve(list);
// }
// async function deployContract(accounts) {
//     console.log("====>Get VotingContract.<====")
//     let VotingContract = new web3.eth.Contract(abiDefinition, { from: accounts[0], gas: 470000 })
//     console.log(VotingContract);
//     console.log("====>Deploy the contract.<====")
//     // console.log(accounts[0]);
//     //contractInstance = await VotingContract.deploy({ data: byteCode }).send({ from: accounts[0], gas: 4700000 }).then(instance => { contractInstance = instance; return contractInstance; });
//     contractInstance = await VotingContract.deploy({ data: byteCode }).send({ from: accounts[0], gas: 4700000 });
//     console.log("CONTRACT INSTANCE=" + contractInstance);
//     // contractPromise.then(function (val) {
//     //     console.log("Add candidate Tristan");
//     //     addTristanPromise = await val.methods.addCandidate('Tristan').send({ from: accounts[1] })
//     //         .then(
//     //             result => {
//     //                 console.log(result)
//     //             });
//     // });
// }

// let p = getAccounts();
// p.then(function (accounts) {
//     deployContract(accounts);
//     console.log(accounts);
// });




// let totalVotesTristan = 0;
// let totalVotesRave = 0;
// console.log("====>Get the accounts.<====")
// let promise = web3.eth.getAccounts().then(web3Accounts => { accounts = web3Accounts; return accounts; });
// let accounts = promise.then(function (val) {
//     console.log("ADDRESSES\n" + val);
//     console.log("====>Get VotingContract.<====")
//     let VotingContract = new web3.eth.Contract(abiDefinition, { from: accounts[0], gas: 470000 })
//     console.log(VotingContract);
//     console.log("====>Deploy the contract.<====")
//     // console.log(accounts[0]);
//     let contractPromise = VotingContract.deploy({ data: byteCode }).send({ from: accounts[0], gas: 4700000 }).then(instance => { contractInstance = instance; return contractInstance; });
//     let contractInstance = contractPromise.then(function (val) {
//         console.log("Add candidate Tristan");
//         val.methods.addCandidate('Tristan').send({ from: accounts[1] })
//             .then(
//                 result => {
//                     console.log(result);
//                     console.log("Vote for Tristan from accounts[2]");
//                     val.methods.voteForCandidate('Tristan').send({ from: accounts[2] }).then(result => console.log("Vote for Tristan=" + result));
//                     console.log("Get balances after voting for Tristan")
//                     let balances = accounts.map(account => web3.eth.getBalance(account));
//                     for (i = 0; i < balances.length; i++) {
//                         balances[i].then(function (val) {
//                             console.log(val);
//                         });
//                     }
//                     let res1 = val.methods.totalVotesFor("Tristan").call({ from: accounts[5] }).then(result => { return result });
//                     res1.then(function (val) {
//                         totalVotesTristan = val;
//                         console.log("Total votes for Tristan=" + val);
//                         console.log("Get balances after totaling votes for Tristan")
//                         let balances = accounts.map(account => web3.eth.getBalance(account));
//                         for (i = 0; i < balances.length; i++) {
//                             balances[i].then(function (val) {
//                                 console.log(val);
//                             });
//                         }
//                     });
//                 }
//             );
//         val.methods.addCandidate('Rave').send({ from: accounts[1] })
//             .then(
//                 result => {
//                     console.log(result);
//                     console.log("Vote for Rave from accounts[1]");
//                     let p1 = val.methods.voteForCandidate('Rave').send({ from: accounts[1] }).then(result => {console.log("Vote for Rave=" + result); return result;});
//                     p1.then(function(val) {
//                         console.log(val);
//                     });
//                     console.log("Vote for Rave from accounts[3]");
//                     //val.methods.voteForCandidate('Rave').send({ from: accounts[3] }).then(result => console.log(result));
//                     val.methods.voteForCandidate('Rave').send({ from: accounts[3] }).then(result => {console.log("Vote for Rave=" + result); return result;});
//                     console.log("Get balances after voting for Rave")
//                     let balances = accounts.map(account => web3.eth.getBalance(account));
//                     for (i = 0; i < balances.length; i++) {
//                         balances[i].then(function (val) {
//                             console.log(val);
//                         });
//                     }
//                     let res2 = val.methods.totalVotesFor("Rave").call({ from: accounts[5] }).then(result => { return result });
//                     res2.then(function (val) {
//                         totalVotesRave = val;
//                         console.log("Total votes for Rave=" + val);
//                         console.log("Get balances after totaling votes for Rave")
//                         let balances = accounts.map(account => web3.eth.getBalance(account));
//                         for (i = 0; i < balances.length; i++) {
//                             balances[i].then(function (val) {
//                                 console.log(val);
//                             });
//                         }
//                     });
//                 }
//             );

//         // let balances = accounts.map(account => web3.eth.getBalance(account));
//         // for (i = 0; i < balances.length; i++) {
//         //     balances[i].then(function (val) {
//         //         console.log(val);
//         //     });
//         // }

//         // let res2 = val.methods.totalVotesFor("Tristan").call({from: accounts[5]}).then(result => console.log(result.toString()));
//         // res2.then(function(val) {
//         //     console.log(val);
//         // });

//         // balances = accounts.map(account => web3.eth.getBalance(account));
//         // for (i = 0; i < balances.length; i++) {
//         //     balances[i].then(function(val){
//         //         console.log(val);
//         //     });
//         // }
//         return val;
//     });

//     return val;
// });