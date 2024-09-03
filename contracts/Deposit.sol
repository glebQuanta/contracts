// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract DepositContract {

    mapping(address => uint256) public balances;

    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);

    function deposit() external payable {

        require(msg.value > 0, 'Deposit amount must be greater than 0');
        balances[msg.sender] += msg.value;

        emit Deposit(msg.sender, msg.value);

    }

    function getUserBalance(address user) external view returns (uint256) {
        return balances[user];
    }

    function withdraw(uint256 amount) external {
        uint256 userBalance = balances[msg.sender];
        require(amount > 0, 'Withdrawal amount must be greater than 0');
        require(userBalance >= amount, 'Insufficient balance');

        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);

        emit Withdrawal(msg.sender, amount);
    }

}
