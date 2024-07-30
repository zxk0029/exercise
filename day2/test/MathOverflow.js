const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Math", function () {
    async function deployMath() {
        const [owner, otherAccount] = await ethers.getSigners();

        const Math = await ethers.getContractFactory("MathOverflow");
        const math = await Math.deploy();

        return { math, owner, otherAccount };
    }

    describe("Test MathOverflow.sol Script", function () {
        it("MathOverflow.sol test", async function () {
            const { math } = await loadFixture(deployMath);
            const result = await math.subtraction(5, 3);
            console.log(result.toString());
            expect(result).to.equal(2); // 5 - 3 应等于 2
        });

        it("should revert on underflow", async function () {
            const { math } = await loadFixture(deployMath);
            // console.log(await math.subtraction(3, 5));
            await expect(math.subtraction(3, 5)).to.be.revertedWith("SafeMath: subtraction overflow");
        });
    });
});