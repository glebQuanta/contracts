const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TimeLockModule", (m) => {
    const gasLimit = 1500000;

    // Имя контракта должно совпадать с именем контракта в Solidity: "TimeLock"
    const TimeLockContract = m.contract("TimeLock", [], {
        gasLimit: gasLimit
    });

    return { TimeLockContract };
});
