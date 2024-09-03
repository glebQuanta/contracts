const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DepositModule", (m) => {

    const gasLimit = 1500000;

    // Деплой контракта DepositContract
    const depositContract = m.contract("DepositContract", [], {
        gasLimit: gasLimit
    });

    return { depositContract };

});
