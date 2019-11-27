import minAbi from '../abi/token.abi'
import Web3 from "web3";

var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + '7d0d81d0919f4f05b9ab6634be01ee73'));

export default (contract_address) => new web3.eth.Contract(minAbi, contract_address)