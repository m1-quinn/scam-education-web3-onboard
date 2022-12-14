import { ethers } from "ethers";
import erc20ContractABI from '../contracts/erc20ContractABI.json';
import wethABI from '../contracts/wethContractABI.json';

const contractAddress = '0xA99b78F5511164257D75e9674698B0d40C3cc7d2';
const wethContractAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

const amount = ethers.utils.parseEther("10");

export const ClaimTokensTest = async (account, signer) => {
    const contract = new ethers.Contract(contractAddress, erc20ContractABI, signer)
    try {
        await contract.claim(amount).call()
    } catch(e) {
        console.log(e);
    }
}

export const WethTest = async (account, signer) => {
    const contract = new ethers.Contract(wethContractAddress, wethABI, signer)
    try {
        await contract.deposit().call()
    } catch(e) {
        console.log(e);
    }
}