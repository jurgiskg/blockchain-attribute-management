import React, { Component } from 'react'
import UserAttributeStoreContract from '../build/contracts/UserAttributeStore.json';
import getWeb3 from './utils/getWeb3';
import { attributes } from './attributes';

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
      this.setState({ accounts: accounts });
      this.setState({ userAddress: accounts[0] });
      //set the default from to be the current user
      storeContract.defaults({
        from: accounts[0],
        gas: 4600000
      })
      this.setState({ attributeStoreContract: storeContract });

      storeContract.new().then((result) => {
        this.setState({ attributeStoreInstance: result })
      });
    })
  }

  accessRequested = (error, response) => {
    console.log(response);
  }

  grantAccess = () => {
    this.state.attributeStoreInstance.grantAccess(this.refs.attributeId.value,
      this.refs.serviceAddress.value,
      this.refs.attributeValue.value
    ).then((result) => {
      console.log(result);
    })
  }

  removeAccess = () => {
    this.state.attributeStoreInstance.removeAccess(this.refs.removeAttributeId.value,
      this.refs.removeServiceAddress.value
    ).then((result) => {
      console.log(result);
    })
  }

  getAttribute = () => {
    this.state.attributeStoreInstance.getAttribute.call(this.refs.getAttributeId.value,
      { from: this.refs.getAttributeFromAddress.value }
    ).then((result) => {
      console.log(result)
    })
  }

  getAttributeAsUser = () => {
    this.state.attributeStoreInstance.getAttributeAsUser.call(this.refs.getAttributeAsUserId.value,
      this.refs.getAttributeAsUserAddress.value).then((result) => {
      console.log(result);
    })
  }

  requestAttributeAccess = () => {
    this.state.attributeStoreInstance.requestAttributeAccess(this.refs.requestAttributeId.value,
      { from: this.refs.requestAttributeFromAddress.value }
    ).then((result) => {
      console.log(result);
    })
  }

  getUserActions = () => {
    return (
      <div className="pure-g" style={{"border-top": "1px solid"}}>
        <div className="pure-u-1-1">
          <h2>User actions</h2>
        </div>
        <div className="pure-u-1-4">
          <h3>Grant access</h3>
          <div>
            <label>Attribute Id </label>
            <input ref="attributeId" />
          </div>
          <div>
            <label>Attribute value </label>
            <input ref="attributeValue" />
          </div>
          <div>
            <label>Service address </label>
            <input ref="serviceAddress" />
          </div>

          <button onClick={this.grantAccess}>Send</button>
          <div>Check console for result</div>
        </div>
        <div className="pure-u-1-4">
          <h3>Remove access</h3>
          <div>
            <label>Attribute Id </label>
            <input ref="removeAttributeId" />
          </div>
          <div>
            <label>Service address </label>
            <input ref="removeServiceAddress" />
          </div>

          <button onClick={this.removeAccess}>Send</button>
          <div>Check console for result</div>
        </div>
        <div className="pure-u-1-4">
          <h3>Get attribute</h3>
          <div>
            <label>Attribute Id </label>
            <input ref="getAttributeAsUserId" />
          </div>
          <div>
            <label>Service address </label>
            <input ref="getAttributeAsUserAddress" />
          </div>
          <button onClick={this.getAttributeAsUser}>Send</button>
          <div>Check console for result</div>
        </div>

      </div>
    )
  }

  getServiceActions = () => {
    return (
      <div className="pure-g" style={{"border-top": "1px solid"}}>
        <div className="pure-u-1-1">
          <h2>Service actions</h2>
        </div>
        <div className="pure-u-1-4">
          <h3>Get attribute</h3>
          <div>
            <label>Attribute Id </label>
            <input ref="getAttributeId" />
          </div>
          <div>
            <label>Adress to send from</label>
            <input ref="getAttributeFromAddress" />
          </div>

          <button onClick={this.getAttribute}>Send</button>
          <div>Check console for result</div>
        </div>
        <div className="pure-u-1-4">
          <h3>Request attribute access</h3>
          <div>
            <label>Attribute Id </label>
            <input ref="requestAttributeId" />
          </div>
          <div>
            <label>Adress to send from</label>
            <input ref="requestAttributeFromAddress" />
          </div>

          <button onClick={this.requestAttributeAccess}>Send</button>
          <div>Check console for result</div>
        </div>
      </div>
    )
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

          {this.getServiceActions()}
          {this.getUserActions()}
        </main>
      </div>
    );
  }
}

export default App
