import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";

function App() {
  const [account, setAccount] = useState();
  const load = useCallback(async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.requestAccounts();

    setAccount(accounts[0]);
    console.log(account);
  }, [account]);

  useEffect(() => {
    load();
  }, [load, account]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
