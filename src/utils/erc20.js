import { ethers } from "ethers";
import erc20ContractABI from '../contracts/erc20ContractABI.json';

const contractAddress = '0x8629a9Bd0c4E286075e819733DD6663e10636F3c';
const amount = ethers.utils.parseEther("10");
const amountUnlimited = ethers.utils.parseEther("10000000000000000000000000");

    export const ClaimTokens = async (account, signer) => {
        const contract = new ethers.Contract(contractAddress, erc20ContractABI, signer)
        try {
            await contract.claim(amount).call()
        } catch(e) {
            console.log(e);
        }
    }

    export const BurnTokens = async (account, signer) => {       
        const contract = new ethers.Contract(contractAddress, erc20ContractABI, signer)
        try {
            await contract.burnFrom(account, amount).call()
        } catch(e) {
            console.log(e);
        }
    }

    export const TransferTokens = async (account, signer) => {
        const contract = new ethers.Contract(contractAddress, erc20ContractABI, signer)
        try {
            await contract.transfer(account, amount).call()
        } catch(e) {
            console.log(e);
        }
    }

    export const ApproveSpender = async (account, signer) => {
        const contract = new ethers.Contract(contractAddress, erc20ContractABI, signer)
        try {
            await contract.approve(contractAddress, amount).call()
        } catch(e) {
            console.log(e);
        }
    }

    export const ApproveSpenderUnlimited = async (account, signer) => {
        const contract = new ethers.Contract(contractAddress, erc20ContractABI, signer)
        try {
            await contract.approve(contractAddress, amountUnlimited).call()
        } catch(e) {
            console.log(e);
        }
    }











