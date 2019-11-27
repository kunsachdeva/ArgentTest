const Web3 = require('web3')
const { CONTRACT_ADDRESS, EMAIL, PRIVATE_KEY, ADDRESS, INFURA_KEY } = require('./env')
const ABI = require('./abi.min.json');

var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/' + INFURA_KEY));
var contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS)

var apply = async () => {
  var email = Web3.utils.keccak256(EMAIL);
  var encodedABI = contract.methods.apply(email).encodeABI();
  var nonce = await web3.eth.getTransactionCount(ADDRESS);
  var signedTxn = await web3.eth.accounts.signTransaction({
    from: ADDRESS,
    gasPrice: '10000000000',
    gas: 100000,
    data: encodedABI,
    to: CONTRACT_ADDRESS,
    nonce
  }, PRIVATE_KEY);
  var sentTxn = await web3.eth.sendSignedTransaction(signedTxn.rawTransaction)
  console.log(sentTxn);
}

var getApplicationId = async (email = EMAIL) => {
  var applicationID = await contract.methods.getApplicationID(email).call();
  return applicationID
}

apply()
  .then(() => getApplicationId()
    .then(console.log)
    .catch(console.error))
  .catch(console.error)