const Banking = artifacts.require("Banking");

contract("Banking", (accounts) => {
  let owner = accounts[0];
  let nonOwner = accounts[1];
  let catchRevert = require("../exceptions.js").catchRevert;

  it("should create an account when createAccount is called.", async () => {
    BankingInstance = await Banking.deployed();
    const created = await BankingInstance.createAccount();
    expect(created.receipt.status).to.be.true;
  });

  it("should be able to deposit money when deposit() is called.", async () => {
    BankingInstance = await Banking.deployed();
    const deposit = await BankingInstance.deposit(1);
    expect(deposit.receipt.status).to.be.true;
  });

  it("should revert when deposit() is called on a non-existant account.", async () => {
    BankingInstance = await Banking.new();
    await catchRevert(BankingInstance.deposit(1));
  });

  it("should increase balance when deposit() is called by deposited amount.", async () => {
    let amount = 2;

    BankingInstance = await Banking.new();

    await BankingInstance.createAccount();
    const initialBalance = await BankingInstance.getBalance(owner);
    await BankingInstance.deposit(amount);
    const newBalance = await BankingInstance.getBalance(owner);

    const expectedNewBalance = parseInt(initialBalance) + amount;

    expect(newBalance.words[0]).to.equal(expectedNewBalance);
  });

  it("should increase balance when deposit() is called by deposited amount.", async () => {
    const amount = 2;
    const ownerInitialAmount = 2;
    const nonOwnerInitialAmount = 0;
    //Create new instance
    BankingInstance = await Banking.new();

    //Create accounts for owner and nonOwner
    await BankingInstance.createAccount({ from: nonOwner });
    await BankingInstance.createAccount({ from: owner });

    //Deposit 2 eth to owner and transfer them to nonOwner
    await BankingInstance.deposit(amount, { from: owner });
    await BankingInstance.transfer(owner, nonOwner, amount);

    //Check new balances
    const newBalanceOwner = await BankingInstance.getBalance(owner, {
      from: owner,
    });
    const newBalanceNonOwner = await BankingInstance.getBalance(nonOwner, {
      from: nonOwner,
    });

    //Expected balances
    const expectedNewBalanceOwner = ownerInitialAmount - amount;
    const expectedNewBalanceNonOwner = nonOwnerInitialAmount + amount;

    expect(Number(newBalanceOwner)).to.equal(expectedNewBalanceOwner);
    expect(Number(newBalanceNonOwner)).to.equal(expectedNewBalanceNonOwner);
  });
});
