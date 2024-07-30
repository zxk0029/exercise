const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("GasExample", function () {
    async function deployGasExample() {
        const [owner] = await ethers.getSigners();
        const GasExample = await ethers.getContractFactory("GasExample");
        const gasExample = await GasExample.deploy(); // 确保合约部署时提供必要的参数
        return { gasExample, owner };
    }

    it("should set and get number correctly", async function () {
        const { gasExample } = await loadFixture(deployGasExample);

        // 设置 number
        const setTx = await gasExample.setNumber(42);
        const setReceipt = await setTx.wait();
        console.log("Gas used for setNumber:", setReceipt.gasUsed.toString());

        // 获取 number
        const number = await gasExample.getNumber();
        console.log("Number:", number.toString());
        expect(number).to.equal(42);

    });
});