# smart-contract-kickstart

## Start this project
Don't forget your HDWalletProvider setting in ethereum/deploy.js

```
// deploy.js
const provider = new HDWalletProvider(
  'Your MetaMask Mnemonic Phrase',
  'https://rinkeby.infura.io/v3/9428e1df1bdd468e9c748fdf057ebbf9'
)
```

Command Line
```
// install packages
npm install

// run smart contract test
npm run test

// deploy smart contract
node ethereum/deploy.js
```
