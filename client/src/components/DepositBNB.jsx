// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import detectProvider from '@metamask/detect-provider';
// import { Web3Provider } from '@ethersproject/providers';
// import { Button, Input, DepositContainer } from '../assets/deposit.style';
// import { depositABI } from '../abi/depositAbi';
//
// const depositAddressBNB = '0xAdb36167563877925e0f67C1555f7907F8B72d15'; // Адрес контракта на BNB тестовой сети
//
// const DepositBNB = () => {
//     const [signer, setSigner] = useState(null);
//     const [contract, setContract] = useState(null);
//     const [amount, setAmount] = useState('');
//     const [userBalance, setUserBalance] = useState('');
//
//     useEffect(() => {
//         const setupProvider = async () => {
//             try {
//                 const provider = await detectProvider();
//                 if (provider) {
//                     const web3Provider = new Web3Provider(provider);
//                     const signer = web3Provider.getSigner();
//                     setSigner(signer);
//                     const contract = new ethers.Contract(depositAddressBNB, depositABI, signer);
//                     setContract(contract);
//                     await updateUserBalance(contract, await signer.getAddress());
//                 } else {
//                     console.log('Please install MetaMask!');
//                 }
//             } catch (err) {
//                 console.error('Error setting up provider:', err.message);
//             }
//         };
//
//         setupProvider();
//     }, []);
//
//     const updateUserBalance = async (contract, userAddress) => {
//         if (contract) {
//             try {
//                 // Предполагаем, что метод getUserBalance возвращает BNB в wei
//                 const userBalance = await contract.getUserBalance(userAddress);
//                 setUserBalance(ethers.formatEther(userBalance)); // Преобразование wei в BNB
//             } catch (err) {
//                 console.error('Failed to fetch user balance:', err.message);
//             }
//         }
//     };
//
//     const handleDeposit = async () => {
//         if (contract && signer) {
//             try {
//                 const parsedAmount = ethers.parseUnits(amount, 'ether'); // Преобразование BNB в wei
//
//                 console.log(`Depositing ${amount} BNB...`);
//                 const tx = await contract.deposit({
//                     value: parsedAmount
//                 });
//
//                 console.log('Transaction hash:', tx.hash);
//
//                 // Ждем завершения транзакции
//                 await tx.wait();
//
//                 console.log('Deposit completed!');
//
//                 await updateUserBalance(contract, await signer.getAddress());
//             } catch (err) {
//                 console.error('Transaction failed:', err.message);
//             }
//         }
//     };
//
//     return (
//         <DepositContainer>
//             <h2>Deposit BNB</h2>
//             <Input
//                 type="text"
//                 placeholder="Amount of BNB"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//             />
//             <Button onClick={handleDeposit}>Deposit</Button>
//             <div>Your Balance: {userBalance} BNB</div>
//         </DepositContainer>
//     );
// };
//
// export default DepositBNB;
