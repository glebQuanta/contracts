// SPDX-License-Identifier: MIT 

pragma solidity ^0.8.24;

contract TimeLock {
    uint constant MINIMUM_DELAY = 10;
    uint constant MAXIMUM_DELAY = 1 days;
    uint constant GRACE_PERIOD = 1 days;
    string public message;
    uint public amount;

    address public owner;

    mapping(bytes32 => bool) public queue;

    event Queued(bytes32);
    event Discard(bytes32);
    event Executed(bytes32);

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not owner!");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function demo(string calldata _msg) external payable {
        message = _msg;
        amount = msg.value;
    }

    function getNextTimestamp() external view returns(uint) {
        return block.timestamp + 60;
    }

 function prepareDate(string calldata _msg) external pure returns (bytes memory) {
    return abi.encode(_msg);
}


    function addToQueue(
        address _to,
        string calldata _func,
        bytes calldata _data,
        uint _value,
        uint _timestamp
    ) external onlyOwner returns (bytes32) {
        require(
            _timestamp > block.timestamp + MINIMUM_DELAY &&
                _timestamp > block.timestamp + MAXIMUM_DELAY,
            "Invalid timestamp"
        );

        bytes32 txId = keccak256(
            abi.encode(_to, _func, _data, _value, _timestamp)
        );

        require(!queue[txId], "Already queued");

        queue[txId] = true;

        emit Queued(txId);

        return txId;
    }

    function execute(
        address _to,
        string calldata _func,
        bytes calldata _data,
        uint _value,
        uint _timestamp
    ) external payable onlyOwner returns (bytes memory) {
        require(block.timestamp > _timestamp, "too early");

        require(
            _timestamp + GRACE_PERIOD > block.timestamp,
            "transaction expired"
        );

        bytes32 txId = keccak256(
            abi.encode(_to, _func, _data, _value, _timestamp)
        );

        require(queue[txId], 'not queued!');

        delete queue[txId];

        bytes memory data;

        (bytes(_func).length > 0)
            ? data = abi.encode(bytes4(keccak256(bytes(_func))), _data)
            : data = _data;

        (bool success, bytes memory resp) = _to.call{value: _value}(data);

        require(success, "not success operation");

        emit Executed(txId);

        return resp;
    }

    function discard(bytes32 _txId) external onlyOwner {
        require(queue[_txId], "not queued!");

        delete queue[_txId];

        emit Discard(_txId);
    }
}