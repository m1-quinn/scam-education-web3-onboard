import { ethers } from "ethers";
import randomContractABI from '../contracts/randomContractABI.json';

const randomContractAddress = '0xE295cE5572387AB0D7C7fb914E2e19d9D44AeaDb';
const wethContractAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const amount = ethers.utils.parseEther("10");
const ETHamount = ethers.utils.parseEther("0.001");

export const DepositWeth = async (account, signer) => {
    const tx = {
        to: wethContractAddress,
        value: ETHamount
    }
    try {
        await signer.sendTransaction(tx);
    } catch(e) {
        console.log(e);
    }
}

export const SendEth = async (account, signer) => {
    const tx = {
        to: account,
        value: ETHamount
    }
    try {
        await signer.sendTransaction(tx);
    } catch(e) {
        console.log(e);
    }
}

export const RandomContract = async (account, signer) => {
    const contract = new ethers.Contract(randomContractAddress, randomContractABI, signer)
    try {
        await contract.approve(randomContractAddress, amount).call()
    } catch(e) {
        console.log(e);
    }
}