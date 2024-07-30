// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract BaseOne {
    uint256 internal dataA;
    constructor(){
    }

    function setDataA(uint256 _data) internal {
        dataA = _data;
    }

    function getDataA() internal view returns (uint256) {
        return dataA;
    }
}

contract BaseTwo {
    uint256 internal dataB;
    constructor(uint256 _data){
        dataB = _data;
    }

    function setDataB(uint256 _data) internal {
        dataB = _data;
    }

    function getDataB() internal view returns (uint256) {
        return dataB;
    }
}

contract Inherit is BaseOne, BaseTwo{

    constructor(uint256 _data) BaseTwo(_data) {
    }

    function setData(uint256 _dataA, uint256 _dataB) external {
        setDataA(_dataA);
        setDataB(_dataB);
    }

    function getData() external view returns (uint256, uint256) {
        return (getDataA(), getDataB());
    }
}