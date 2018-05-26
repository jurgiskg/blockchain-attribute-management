import React, { Component } from 'react'
import UserAttributeStoreContract from '../build/contracts/UserAttributeStore.json';
import ServiceRegisterContract from '../build/contracts/ServiceRegister.json';
import getWeb3 from './utils/getWeb3';
import { attributes } from './attributes';
import { estimatePrices, estimateServiceRegisterPrices } from './priceEstimation';
import UserActions from './UserActions';
import ServiceActions from './ServiceActions';
import { ToastContainer, toast } from 'react-toastify';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

const contract = require('truffle-contract')

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userAddress: "",
      attributeStoreInstance: null,
      serviceRegisterInstance: null,
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

    const serviceRegisterContract = contract(ServiceRegisterContract);
    serviceRegisterContract.setProvider(this.state.web3.currentProvider);

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({ accounts: accounts });
      this.setState({ userAddress: accounts[0] });
      //set the default from to be the current user
      storeContract.defaults({
        from: accounts[0],
        gas: 4600000
      })

      storeContract.deployed().then((result) => {
        this.setState({ attributeStoreInstance: result });
        let accessRequestedEvent = result.AccessRequested();
        accessRequestedEvent.watch((err, result) => this.accessRequested(err, result));
        //accessRequestedEvent.stopWatching();
        estimatePrices(result, this.state.userAddress, this.state.accounts[2], 2, "Gpuvr9tLNzcAszMjCPXRMg==");
      });

      serviceRegisterContract.deployed().then((result) => {
        this.setState({ serviceRegisterInstance: result });
        estimateServiceRegisterPrices(result, "Secret code", "UAB Maxima");
      })
    })
  }

  accessRequested = (err, result) => {
    let message = <div>
      <h4>Service: {result.args.serviceAddress}</h4>
      <h4>User: {result.args.userAddress} </h4>
      <h4>Attribute ID: {result.args.attributeId.c[0]}</h4>
    </div>
    toast(message);
    this.checkServiceRegister(result.args.serviceAddress);
  }

  checkServiceRegister = (serviceAddress) => {
    this.state.serviceRegisterInstance.getService.call(serviceAddress).then((result) => {
      let msg = result[0] === "" ?
        <h3>Service has not yet registered!</h3> :
        <div>
          <h3>Service has already registered.</h3>
          <h4>Secret code: {result[0]}</h4>
          <h4>Name: {result[1]}</h4>
        </div>
      toast(msg);
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
          <ServiceActions userAddress={this.state.userAddress}
            attributeStoreInstance={this.state.attributeStoreInstance}
            serviceRegisterInstance={this.state.serviceRegisterInstance} />
          <ToastContainer autoClose={false} />
        </main>
      </div>
    );
  }
}

export default App
