# blockchain-attribute-management
Prototype to test digital identity attribute management based on blockchain. Consists of React and Truffle application to test smart contracts and
interactive UI prototype of a mobile app.

Used for VU MIF Software Engineering bachelor thesis "Digital Identity Management using Blockchain".

## Getting started

To test smart contracts:

1. Download packages. Run 'npm install' in console.
2. Get local _ganache-cli_ blockchain network on your computer. Run 'npm install -g ganache-cli' in console.
3. Start local blockchain network. Run 'ganache-cli' in Administrator Powershell.
4. Compile and deploy smart contracts. Run 'truffle compile', 'truffle migrate' in another Administrator Powershell window.
5. Start up app. Run 'npm start' in console.
6. Test smart contracts in the app. Keep developer tools open to see relevant information in the browser console.

To try interactive prototype:

Run file _interactivePrototype.html_ in the browser. The prototype is stateful - to get back to initial state, refresh the browser window.