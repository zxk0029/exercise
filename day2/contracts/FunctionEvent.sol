// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*
    * public - all data is accessible from outside the contract
    * external - function can be called from outside the contract
    * internal - function can only be called from within the contract
    * private - function can only be called from within the contract
*/
/*
    * view - function does not modify the contract's state
    * pure - function does not modify the contract's state and does not read from the contract's state
    * payable - function can receive Ether
    * virtual - function can be overridden by a function in a derived contract
*/

contract FunctionEvent {
    uint256 public data;

    constructor() {
    }

    function setData(uint256 _number) external {
        data = _number;
    }

    function getData() external view returns (uint256) {
        return data;
    }

    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }
}

contract FunctionEventInherit is FunctionEvent{
    uint256 public dataInherit;

    constructor() {
    }

    function setDataInherit(uint256 _number) external {
        dataInherit = _number;
    }

    function getDataInherit() external view returns (uint256) {
        return dataInherit;
    }

    function addInherit(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }
}