const URI = 'http://api.etherscan.io/api'
const KEY = 'Z63RV9TNS8I6X546K2NHM7PA9BASR4FINU';

export var getERC20TokenTransactions = async (address) => await (await fetch(URI+'?module=account&action=tokentx&address=' + address + '&startblock=0&endblock=999999999&sort=asc&apikey='+KEY)).json()