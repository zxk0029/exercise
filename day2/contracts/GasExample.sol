// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GasExample {
    uint256 public number;

    // 读取状态变量
    function getNumber() public view returns (uint256) {
        return number;
    }

    // 写入状态变量
    function setNumber(uint256 _number) public {
        number = _number;
    }
}