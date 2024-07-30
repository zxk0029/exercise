const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");

describe("FunctionSelector", function () {
    async function deployFunctionEventFixture() {
        const [owner, otherAccount] = await ethers.getSigners();

        const FunctionSelector = await ethers.getContractFactory("FunctionSelector");
        const functionSelector = await FunctionSelector.deploy();

        const FunctionSelectorItem = await ethers.getContractFactory("FunctionSelectorItem");
        const functionSelectorItem = await FunctionSelectorItem.deploy(functionSelector);

        return {functionSelector, functionSelectorItem, owner, otherAccount};
    }

    describe("FunctionSelector", function () {
        it("setNumber", async function () {
            const {functionSelectorItem} = await loadFixture(deployFunctionEventFixture);

            await expect(functionSelectorItem.getSetValueSelector())
        });
    });
});
