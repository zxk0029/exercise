require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",
    networks: {
        hardhat: {
            accounts: {
                count: 10, // 默认创建10个账户
                accountsBalance: "2000000000000000000" // 每个账户的初始余额，默认为1 ETH（以 wei 为单位）
            }
        }
    }
};
