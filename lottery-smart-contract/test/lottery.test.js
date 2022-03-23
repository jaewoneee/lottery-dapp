const Lottery = artifacts.require("Lottery");

contract("Lottery", function ([deployer, user1, user2]) {
  let lottery;
  beforeEach(async () => {
    console.log("testest");
    lottery = await Lottery.new();
  });

  it("Basic test", async () => {
    console.log("Basic test");
    let owner = await lottery.owner();
    let value = await lottery.getSomeValue();

    console.log(`owner ${owner}`);
    console.log(`value ${value}`);
    assert.equal(10, 10);
  });

  it.only("getPot should return current pot", async () => {
    console.log("Basic test");
    let pot = await lottery.getPot();
    assert.equal(pot, 0);
  });
});
