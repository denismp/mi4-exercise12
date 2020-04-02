# mi4-exercise12
Create a Simple Voting System

Exercises: Create a Simple Voting System
Goal
You will build a voting application where you will initialize a set of candidates who will be contesting in the election and then vote for the candidates. The votes will be stored on the blockchain. You will go through the process of implementing the voting contract, deploying to the local test blockchain, and interacting with the contract methods.
Prerequisites
•	NodeJS v13.5.0: https://nodejs.org/en/
•	Ganache CLI v6.9.1
•	Truffle v5.1.17
•	Solc v0.5.8
•	Windows Build Tools
npm install --global --production windows-build-tools
Problem 1.	Create the Smart Contract
1.	Create a new folder named “Voting System”.
a.	Open your command prompt and go in the folder. We will now refer to this as your workspace.

2.	In your workspace, initialize a truffle and node project:
truffle init
npm init

3.	Install solc and web3 on your workspace.
npm install solc@0.5.8
npm install web3@1.2.6

4.	Create a new contract called Voting.sol and put it in the contracts/ folder.
a.	Implement a public field, which will keep track of each candidate’s votes.
b.	Implement a public array to store every candidate.
c.	Implement a addCandidate(string) function, which adds the candidate to an array.
d.	Implement a validCandidate(string) function, which checks whether the given candidate is contained in the array.
e.	Implement a voteForCandidate(string) function, which votes for a given candidate.
f.	Implement a totalVotesFor(string) function, which returns the count of votes for a candidate.
g.	To be able to compare strings we can first hash them with keccak256() and compare their hashes. 

Sample contract source code is available here: 
https://github.com/kingsland-innovation-center/voting-contract/blob/master/voting.sol
 
 

5.	In the migrations folder create file 2_deploy_contracts.js and add the following code which will deploy the smart contract:
 
 
Problem 2.	Setup the Development Environment
1.	Install ganache-cli:
Remember, you may need administrator permissions if errors occur.
npm install –g ganache-cli@6.9.1

2.	Run ganache-cli:
Do not close this terminal. Let it run in the background as we continue with other tasks.
ganache-cli

 
3.	On a new terminal in your workspace, run node:
  
Problem 3.	Compiling the Contract
1.	Require the web3 library:
 
2.	Initialize the provider:
 
Tip: If the console gets messy due to long outputs, press CTRL + L to clear the console.
3.	Retrieve and store all our available accounts. We can do that with web3.eth.getAccounts(). This returns a promise, so what we are going to do is to store the data in an accounts array for easy access.
 
4.	Read the contract and store it as a variable so we can have an easy access for later use:
 
5.	Require solidity compiler (solc):
 
6.	Compile the code. At this point, you would already have the bytecode, metadata, interface, and so on:
 
If you run into solc compiler issues, like this:
 
Copy the code below (otherwise, disregard and continue):
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
solcInput = JSON.stringify(solcInput);
compiledCode = solc.compile(solcInput);

If you’re curious on what each property does, see the docs here:
https://solidity.readthedocs.io/en/v0.5.0/using-the-compiler.html#compiler-input-and-output-json-description
  
Problem 4.	Deploy the Contract
1.	Retrieve the abiDefinition in JSON format by calling the command: 
 
2.	Create the instance of the contract.
Notice that we first pass the ABI definition then we pass an object where we specify the account that we want to deploy from and the gas limit. In our case, we have a previous accounts array with all available accounts and we use the one at index 0 (the first account).
 
3.	Lastly, we need the byteCode of the contract. Use this code to retrieve it:
 
4.	Now we will deploy the contract and store the instance of the contract in contractInstance:
 
  
Problem 5.	Interact with the Contract
1.	Interact with the deployed contract starting with adding candidates (Tristan and Rave) and sending the transactions from a different account (Account 1). 
Remember, we have all accounts in our accounts[] variable declared previously.
 
 
We can see the information about the transactions that happened during the method executions and we can see that as well in our ganache.
 
2.	Vote for Candidates:
 
 
 
Let’s check Ganache again and see what happened there 
It should have some new transactions as writing to the contract costs ether:
 

3.	Check the votes for the candidates. Notice that we don’t use the .send() function here as reading from contracts is free, so we use .call() instead.

Before we proceed, check the balances first:
 

Check the total votes using Account at index 5:
 
 
Check our balances again to make sure that this reading didn’t take any ETH from us.
 	
And, it seems that there have been no new transactions.
We have determined that reading from a contract is free.
 
What to Submit?
Submit a zip file containing images of: 
•	Your terminal during contract deployment.
•	Your terminal when adding candidates.
•	Your terminal when voting for candidates.
•	Your terminal when reading values from the contract.
•	Ganache transactions.
Submit the zip file in the course platform.
