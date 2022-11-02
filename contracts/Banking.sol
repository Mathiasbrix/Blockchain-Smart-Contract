// SPDX-License-Identifier: GPL-3.
pragma solidity ^0.8.17;

contract Banking {
    address owner;
    mapping (address => bool) public accounts;
    mapping (address => uint) public balances;
    

	constructor() {
        owner = msg.sender;
	}

    /**
    Helper function to check if accounts mapping contains account.
     */
    function accountsContains(address account) public view returns (bool){
        return accounts[account];
    }

    /**
    Creates a transfer of ETH between two accounts.
     */
	function transfer(address sender, address receiver, uint amount) public returns(bool) {
        //Check if both accounts exists.
        if((!accountsContains(sender)) || (!accountsContains(receiver))) revert();
        //Check if the senders balance is sufficient.
		if (balances[sender] < amount) revert();
        
		balances[sender] -= amount;
		balances[receiver] += amount;

		return true;
	}

    /**
    Returns the current balance of an account.
     */
	function getBalance(address account) public view returns(uint){
        require(account == msg.sender);

		return balances[account];
	}

    /**
    Creates an account if it does not already exist.
     */
    function createAccount() public returns(bool){
        if(accountsContains(msg.sender)) revert();
        accounts[msg.sender] = true;
        balances[msg.sender] = 0;
        return true;
    }

    /**
    Deposits an amount into the senders account.
     */
    function deposit(uint amount) public returns(bool){
        if(!accountsContains(msg.sender)) revert();

        balances[msg.sender] += amount;
        return true;
    }

    /**
    Withdraws an amount from the senders account.
     */
    function withdraw(uint amount) public returns(bool){
        if(!accountsContains(msg.sender)) revert();

        balances[msg.sender] -= amount;
        return true;
    }
}
