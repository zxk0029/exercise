// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FunctionSelector {
    uint256 public value;

    constructor() {
    }

    function setValue(uint256 _value) public {
        value = _value;
    }
}

contract FunctionSelectorItem {
    FunctionSelector public functionSelector;

    constructor(address _functionSelector) {
        functionSelector = FunctionSelector(_functionSelector);
    }

    function callSetValue(uint256 _value) public {
        functionSelector.setValue(_value);
    }

    function getSetValueSelector() public view returns (bytes4) {
        return functionSelector.setValue.selector;
    }
}