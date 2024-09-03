require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-ignition');

module.exports = {
    solidity: "0.8.24",
    networks: {
        bscTestnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            accounts: [
                "0xcf4a6699e5dfdd0a903186579b573cff3ba84412d1eedf04918d794b22c349b8",
        
            ],
            chainId: 97,
            gasPrice: 20000000000,
        },
        ganache: {
            url: "http://localhost:8545",
            accounts: [
                "0x6010539f7f5ea723fa92492f4c2735ea2850488c70ee2e65e48632cc3a0b4db4",
                "0x8531c6e00ef1de45ed71a9118dd9cf8bd9fe55a899084c043b070a6985258c53"
            ],
            chainId: 1337,
        }
    }
};
