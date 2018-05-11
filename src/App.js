import React, { Component } from 'react'
import UserAttributeStoreContract from '../build/contracts/UserAttributeStore.json';
import getWeb3 from './utils/getWeb3';

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
      this.instantiateContract()
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
      this.setState({accounts: accounts});
      this.setState({userAddress: accounts[0]});
      storeContract.defaults({
        from: accounts[0],
        gas: 4600000
      })
      this.setState({attributeStoreContract: storeContract});

      storeContract.new().then((result) => {
        this.setState({attributeStoreInstance: result})
      });
    })

    
    
  }

  accessRequested = (error, response) => {
    console.log(response);
  }

  printAttributes = () => {
    this.state.userAttributeStoreInstance.getAttribute(0, {from: this.state.accounts[0]}).then((result) => {
      console.log(result);
    });
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>User: {this.state.userAddress}</h2>
              <p>User attribute store: {this.state.attributeStoreInstance && this.state.attributeStoreInstance.address}</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
              <p>{this.state.foodStore}</p>
              <button onClick={this.printAttributes}>Print attributes to console</button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
