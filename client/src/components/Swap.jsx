import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import detectProvider from '@metamask/detect-provider';
import { Web3Provider } from '@ethersproject/providers';
import { useStore } from '../store/useStore';
import {Button, Input, Select, SwapContainer} from "../assets/swap.style";
import {TOKENS} from "../tokens/tokens";
import {swapABI} from '../abi/swapAbi'

const swapAddress = '0xD6b6E6454a8f29B6DC13a88cB6d1B2b5b03e1a55';

const SwapComponent = () => {

    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [tokenA, setTokenA] = useState(TOKENS.DAI);
    const [tokenB, setTokenB] = useState(TOKENS.USDT);
    const [amountA, setAmountA] = useState('');
    const [amountB, setAmountB] = useState('');

    const { account } = useStore();

    useEffect(() => {
        const setupProvider = async () => {
            const provider = await detectProvider();
            if (provider) {
                const web3Provider = new Web3Provider(provider);
                const signer = web3Provider.getSigner();
                setSigner(signer);
                const contract = new ethers.Contract(swapAddress, swapABI, signer);
                setContract(contract);
            } else {
                console.log('Please install MetaMask!');
            }
        };

        setupProvider();
    }, []);

    const formatAddress = (address) => {
        try {
            return ethers.getAddress(address);
        } catch (error) {
            console.error('Invalid address format:', address);
            return null;
        }
    };

    const handleSwap = async () => {
        if (!account) {
            console.error('No account selected');
            return;
        }

        if (contract && signer) {
            try {
                if (!formatAddress(tokenA) || !formatAddress(tokenB)) {
                    throw new Error('Invalid token addresses.');
                }

                const parsedAmountA = ethers.parseUnits(amountA, 6);
                const parsedAmountB = ethers.parseUnits(amountB, 18);

                const tx = await contract.swapTokens(
                    tokenA,
                    tokenB,
                    parsedAmountA,
                    parsedAmountB,
                    '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
                    account
                );

                console.log(`Swapping ${amountA} tokens for ${amountB} tokens...`);
                await tx.wait();
                console.log('Swap completed!');
            } catch (err) {
                console.error('Transaction failed:', err.message);
            }
        }
    };

    return (
        <SwapContainer>
            <h2>Swap Tokens</h2>
            <Select value={tokenA} onChange={(e) => setTokenA(e.target.value)}>
                {Object.entries(TOKENS).map(([symbol, address]) => (
                    <option key={address} value={address}>
                        {symbol}
                    </option>
                ))}
            </Select>
            <Input
                type="text"
                placeholder="Amount of Token A"
                value={amountA}
                onChange={(e) => setAmountA(e.target.value)}
            />
            <Select value={tokenB} onChange={(e) => setTokenB(e.target.value)}>
                {Object.entries(TOKENS).map(([symbol, address]) => (
                    <option key={address} value={address}>
                        {symbol}
                    </option>
                ))}
            </Select>
            <Input
                type="text"
                placeholder="Amount of Token B"
                value={amountB}
                onChange={(e) => setAmountB(e.target.value)}
            />
            <Button onClick={handleSwap}>Swap Tokens</Button>
        </SwapContainer>
    );
};

export default SwapComponent;
