// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoopBranch {
    uint256 public number;
    uint256[] public numberList;

    constructor() {
        number = 0;
    }
    function setNumber(uint256 _number) external {
        require(_number > 0, "Number should be greater than 0");
        if (_number > 10) {
            number = _number;
        } else {
            number = 0;
        }
    }

    function getNumber() public view returns(uint256) {
        return number;
    }

    function addNumber(uint256 _count) public {
        for (uint256 i = 0; i<_count; i++){
            numberList.push(i);
        }
    }

    function getNumberList() public view returns (uint256[] memory) {
        return numberList;
    }
}