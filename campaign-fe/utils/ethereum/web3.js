import Web3 from 'web3'
 
let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" })
  web3 = new Web3(window.ethereum)
} else {
  // We are on the server *OR* the user is not running metamask.
  // Connect to Rinkebt test network by infura.
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/9428e1df1bdd468e9c748fdf057ebbf9"
  );
  web3 = new Web3(provider)
}
 
export default web3