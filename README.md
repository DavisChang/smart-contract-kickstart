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

## Q&A

@truffle/hdwallet-provider v2.0.2 has issues. Downgrade to version 2.0.0 and the code will work.

Use the following npm commands to downgrade:

```
npm remove @truffle/hdwallet-provider && npm i @truffle/hdwallet-provider@2.0.0

```