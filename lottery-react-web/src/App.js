import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import { CONTACT_ADDRESS, CONTACT_ABI } from "./config";

function App() {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();

  const load = useCallback(
    async (web3) => {
      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0]);
    },
    [account]
  );

  const getBalance = useCallback(
    async (web3) => {
      const currentBalance = await web3.eth.getBalance(account);
      setBalance(currentBalance);
    },
    [balance]
  );

  useEffect(() => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    load(web3);
    getBalance(web3);
    const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
    console.log(contactList);
  }, [load, getBalance]);

  return (
    <div className="App">
      my account : {account}
      <br />
      balance : {balance}
    </div>
  );
}

export default App;
