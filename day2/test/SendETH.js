const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("SendETH", function () {
    async function deploySendETH() {
        const [owner, otherAccount] = await ethers.getSigners();
        const SendETH = await ethers.getContractFactory("SendETH");
        const sendETH = await SendETH.deploy({ value: ethers.parseEther("1") }); // 合约部署时附带 1 ETH
        return { sendETH, owner, otherAccount };
    }

    describe("Test SendETH contract", function () {
        it("should send ETH successfully", async function () {
            const { sendETH, owner, otherAccount } = await loadFixture(deploySendETH);
            const amountToSend = ethers.parseEther("0.1");

            console.log("owner:", owner);
            console.log("otherAccount:", otherAccount);

            if (!owner.address || !otherAccount.address) {
                throw new Error("Owner or otherAccount address is null");
            }

            const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
            const initialOtherAccountBalance = await ethers.provider.getBalance(otherAccount.address);

            console.log("initialOwnerBalance", initialOwnerBalance.toString());
            console.log("initialOtherAccountBalance", initialOtherAccountBalance.toString());

            console.log("owner address", owner.address); // 确认 owner 地址
            console.log("otherAccount address", otherAccount.address); // 确认 otherAccount 地址

            // 发送 ETH，并获取交易的详细信息
            const tx = await sendETH.sendETH(otherAccount.address, amountToSend);
            const receipt = await tx.wait();
            const gasUsed = BigInt(receipt.gasUsed.toString()); // 转换为 BigInt
            const gasPrice = BigInt(tx.gasPrice.toString()); // 转换为 BigInt
            const gasCost = gasUsed * gasPrice; // 使用 BigInt 进行乘法运算

            console.log("gasCost", gasCost.toString());

            const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
            const finalOtherAccountBalance = await ethers.provider.getBalance(otherAccount.address);
            console.log("finalOwnerBalance", finalOwnerBalance.toString());
            console.log("finalOtherAccountBalance", finalOtherAccountBalance.toString());
            expect(finalOtherAccountBalance).to.equal(initialOtherAccountBalance + amountToSend);
        });

        it("should fail to send ETH due to insufficient balance", async function () {
            const { sendETH, otherAccount } = await loadFixture(deploySendETH);
            const amountToSend = ethers.parseEther("2"); // 超出合约余额的数额

            await expect(sendETH.sendETH(otherAccount.address, amountToSend)).to.be.revertedWith("Insufficient balance");
        });

        it("should return the correct balance of the contract", async function () {
            const { sendETH } = await loadFixture(deploySendETH);
            const balance = await ethers.provider.getBalance(sendETH.address);
            expect(balance).to.equal(ethers.parseEther("1"));
        });
    });
});