# solidity整理
## 关键词
### 可见性修饰符
函数可以使用 public、internal、external 和 private 来指定访问权限。默认为 public。
### 函数修饰符
pure、view、payable 和 virtual 是函数修饰符，用于定义函数的行为和特性。它们在函数的调用方式、状态变更、gas 消耗等方面有所不同
#### pure 和 view 的区别
- pure 函数：
  - 不能读取区块链上的状态变量。
  - 不能修改区块链上的状态变量。
  - 只能使用函数参数和局部变量来执行计算。
  - 不允许访问 this 和 msg 对象。可以在编译时被内联优化。不能发送以太币（Ether）
- view 函数：
  - 可以读取区块链上的状态变量。
  - 不能修改区块链上的状态变量。
  - 通常用于返回状态变量的值。
  - 可以调用其他 view 或 pure 函数。不允许发送以太币（Ether）。

什么时候使用 pure 和 view
- 使用 pure：
  - 当你的函数不需要读取或修改状态变量时。例如，一个纯粹的数学计算函数。

```solidity
function add(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}
```
- 使用 view：
  - 当你的函数需要读取状态变量，但不修改它们时。例如，一个返回存储在状态变量中的值的函数。
```solidity
function getNumber() public view returns (uint256) {
    return number;
}
```
#### memory 和 storage
在 Solidity 中，数据位置（memory 和 storage）用于指定变量在合约中的存储位置：

- storage：
  - 默认用于状态变量（全局变量）。
  - 数据存储在区块链上，永久保存，除非显式删除。
  - 修改 storage 中的数据会消耗 gas。
- memory：
  - 默认用于函数参数和局部变量。
  - 数据只在函数调用期间存在，函数返回后即销毁。
  - 修改 memory 中的数据不消耗额外的 gas，但仍需支付基本计算费用。

数组、字符串、结构体都需要指定存储memory/storage
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MemoryExamples {
    struct Person {
        string name;
        uint256 age;
    }
    uint256 public storedData;
    uint256[] public storedArray;
  
    constructor() {
      storedData = 100;
    }
  
    // 状态变量默认存储在storage中
    function setStoredData(uint256 _data) public {
      storedData = _data;
    }
  
    // 复杂数据类型在external函数中默认使用calldata
    function setStoredArray(uint256[] calldata _array) external {
      storedArray = _array;
    }
  
    // 复杂数据类型在public（或者internal）函数中默认使用memory
    function processArray(uint256[] memory _array) public pure returns (uint256) {
      return _array.length;
    }

    // 处理字符串
    function concatenate(string memory str1, string memory str2) public pure returns (string memory) {
        return string(abi.encodePacked(str1, str2));
    }

    // 处理结构体
    function getPerson(string memory name, uint256 age) public pure returns (Person memory) {
        return Person(name, age);
    }

    // 返回结构体数组
    function getPeople() public pure returns (Person[] memory) {
        people[0] = Person("Alice", 30);
        people[1] = Person("Bob", 25);
        return people;
    }
}
```
- storage：存储在区块链上的永久性数据，读取和写入都比较昂贵。
- memory：临时数据，存储在内存中，仅在函数调用期间存在，读取和写入速度较快。
- calldata：只读数据，存储在调用数据中，主要用于外部函数参数，不能修改。