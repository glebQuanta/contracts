import React from "react";
import { WagmiProvider, useAccount, useConnect } from 'wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { arbitrum, mainnet, Chain } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStore } from '../store/useStore';
import { useWeb3Modal } from "@web3modal/wagmi/react";

const queryClient = new QueryClient();

const projectId = '5f5279f1fe9d81e69d05235f86ffe4bf';

const metadata = {
    name: 'swap',
    description: 'AppKit Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const ethTestnet = {
    id: 1337,
    name: 'Ethereum Testnet',
    network: 'ethereum',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['http://127.0.0.1:8545'],
        },
        public: {
            http: ['http://127.0.0.1:8545'],
        },
    },
};

const bscTestnet = {
    id: 97,
    name: 'Binance Smart Chain Testnet',
    network: 'binance',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
        },
        public: {
            http: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
        },
    },
};

const chains = [mainnet, arbitrum, ethTestnet, bscTestnet];

const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
});

createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
    enableOnramp: true,
});

export function Wallet() {
    const { open } = useWeb3Modal();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <w3m-button/>
                <button onClick={() => open({ view: "Networks" })}>
                    Network
                </button>
                <AccountDisplay />
            </QueryClientProvider>
        </WagmiProvider>
    );
}

function AccountDisplay() {
    const { isConnected, address } = useAccount();
    const { connect, connectors } = useConnect();
    const { setAccount } = useStore();

    React.useEffect(() => {
        if (isConnected && address) {
            setAccount(address);
        }
    }, [isConnected, address, setAccount]);

    return null;
}
