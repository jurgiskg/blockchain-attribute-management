import React, { Component } from 'react'
import UserAttributeStoreContract from '../build/contracts/UserAttributeStore.json';
import getWeb3 from './utils/getWeb3';
import { attributes } from './attributes';
import UserActions from './UserActions';
import ServiceActions from './ServiceActions';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

const contract = require('truffle-contract')

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userAddress: "",
      attributeStoreContract: null,
      attributeStoreInstance: null,
      web3: null,
      accounts: []
    }
  }


  componentWillMount() {
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })
      this.instantiateContract();
    })
      .catch(() => {
        console.log('Error finding web3.')
      })
  }

  instantiateContract() {

    const storeContract = contract(UserAttributeStoreContract);
    storeContract.setProvider(this.state.web3.currentProvider);


    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({ accounts: accounts });
      this.setState({ userAddress: accounts[0] });
      //set the default from to be the current user
      storeContract.defaults({
        from: accounts[0],
        gas: 4600000
      })
      this.setState({ attributeStoreContract: storeContract });

      storeContract.new().then((result) => {
        this.setState({ attributeStoreInstance: result });
        this.estimatePrices(result);
      });
    })
  }

  estimatePrices = (instance) => {
    
    instance.grantAccess.estimateGas(2, this.state.accounts[3], true, "").then((result) => {
      console.log(`grantAccess(2, this.state.accounts[1], "tZM11CdI7z4mZJc+/5kg3Q=="): ${result}`)
    })
    instance.removeAccess.estimateGas(2, this.state.accounts[1]).then((result) => {
      console.log(`removeAccess(2, this.state.accounts[1]): ${result}`)
    })
    instance.getAttribute.estimateGas(2, this.state.userAddress, this.state.accounts[1]).then((result) => {
      console.log(`getAttribute(2, this.state.userAddress, this.state.accounts[1]): ${result}`)
    })
    instance.requestAccess.estimateGas(2, this.state.userAddress).then((result) => {
      console.log(`requestAccess(2, this.state.userAddress): ${result}`);
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-2">
              <h2>User: {this.state.userAddress}</h2>
              <p>User attribute store: {this.state.attributeStoreInstance && this.state.attributeStoreInstance.address}</p>
              <br />
              <h3>Attributes</h3>
              {Object.keys(attributes).map(e =>
                <div key={e}>{e} - {attributes[e]}</div>
              )}
              <br />
            </div>
            <div className="pure-u-1-2">
              <h3>Other addresses:</h3>

              {this.state.accounts.map((acc, index) => (
                index !== 0 ? <div key={index}>{acc}</div> : ""
              ))}
            </div>
          </div>

          <UserActions userAddress={this.state.userAddress} attributeStoreInstance={this.state.attributeStoreInstance} />
          <ServiceActions userAddress={this.state.userAddress} attributeStoreInstance={this.state.attributeStoreInstance} />
        </main>
      </div>
    );
  }
}

export default App
