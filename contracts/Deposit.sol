// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract DepositContract {
    
    mapping(address => uint256) public balances; 
    uint256 public constant MAX_DEPOSIT = 100 ether;
    uint256 public constant MAX_WITHDRAW = 50 ether;
    
    bool private locked;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    
    modifier onlyNonZeroDeposit() {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        _;
    }

    modifier nonReentrant() {
        require(!locked, "Reentrant call detected");
        locked = true;
        _;
        locked = false;
    }

    function deposit() external payable onlyNonZeroDeposit {
        require(msg.value <= MAX_DEPOSIT, "Deposit amount exceeds the maximum allowed");
        unchecked {
            balances[msg.sender] += msg.value; 
        }
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external nonReentrant {
        require(amount <= MAX_WITHDRAW, "Withdraw amount exceeds the maximum allowed");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdraw failed");

        emit Withdraw(msg.sender, amount);
    }

    function getUserBalance(address user) external view returns (uint256) {
        return balances[user];
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}


// pragma solidity ^0.8.24;

// contract DepositContract {
//     mapping(address => uint256) public balances;
//     mapping(address => uint256) private lastWithdrawalTime;

//     uint256 public constant MAX_DEPOSIT = 100 ether;
//     uint256 public constant MAX_WITHDRAW = 50 ether;
//     uint256 public constant MIN_WITHDRAW_INTERVAL = 1 minutes; 

//     bool public paused;
//     bool private withdrawPaused;
//     address public owner;

//     event Deposit(address indexed user, uint256 amount);
//     event Withdraw(address indexed user, uint256 amount);

//     modifier onlyOwner() {
//         require(msg.sender == owner, "Not contract owner");
//         _;
//     }

//     modifier onlyNonZeroDeposit() {
//         require(msg.value > 0, "Deposit amount must be greater than 0");
//         _;
//     }

//     modifier nonReentrant() {
//         require(!paused, "Contract is paused");
//         bool wasPaused = paused;
//         paused = true;
//         _;
//         paused = wasPaused;
//     }

//     modifier whenNotPaused() {
//         require(!paused, "Contract is paused");
//         _;
//     }

//     modifier whenWithdrawNotPaused() {
//         require(!withdrawPaused, "Withdraw is paused");
//         _;
//     }

//     constructor() {
//         owner = msg.sender;
//     }

//     function pause() external onlyOwner {
//         paused = true;
//     }

//     function unpause() external onlyOwner {
//         paused = false;
//     }

//     function pauseWithdraw() external onlyOwner {
//         withdrawPaused = true;
//     }

//     function unpauseWithdraw() external onlyOwner {
//         withdrawPaused = false;
//     }

//     function deposit() external payable onlyNonZeroDeposit whenNotPaused {
//         require(msg.value <= MAX_DEPOSIT, "Deposit amount exceeds the maximum allowed");
//         unchecked {
//             balances[msg.sender] += msg.value;
//         }
//         emit Deposit(msg.sender, msg.value);
//     }

//     function withdraw(uint256 amount) external nonReentrant whenNotPaused whenWithdrawNotPaused {
//         require(amount <= MAX_WITHDRAW, "Withdraw amount exceeds the maximum allowed");
//         require(balances[msg.sender] >= amount, "Insufficient balance");
//         require(block.timestamp >= lastWithdrawalTime[msg.sender] + MIN_WITHDRAW_INTERVAL, "Withdrawal too frequent");

//         balances[msg.sender] -= amount;
//         lastWithdrawalTime[msg.sender] = block.timestamp;

//         (bool success, ) = msg.sender.call{value: amount}("");
//         require(success, "Withdraw failed");

//         emit Withdraw(msg.sender, amount);
//     }

//     function getUserBalance(address user) external view returns (uint256) {
//         return balances[user];
//     }

//     function contractBalance() public view returns (uint256) {
//         return address(this).balance;
//     }

//     function lastWithdrawalTimeFor(address user) external view returns (uint256) {
//         return lastWithdrawalTime[user];
//     }

//     function isWithdrawPaused() external view returns (bool) {
//         return withdrawPaused;
//     }
// }