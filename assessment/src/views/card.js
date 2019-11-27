import React from 'react';
import '../styles/card.css'
import validateAddress from '../utils/validateAddress';
import guardianStorageContract from '../domain/contract/guardianStorageContract';
import getBalance from '../domain/wrapper/getEthBalance';
import Input from '../components/input'
import Loader from '../components/loader'
import Error from '../components/error'
import getERC20Balances from '../domain/wrapper/getERC20Balances';

class Card extends React.Component {

  state = { isLoading: false, error: null, balance: 0, guardianCount: 0, erc20Balances: [] }

  render() {
    var { error, isLoading } = this.state
    return <div className='card'>
      <Input onChange={this.onChange.bind(this)} />
      {error && <Error text={error} />}
      {!error && isLoading && <Loader />}
      {!error && !isLoading && this.renderCardContent()}
    </div>
  }

  renderCardContent() {
    var { balance, guardianCount, erc20Balances } = this.state
    return <div className="card-content">
      <label>You have</label>
      <div className="value">{balance.toFixed(4)} ETH</div>
      <label>with Guardians</label>
      <div className="value">{guardianCount}</div>
      {erc20Balances.length != 0 && <label>and</label>}
      {erc20Balances.map(erc20Balance => <div key={erc20Balance.name} className="erc20value">{erc20Balance.balance.toFixed(4)} {erc20Balance.name}</div>)}
    </div>
  }

  async onChange(evt) {
    var address = evt.target.value;
    var isAddress = validateAddress(address)
    if (!isAddress) {
      this.setState((state, props) => Object.assign({}, state, { error: 'Invalid address' }))
      return;
    }

    this.setState((state, props) => Object.assign({}, state, { error: null, isLoading: true }))

    var balance = await getBalance(address)

    var erc20Balances = await getERC20Balances(address)

    var guardianCount = await guardianStorageContract().methods.guardianCount(address).call()

    this.setState((state, props) => Object.assign({}, state, { balance, guardianCount, erc20Balances, isLoading: false }))
  }
}

export default Card;