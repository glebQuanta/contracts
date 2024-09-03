// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

interface IERC20 {

    function transferFrom(address from, address to, uint256 amount) external returns (bool);

    function transfer(address to, uint256 amount) external returns (bool);

    function balanceOf(address account) external returns (uint256);

}

contract Swap {

    address public owner;

    constructor() {

        owner = msg.sender;

    }

    function swapTokens(
        address tokenA,
        address tokenB,
        uint amountA,
        uint amountB,
        address sender,
        address recipient
    ) public {

        require(sender != address(0), "Invalid sender address");

        require(recipient != address(0), "Invalid recipient address");

        IERC20 tokenContractA = IERC20(tokenA);
        IERC20 tokenContractB = IERC20(tokenB);

        require(tokenContractA.balanceOf(sender) >= amountA, "Insufficient token A balance");

        require(tokenContractB.balanceOf(recipient) >= amountB, "Insufficient token B balance");

        require(tokenContractA.transferFrom(sender, recipient, amountA), "Token A transfer failed");

        require(tokenContractB.transferFrom(recipient, sender, amountB), "Token B transfer failed");

    }

}
