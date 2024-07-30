const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
describe("FunctionEvent", function () {
    async function deployFunctionEventFixture() {
        const [owner, otherAccount] = await ethers.getSigners();

        const FunctionEvent = await ethers.getContractFactory("FunctionEvent");
        const functionEvent = await FunctionEvent.deploy();

        return {functionEvent, owner, otherAccount};
    }

    describe("functionEvent", function () {
        it("setNumber", async function () {
            const {functionEvent} = await loadFixture(deployFunctionEventFixture);

            await expect(functionEvent.setData(1))
        });
    });
});
