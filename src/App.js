import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import UserAttributeStoreContract from '../build/contracts/UserAttributeStore.json';
import getWeb3 from './utils/getWeb3';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
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
    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract);
    const userAttributeStore = contract(UserAttributeStoreContract);

    simpleStorage.setProvider(this.state.web3.currentProvider)
    userAttributeStore.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance;
    var userAttributeStoreInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((x) => {
        simpleStorageInstance = x
        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(20, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })

      userAttributeStore.deployed().then(x => {
        userAttributeStoreInstance = x;
        return userAttributeStoreInstance.addAttribute();
      }).then(result => {
        console.log(result);
      })
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
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
              <p>{this.state.foodStore}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
