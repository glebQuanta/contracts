const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DEFAULT_OWNER = "0x0000000000000000000000000000000000000000";

module.exports = buildModule("SwapModule", (m) => {

    const owner = m.getParameter("owner", DEFAULT_OWNER);

    const gasLimit = 1500000;

    const swap = m.contract("Swap", [], {
        gasLimit: gasLimit
    });

    return { swap };

});
