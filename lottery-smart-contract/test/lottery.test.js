const Lottery = artifacts.require("Lottery");
const { assert } = require("chai");
const assertRevert = require("./assertRevert");
const expectEvent = require("./expectEvent");

contract("Lottery", function ([deployer, user1, user2]) {
  let lottery;
  let betAmount = 5 * 10 ** 15;
  let bet_block_interval = 3;

  beforeEach(async () => {
    lottery = await Lottery.new();
  });

  it("getPot should return current pot", async () => {
    console.log("Basic test");
    let pot = await lottery.getPot();
    assert.equal(pot, 0);
  });

  describe("Bet", function () {
    it("should fail when the bet money is not 0.005 ETH", async () => {
      // 실패
      await assertRevert(
        lottery.bet("0xab", { from: user1, value: 4000000000000000 })
      );
      // transaction object {chainId, value, to, from, gas(Limit), gasPrice}
    });
    it("should put the bet to the bet queue with 1 bet", async () => {
      // bet
      let receipt = await lottery.bet("0xab", {
        from: user1,
        value: betAmount,
      });
      let pot = await lottery.getPot();
      assert.equal(pot, 0);

      // 컨트랙트 밸런스 체크
      let contractBalance = await web3.eth.getBalance(lottery.address);
      assert.equal(contractBalance, betAmount);

      // 베팅 info 체크
      let currentBlockNumber = await web3.eth.getBlockNumber();
      let bet = await lottery.getBetInfo(0);
      assert.equal(
        bet.answerBlockNumber,
        currentBlockNumber + bet_block_interval
      );
      assert.equal(bet.bettor, user1);
      assert.equal(bet.challenges, "0xab");

      // 로그 체크
      await expectEvent.inLogs(receipt.logs, "BET");
    });
  });

  describe.only("isMatch", function () {
    let blockHash =
      "0xabcc1a28933eddcad99d4226f32b5e9ad8a4cbf024a3f9a88d07fa12a4727202";
    it("should be bettingresult.win when two characters match", async () => {
      let matchingResult = await lottery.isMatch("0xab", blockHash);
      assert.equal(matchingResult, 1);
    });
    it("should be bettingresult.draw when one character matches", async () => {
      let matchingResult = await lottery.isMatch("0xac", blockHash);
      console.log("matchingResult", matchingResult);
      assert.equal(matchingResult, 2);
    });
    it("should be bettingresult.fail when no character matches", async () => {
      let matchingResult = await lottery.isMatch("0xcd", blockHash);
      console.log("matchingResult", matchingResult);
      assert.equal(matchingResult, 0);
    });
  });
});
