const Lottery = artifacts.require("Lottery");
const { assert } = require("chai");
const assertRevert = require("./assertRevert");
const expectEvent = require("./expectEvent");

contract("Lottery", function ([deployer, user1, user2]) {
  let lottery;
  let betAmount = 5 * 10 ** 15;
  let betAmountBN = new web3.utils.BN("5000000000000000");
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
  describe("Distribute", function () {
    describe("When the answer is checkable", function () {
      it("should give the user the pot when the answer matches", async () => {
        // 두 글자 다 맞았을 때
        await lottery.setAnswerForTest(
          "0xabcc1a28933eddcad99d4226f32b5e9ad8a4cbf024a3f9a88d07fa12a4727202",
          { from: deployer }
        );
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 1 -> 4
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 2 -> 5
        await lottery.betAndDistribute("0xab", {
          from: user1,
          value: betAmount,
        }); // 3 -> 6(succeess : 7번 블럭까지 생성되어야 확인가능)
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 4 -> 7
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 5 -> 8
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 6 -> 9

        let potBefore = await lottery.getPot(); // 0.01 ETH
        let user1BalanceBefore = await web3.eth.getBalance(user1);
        let receipt7 = await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 7 -> 10 : user1에게 pot이 간다.
        let potAfter = await lottery.getPot(); // 0
        let user1BalanceAfter = await web3.eth.getBalance(user1); // 0.015 ETH

        // pot 변화량 확인
        assert.equal(
          potBefore.toString(),
          new web3.utils.BN("10000000000000000").toString()
        );

        assert.equal(potAfter.toString(), new web3.utils.BN("0").toString());

        // user의 밸런스를 확인
        user1BalanceBefore = new web3.utils.BN(user1BalanceBefore);
        assert.equal(
          user1BalanceBefore.add(potBefore).add(betAmountBN).toString(),
          new web3.utils.BN(user1BalanceAfter).toString()
        );
      });

      it("should give the user the amount user bet when a single character matches", async () => {
        // 한 글자 맞았을 때
        await lottery.setAnswerForTest(
          "0xabcc1a28933eddcad99d4226f32b5e9ad8a4cbf024a3f9a88d07fa12a4727202",
          { from: deployer }
        );
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 1 -> 4
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 2 -> 5
        await lottery.betAndDistribute("0xaf", {
          from: user1,
          value: betAmount,
        }); // 3 -> 6(succeess : 7번 블럭까지 생성되어야 확인가능)
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 4 -> 7
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 5 -> 8
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 6 -> 9

        let potBefore = await lottery.getPot(); // 0.01 ETH
        let user1BalanceBefore = await web3.eth.getBalance(user1);
        let receipt7 = await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // // 7 -> 10 : user1에게 pot이 간다.
        let potAfter = await lottery.getPot(); // 0.01 ETH
        let user1BalanceAfter = await web3.eth.getBalance(user1); // before + 0.005 ETH

        // pot 변화량 확인
        assert.equal(potBefore.toString(), potAfter.toString());

        // user의 밸런스를 확인
        user1BalanceBefore = new web3.utils.BN(user1BalanceBefore);
        assert.equal(
          user1BalanceBefore.add(betAmountBN).toString(),
          new web3.utils.BN(user1BalanceAfter).toString()
        );
      });
      it.only("should get the eth of user when the answer does not match at all", async () => {
        // 다 틀렸을 때
        await lottery.setAnswerForTest(
          "0xabcc1a28933eddcad99d4226f32b5e9ad8a4cbf024a3f9a88d07fa12a4727202",
          { from: deployer }
        );
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 1 -> 4
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 2 -> 5
        await lottery.betAndDistribute("0xef", {
          from: user1,
          value: betAmount,
        }); // 3 -> 6(succeess : 7번 블럭까지 생성되어야 확인가능)
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 4 -> 7
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 5 -> 8
        await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // 6 -> 9

        let potBefore = await lottery.getPot(); // 0.01 ETH
        let user1BalanceBefore = await web3.eth.getBalance(user1);
        let receipt7 = await lottery.betAndDistribute("0xef", {
          from: user2,
          value: betAmount,
        }); // // 7 -> 10 : user1에게 pot이 간다.
        let potAfter = await lottery.getPot(); // 0.015 ETH
        let user1BalanceAfter = await web3.eth.getBalance(user1); // before + 0.005 ETH

        // pot 변화량 확인
        assert.equal(
          potBefore.add(betAmountBN).toString(),
          potAfter.toString()
        );

        // user의 밸런스를 확인
        user1BalanceBefore = new web3.utils.BN(user1BalanceBefore);
        assert.equal(
          user1BalanceBefore.toString(),
          new web3.utils.BN(user1BalanceAfter).toString()
        );
      });
    });
    describe("When the answer is not revealed(not mined)", function () {});
    describe("When the answer is not revealed(block limit is passed)", function () {});
  });

  describe("isMatch", function () {
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
