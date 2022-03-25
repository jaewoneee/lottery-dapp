import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import { CONTACT_ADDRESS, CONTACT_ABI } from "./config";

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [contactList, setContactList] = useState();
  const [pot, setPot] = useState();
  const [records, setRecords] = useState();
  const [winRecords, setWinRecords] = useState();
  const [keyword, setKeyword] = useState("");

  const load = useCallback(async (web3) => {
    let accounts = await web3.eth.requestAccounts();
    accounts = web3.utils.toChecksumAddress(accounts[0]);
    const currentBalance = await web3.eth.getBalance(accounts);

    setAccount(accounts);
    setBalance(currentBalance);
    console.log(1);
  }, []);

  const getContactList = useCallback(async (web3) => {
    const contact = await new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
    setContactList(contact);
    console.log(2);
  }, []);

  async function getCurrentPot() {
    let potValue = await contactList.methods.getPot().call();
    potValue = web3.utils.fromWei(potValue.toString(), "ether"); // ETH로 단위 변환
    console.log(potValue);
    setPot(`${potValue} ETH`);
  }

  async function makeBet() {
    const nonce = await web3.eth.getTransactionCount(account);
    const bet = await contactList.methods
      .betAndDistribute(keyword)
      .send({
        from: account,
        value: 5000000000000000,
        gas: 300000,
        nonce: nonce,
      })
      .on("transactionHash", (hash) => {
        console.log(hash);
      });
    load(web3);
    console.log(bet, nonce);
  }

  async function getBetEvents() {
    const recordArray = [];
    let events = await contactList.getPastEvents("BET", {
      fromBlock: 0,
      toBlock: "latest",
    });
    for (let i = 0; i < events.length; i++) {
      const record = {};
      record.index = parseInt(events[i].returnValues.index, 10).toString();
      record.bettor = events[i].returnValues.bettor;
      record.amount = parseInt(events[i].returnValues.amount, 10).toString();
      record.targetBlockNumber =
        events[i].returnValues.answerBlockNumber.toString();
      record.challenges = events[i].returnValues.challenges;
      record.win = "not revealed";
      record.answer = "0x00";

      recordArray.unshift(record);
    }
    console.log("레코드====>", recordArray);
    console.log(events);

    setWinRecords();
    setRecords(recordArray);
  }
  async function getWinEvents() {
    const recordArray = [];
    let events = await contactList.getPastEvents("WIN", {
      fromBlock: 0,
      toBlock: "latest",
    });
    for (let i = 0; i < events.length; i++) {
      const record = {};
      record.index = parseInt(events[i].returnValues.index, 10).toString();
      record.bettor = events[i].returnValues.bettor;
      record.amount = parseInt(events[i].returnValues.amount, 10).toString();
      record.challenges = events[i].returnValues.challenges;
      record.win = "WIN";
      recordArray.unshift(record);
    }
    console.log("레코드====>", recordArray);
    console.log(events);

    setRecords();
    setWinRecords(recordArray);
  }

  useEffect(() => {
    const w3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    setWeb3(w3);
    load(w3);
    getContactList(w3);
  }, [load, getContactList]);

  return (
    <div className="App">
      <h1>Lottery</h1>
      <div>
        <p>my account : {account}</p>
        <p>balance : {balance}</p>
        <input
          onChange={(e) => {
            setKeyword("0x" + e.target.value);
          }}
        ></input>
        <button type="button" onClick={getCurrentPot}>
          pot?
        </button>
        <button type="button" onClick={makeBet}>
          bet?
        </button>
        <button type="button" onClick={getBetEvents}>
          event?
        </button>
        <button type="button" onClick={getWinEvents}>
          Winner?
        </button>
        <div>{pot && <p>pot: {pot}</p>}</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Address</th>
            <th>Challenge</th>
            <th>Answer</th>
            <th>Pot</th>
            <th>Status</th>
            <th>AnswerBlockNumber</th>
          </tr>
        </thead>
        <tbody>
          {records?.map((item, i) => {
            return (
              <tr>
                <td>{item.index}</td>
                <td>{item.bettor}</td>
                <td>{item.challenges}</td>
                <td>{item.answer}</td>
                <td>{item.amount}</td>
                <td>{item.win}</td>
                <td>{item.targetBlockNumber}</td>
              </tr>
            );
          })}
          {winRecords?.map((item, i) => {
            return (
              <tr>
                <td>{item.index}</td>
                <td colSpan={2}>{item.bettor}</td>
                <td>{item.challenges}</td>
                <td>{item.win}</td>
                <td colSpan={2}>{item.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
