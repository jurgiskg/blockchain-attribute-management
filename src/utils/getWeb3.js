import Web3 from 'web3'

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    var results
    var web3 = window.web3

    var provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
    web3 = new Web3(provider)

    results = {
      web3: web3
    }
    console.log('using Local web3.');
    resolve(results)
  })
})

export default getWeb3
