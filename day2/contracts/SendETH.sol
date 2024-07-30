// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract SendETH {
    constructor() payable {}

    receive() external payable {}

    function sendETH(address payable _to, uint256 _amount) public {
        require(address(this).balance >= _amount, "Insufficient balance");
        (bool sent, ) = _to.call{value: _amount}("");
        require(sent, "Failed to send ETH");
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
