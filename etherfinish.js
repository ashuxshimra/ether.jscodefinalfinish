//Synchronous -> Solidity is a synchronous that is code executed line by line
// ASynchronous -> Javascript is ASynchronous by default that is vice versa of it

//Example of cooking of popcorn
//Synchronous
// 1. Put the popcorn in microwave
// 2. Wait for popcorn to finish
// 3. Pour drinks for everyone

// ASynchronous
// 1. Put the popcorn in microwave -> functions that have waiting period is called Promise that is promise based function
// 2. Pour drinks for everyone
// 3. Wait for popcorn to finish

// Promise can be :
// pending - so waiting for popcorn to finish is the pending state
// fulfilled - and when popcorn finsihed then promise will gave fulfilled state
// rejected - if in half way we abort the process then it is rejected state

const ethers= require("ethers"); //importing ether package so that it could be used and storing in the ether variable of const type
const fs= require("fs");   //this too is a package which is lke a object used to access and read files as shown in below code , install first by "yarn add fs"
require("dotenv").config();//importing .env file so as to use 
    
async function main() {
  //all of our contract code and stuff will go inside the main function
  //note that to compile our contract, we will use solc which is basically a package used to compile sc in code editor such as vsc and hence use yarn or npm package manager to install solc package so here lets use yarn as : yarn add solc@0.8.7-fixed because we are writing solidity contract version 0.8.7 so for it to be compatible with solc doing it, note in terminal write corepack enable and then yarn will be installed so now use yarn
  //also in this folder you have installed solc and so  no worries but so take care of it when u need to compile the sc , or globally as well the solc can be installed as per the commands
  // you can type "yarn solcjs --help" and details of options will be displayed so acc you can create a script under dependencies for compile so that when in terminal typed compile it will take care of all this options so see page 40 and till page 42-43, u get everything
  // to compile the contracts you can go to terminal and type yarn compile after adding the dependency in package.json -> adding what to run when typed 'compile' just see 6.53.0 for doubts
  //and now to deploy this contract on a blockchain network we need a fake blockchain network , so we can use a test environment called as ganache which provides fake accounts using which u can deploy the contract on this fake ganache blockchain network we also have rpc url which is bascially a url for these fake networks see page 44
  // http://127.0.0.1:7545 -> hence using this url we can make api calls and like interact with the network node
  // so to interact with the node or even deploy and stuff here ether js comes into play. hence using this we can depploy the contract to bc network or also ganche fake network as well by writing suitable deploy command also to install the ether.js package go to terminal and "yarn add ethers" and hence once the installation is done you can go to the dependencies where the packages are installed and u can see that ether.js is present along with version just like solc
  // now to deploy our contract on a blockchain network(here ganache with the help of rpc url) we can use ether package and thus for that import the ether package as done at the top and thus this is how the script is always that is always the import of packages at top , main function in betweem and then the calling part where error code was done at the bottom
  //console.log("hi"); //to run this using node , go to terminal and type "node deploy.js" that is name of file and press enter this way it will run js code in backend
  //let variable = 8;
  //console.log(variable);


  //now as the packages suitable are imported you can use them to go ahead and deploy the contrac
  const provider=new ethers.providers.JsonRpcProvider(process.env.RPC_URL); //this is line to get the provider blockchaain network where contract will be deployyed and thus in brackets we paste the rpc ganache network url on which the contract will be deployed and storing in the variable provider of const type
  //now we need the wallet that is the account from which we will take fee to deploy this contract and so we get that by selecting one of the fake account of ganache and copying its private key and thus pasting in the below line for getting the wallet for deployment
  const wallet= new ethers.Wallet(process.env.PRIVATE_KEY, provider); //line for getting the wallet from which money will be charged to deploy on a blockchain network provider and so ", provider" as well
//hence ethers package used for which network to deploy and from which account to deploying , hence so clear now


//hence now to start deployment of contract since we have the bc n/w and the wallet , abi and binary form (encoded) of contract is needed so we will get them from the compilation deltails as we got after compiling this sc from the files created for it so reading from them as :
const abi= fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8"); //hence with the help fs we read the file synchrounously from ("location as done that is from ***.abi file") in order to get the abi of the compiled sc and also adding "utf8" which is like used for encoding this abi and thats all just add and storing it in abi variable
//similarly we get the binary code of contract as well :
const binary= fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8"); //storing the binary code by reading from the compiled file after compilation of contract using solc in the binary variable

//now we have everything so in ethers package we have a object named contractFactory which is used to deploy the contract so:
const contractFactory= new ethers.ContractFactory(abi , binary , wallet); //so passing it all to the object contractfactory and storing in contractFactory variable and now this variable has abi and binary for deployment and wallet as well for signing the transaction hence deploy as :
console.log("Deploying contract , please wait........");
const contract= await contractFactory.deploy(); //await keyword as deploying sc takes bit time and so for it to work smooth need to add this so that deployment is successful and then we can move forward , also storing the deployed contract in the contract variable
console.log(`Contract Address ${contract.address}`); //getting the address where the contract is deployed in the blockchain network
// console.log(contract);  //now lets run this and see the deployment and thus go to terminal and write node deploy.js to run this code.
// hence wrote a sc and then separately compiled it using the solc , by which got the files specifying its abi and the binary code of the contract that is the compilation details , and then using the ethers package to get the network rpc where sc to be deployed and then the wallet from which the transaction will be signed and then the using the contractFactory object kept everything and then deployed by await 
// once the contract is deployed you will see the output which will give us the chain id, gas, block number , from which account fee charged to deploy , hash-id etc etc and when u notice that the account used from ganache has some money deducted which was used to sign transaction in order to deploy see page-45-47 for o/p of deployed contract 

//now to get the receipts of transaction and receipts of deployment , note that you get transaction receipt only when you get the confirmation that block is attached to chain by waiting for one more block and you always get the deployment transactioin whenever u perform it so:
// note that binary code of sc is like the sc but represented in the form of code
await contract.deployTransaction.wait(1);//that is waiting deployTransaction of the deployed contract by one more block so this is the transactionReceipt
// console.log("This is the deploy transaction receipt");
// console.log(deployTransaction);
// console.log("This is the transaction receipt");
// console.log(transactionReceipt);

// console.log("Lets deploy the contract with transaction only")
//so when we deploy the contract first we compile it and then we get the abi and binary form of it as well in such case you sign the contract and then send it to the network and so while deploying the terms of transaction which are mined in the block after deployment like gasUsed , nonce etc -> these terms of tx are involved in the transaction either through ganache or remix from behind and so you sign these all along with the binary data which is the contract and this data is in the transaction which is all signed and later this transaction consisting of all is deployed
//now you can deploy with transaction only where you use the binary data of contract and specify it in transaction , then add your limits in transaction terms such as gasPrice etc , and then sign that transaction which will be deployed to the network so:

// const nonce=await wallet.getTransactionCount(); //this will give the number of transaction count , nonce is used to uniquely identy a transaction so a new block that is number of transaction/blocks done and on next block this needed to be deployed when signed 
// const tx={
//   nonce: nonce ,
//   gasPrice: 20000000000 ,//just copied from ganche for sake of suitable value
//   gasLimit: 6721975 ,
//   to: null , //as not sending anything as here we creating and deploying sc
//   data: 0x608060405234801561001057600080fd5b506107a0806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063471f7cdf146100675780636057361d146100855780637230bce8146100a15780638bab8dd5146100bd5780639e7a13ad146100ed578063a6b7fc5b1461011e575b600080fd5b61006f61013c565b60405161007c9190610559565b60405180910390f35b61009f600480360381019061009a9190610440565b610142565b005b6100bb60048036038101906100b6919061046d565b61014c565b005b6100d760048036038101906100d291906103f7565b6101dc565b6040516100e49190610559565b60405180910390f35b61010760048036038101906101029190610440565b61020a565b604051610115929190610574565b60405180910390f35b6101266102c6565b6040516101339190610559565b60405180910390f35b60005481565b8060008190555050565b600260405180604001604052808481526020018381525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101b29291906102cf565b505050816001826040516101c69190610542565b9081526020016040518091039020819055505050565b6001818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b6002818154811061021a57600080fd5b90600052602060002090600202016000915090508060000154908060010180546102439061066d565b80601f016020809104026020016040519081016040528092919081815260200182805461026f9061066d565b80156102bc5780601f10610291576101008083540402835291602001916102bc565b820191906000526020600020905b81548152906001019060200180831161029f57829003601f168201915b5050505050905082565b60008054905090565b8280546102db9061066d565b90600052602060002090601f0160209004810192826102fd5760008555610344565b82601f1061031657805160ff1916838001178555610344565b82800160010185558215610344579182015b82811115610343578251825591602001919060010190610328565b5b5090506103519190610355565b5090565b5b8082111561036e576000816000905550600101610356565b5090565b6000610385610380846105c9565b6105a4565b9050828152602081018484840111156103a1576103a0610733565b5b6103ac84828561062b565b509392505050565b600082601f8301126103c9576103c861072e565b5b81356103d9848260208601610372565b91505092915050565b6000813590506103f181610753565b92915050565b60006020828403121561040d5761040c61073d565b5b600082013567ffffffffffffffff81111561042b5761042a610738565b5b610437848285016103b4565b91505092915050565b6000602082840312156104565761045561073d565b5b6000610464848285016103e2565b91505092915050565b600080604083850312156104845761048361073d565b5b6000610492858286016103e2565b925050602083013567ffffffffffffffff8111156104b3576104b2610738565b5b6104bf858286016103b4565b9150509250929050565b60006104d4826105fa565b6104de8185610605565b93506104ee81856020860161063a565b6104f781610742565b840191505092915050565b600061050d826105fa565b6105178185610616565b935061052781856020860161063a565b80840191505092915050565b61053c81610621565b82525050565b600061054e8284610502565b915081905092915050565b600060208201905061056e6000830184610533565b92915050565b60006040820190506105896000830185610533565b818103602083015261059b81846104c9565b90509392505050565b60006105ae6105bf565b90506105ba828261069f565b919050565b6000604051905090565b600067ffffffffffffffff8211156105e4576105e36106ff565b5b6105ed82610742565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561065857808201518184015260208101905061063d565b83811115610667576000848401525b50505050565b6000600282049050600182168061068557607f821691505b60208210811415610699576106986106d0565b5b50919050565b6106a882610742565b810181811067ffffffffffffffff821117156106c7576106c66106ff565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61075c81610621565b811461076757600080fd5b5056fea2646970667358221220f35db469c2affd4e040fc10fd965c677086bcbf4d6652142b5f7aade5a0a939364736f6c63430008070033 ,
//  //in above put the 0x(paste the binary code) and then this is the sc that you will deploy using transaction data only , usually we deploy contract sign the tx and then this transaction when saw for deployment shows the sc-data , gasUsed etc(this transaction basically contains all it ) so this transaction is stored in block so here inplace of doinng it lets deploy by creaetung that tx specifying everything in first place  
//   chainId: 5777 //chain id is the id of the network where you plan to sign and deploy the transaction and contract so for every n/w the chainid different here we want to deploy to ganache n/w so usingh its chainid
//  };
// //now sending this transaction by signing it to the network 
// const sentTxResponse=await wallet.sendTransaction(tx); //using the ether package it has these function(to interact/obtain info) , so this using wallet , we have send the transaction and this sendTransaction includes the sign part of transaction as well so this transaction is signed and sent to the network
// await sentTxResponse.wait(1); //doing one block confirmation further
// console.log(sentTxResponse); //so it will show the details of the hash and how the tx is deployed in the block of n/w and note transaction has all this info of sc-bin-data, gasUsed,nonce etc we sign it and then deploy it which in turn deploys our sc, so here we made our own tx and deployed that only
// //the above tx creation then signing and sending doesnt necessarily has to be done by you , just know this can also be done and for deployment keep following general steps so commenting them out


//now since the 'contract' is deployed and let's interact with this contract using ether.js so interacting involves the functionalities button we can in deployed contracts so lets interact by calling those functions and also this is why we use abi , that is to know the functionalities of sc so that it can be interacted
const currentFavoriteNumber= await contract.retrive(); //so u can go to the sc and see the retrive function made there it returns the favorite number entered and so since this is a view function and it doesnt change the state of blockchain n/w it will not need any gas.
//note that js doesnt understand big integer numbers so to make sure no problem arises js understands string well , and thus even for the number we get it in form of string or enter number to store in form of string as done below the obtained number will be some integer but converted into string 
console.log(`The Current Favorite Number as of now is ${currentFavoriteNumber.toString()}`); //in js to address a statement like a variable -> use `` and use ${variable}
const transactionResponse= await contract.store("7"); //for any interaction with contract deployed on blockchain n/w give time by await keyword so here stored number 7 in form of string as discussed , the storing will change the state of bc n.w and thus gas fee will be charged which we are funding using fake ganche n.w
const transactionReceipt= await transactionResponse.wait(1); //to get transaction Receipt of transactionResponse where we stored 7 number , we wait for one block confirmation and it will give us transaction receipt of this as storing the number in blockchain will have its so getting its receipt
const updatedFavoriteNumber=await contract.retrive();
console.log(`The updated favorite number is ${updatedFavoriteNumber.toString()}`)
//see page 49 for the transactions for storing 
//when we share the code anywhere note that ur private key if got by someone then it means they have ur funds so make sure to hide ur private key since this key is used to sign transactions and fund so we use env files see page -50
//so now let us deploy this contract to the real testnet(in this case goerli test network) or maybe a mainnet(can be original etherium network and for that real asset eth needed) , and then interact with contract deployed on a testnet
//so inorder to deploy this on a testnet , we can go and use Alchemy , it provides node services and contains all types of blockchain network(Etherium mainnet , goerli testnet etc etc) see page 53 for deployment
}
main()
  .then(() => process.exit(0)) //since our main function is async we and while calling in order to wait and print if there is any error it gets , we have used this code just copied and pasted
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//Set up Movie night
// a)cook popcorn
// b)pour drinks
// c)start movie

//so we make the function for above and a and b has to finsih then only we can start movie hence a and b are waiting functions that is promise has to be returned from them whether fulfilled or rejected that is await for them first and then move on
//so we will use a lot of async function where we will await for a statement say while deploying sc we have to await otherwise even before it being deployed , if it goes further then code wont work
async function setupMovienight() {
  await cookPopcorn(); //this await implies it is calling a waiting function that a function which will take time and return a promise that is fulfilled or rejected and then move on to the next line
  await pourDrinks();
  startMovie(); //now after finishing the above functions only we can start the movie
}
//when we deploy a sc ? wait for it to be deployed
function cookPopcorn() {
  // some code here
  return Promise(/*some code here*/);
}

