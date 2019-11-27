import Web3 from "web3";

var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + '7d0d81d0919f4f05b9ab6634be01ee73'));
export default async (address) => (await web3.eth.getBalance(address)) / Math.pow(10, 18)