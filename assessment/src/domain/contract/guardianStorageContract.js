import abi from '../abi/GuardianStorage.abi.min'
import Web3 from "web3";

var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + '7d0d81d0919f4f05b9ab6634be01ee73'));
const contract_address = '0xFF5A7299ff6f0fbAad9b38906b77d08c0FBdc9A7'
export default () => new web3.eth.Contract(abi, contract_address)