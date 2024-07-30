const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("LoopBranch", function () {
    async function deployLoopBranch() {
        const [owner] = await ethers.getSigners();
        const LoopBranch = await ethers.getContractFactory("LoopBranch");
        const loopBranch = await LoopBranch.deploy();
        return { loopBranch, owner };
    }

    describe("Test LoopBranch contract", function () {
        it("should set number correctly", async function () {
            const { loopBranch } = await loadFixture(deployLoopBranch);

            // Test setting number greater than 10
            await loopBranch.setNumber(15);
            let number = await loopBranch.getNumber();
            expect(number).to.equal(15);

            // Test setting number less than or equal to 10
            await loopBranch.setNumber(5);
            number = await loopBranch.getNumber();
            expect(number).to.equal(0);

            // Test setting number equal to 10
            await expect(loopBranch.setNumber(0)).to.be.revertedWith("Number should be greater than 0");
        });

        it("should add numbers to numberList correctly", async function () {
            const { loopBranch } = await loadFixture(deployLoopBranch);

            await loopBranch.addNumber(5);
            const numberList = await loopBranch.getNumberList();
            expect(numberList).to.have.lengthOf(5);

            // Check the values in the numberList
            for (let i = 0; i < 5; i++) {
                expect(numberList[i]).to.equal(i);
            }
        });
    });
});