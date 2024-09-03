import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import detectProvider from '@metamask/detect-provider';
import { Web3Provider } from '@ethersproject/providers';
import { Button, Input, DepositContainer } from '../assets/deposit.style';
import { depositABI } from '../abi/withdrawAbi';

const depositAddressETH = '0xd2b5994B490A6B4CC1486252Ac60d0b1c5B37719';

const DepositETH = () => {

    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [amount, setAmount] = useState('');
    const [userBalance, setUserBalance] = useState('0');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawalStatus, setWithdrawalStatus] = useState('');

      useEffect(() => {
        const setupProvider = async () => {
            try {
                const provider = await detectProvider();
                if (provider) {
                    const web3Provider = new Web3Provider(provider);
                    const signer = web3Provider.getSigner();
                    setSigner(signer);
                    const contract = new ethers.Contract(depositAddressETH, depositABI, signer);
                    setContract(contract);
                    await updateUserBalance(contract, await signer.getAddress());
                } else {
                    console.log('Please install MetaMask!');
                }
            } catch (err) {
                console.error('Error setting up provider:', err.message);
            }
        };

        setupProvider();
    }, []);

    const updateUserBalance = async (contract, userAddress) => {
        if (contract) {
            try {
               
                const userBalance = await contract.getUserBalance(userAddress);
                setUserBalance(ethers.formatEther(userBalance)); 
            } catch (err) {
                console.error('Failed to fetch user balance:', err.message);
            }
        }
    };

    const handleWithdraw = async () => {
        if (contract && signer) {
            try {
                const parsedAmount = ethers.parseUnits(withdrawAmount, 'ether');
                console.log(`Withdrawing ${withdrawAmount} ETH...`);
                const tx = await contract.withdraw(parsedAmount);
                console.log('Transaction hash:', tx.hash);
                await tx.wait();
                console.log('Withdrawal completed!');
                await updateUserBalance(contract, await signer.getAddress());
                setWithdrawalStatus('Withdrawal successful!');
            } catch (err) {
                console.error('Transaction failed:', err.message);
                setWithdrawalStatus('Withdrawal failed. Please check the console for errors.');
            }
        }
    };

    const handleDeposit = async () => {
        if (contract && signer) {
            try {
                const parsedAmount = ethers.parseUnits(amount, 'ether');

                console.log(`Depositing ${amount} ETH...`);
                const tx = await contract.deposit({
                    value: parsedAmount
                });

                console.log('Transaction hash:', tx.hash);

                // Ждем завершения транзакции
                await tx.wait();

                console.log('Deposit completed!');

                await updateUserBalance(contract, await signer.getAddress());
            } catch (err) {
                console.error('Transaction failed:', err.message);
            }
        }
    };

    return (
        <DepositContainer>
            <h2>Deposit ETH</h2>
            <Input
                type="text"
                placeholder="Amount of ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <Button onClick={handleDeposit}>Deposit</Button>

            <div>Your Balance: {userBalance} ETH</div>

            <h2>Withdraw ETH</h2>
            <Input
                type="text"
                placeholder="Amount of ETH"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <Button onClick={handleWithdraw}>Withdraw</Button>

            {withdrawalStatus && <div>{withdrawalStatus}</div>}
        </DepositContainer>

    );
};

export default DepositETH;
