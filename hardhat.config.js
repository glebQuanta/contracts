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
                "0xdc46c087f7c3dd14cec96cb355be4389ac505c010f420f2bb9b348574c13c676",
                "0x7d35853aeb62d2a00b2c009b02748c4326355f6d14352978c8b862b33a7d58c7"
            ],
            chainId: 1337,
        }
    }
};
