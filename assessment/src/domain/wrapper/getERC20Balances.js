import tokenContract from '../contract/tokenContract'
import { getERC20TokenTransactions } from '../network/etherscan'

export default async (address) => {
  var transactions = await getERC20TokenTransactions(address)
  var tokenContractAddresses = [...new Set(transactions.result.map(tx => tx.contractAddress))]
  return (await Promise.all(tokenContractAddresses.map(async contractAddress => {
    try {
      var balance = await tokenContract(contractAddress).methods.balanceOf(address).call()
      if (balance != 0) {
        var decimals = await tokenContract(contractAddress).methods.decimals().call()
        var symbol = await tokenContract(contractAddress).methods.symbol().call()
        return { name: symbol, balance: balance / Math.pow(10, decimals) }
      }
      else return null;
    } catch (e) {
      return null;
    }
  }))).filter(balance => balance != null)
}