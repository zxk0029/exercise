const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const {expect} = require("chai");
const { ethers } = require("hardhat");

describe("Inherit", function () {
    async function deployInherit() {
        const [owner, otherAccount] = await ethers.getSigners();

        const Inherit = await ethers.getContractFactory("Inherit");
        const inherit = await Inherit.deploy(100);

        return {inherit, owner, otherAccount};
    }

    describe("Test Inherit Script", function () {
        it("Inherit test", async function () {
            const {inherit} = await loadFixture(deployInherit);
            console.log(inherit.setData(1,2))
            await expect(inherit.setData(1,2))
        });
    });
});
