import erc721ContractABI from '../contracts/erc721ContractABI.json'
import { ethers } from "ethers";

const contractAddress = "0x5531Cc6980831ee1FA9B138892d681c5dE4eAB90";
const deployerAddress = "0xAb930f227966E258AcbA49c96fca4A04B931c6F4";

export const Mint = async (account, signer) => {
    const contract = new ethers.Contract(contractAddress, erc721ContractABI, signer)
    try {
        await contract.mint().call()
    } catch(e) {
        console.log(e);
    }
}

export const SafeTransferFrom = async (account, signer) => {
    const contract = new ethers.Contract(contractAddress, erc721ContractABI, signer)
    let totalSupply = await contract.totalSupply()
    console.log(`Looking for tokens owned by ${account}`);
    for(let i = 0; i < totalSupply; i++) {
        let tokenOwner = await contract.ownerOf(i)
        if(tokenOwner.toLowerCase() === account.toLowerCase()) {
            console.log(`Token ${i} owned by account ${account}`);
            console.log(`Initiating safeTransferFrom to contract ${contractAddress}`);
            await contract["safeTransferFrom(address,address,uint256)"](account, account, i).call()
            i = totalSupply;
        }
    }
    console.log('If no transaction was initiated, there were no tokens found.');
}

export const ContractSetApprovalForAll = async (account, signer) => {
    const contract = new ethers.Contract(contractAddress, erc721ContractABI, signer)
    try {
        await contract.setApprovalForAll(contractAddress, 'true').call()
    } catch(e) {
        console.log(e);
    }
}

export const UserSetApprovalForAll = async (account, signer) => {
    const contract = new ethers.Contract(contractAddress, erc721ContractABI, signer)
    try {
        await contract.setApprovalForAll(deployerAddress, 'true').call()
    } catch(e) {
        console.log(e);
    }
}

export const ApproveNFT = async (account, signer) => {
    const contract = new ethers.Contract(contractAddress, erc721ContractABI, signer)
    let totalSupply = await contract.totalSupply()
    console.log(`Looking for tokens owned by ${account}`);
    for(let i = 0; i < totalSupply; i++) {
        let tokenOwner = await contract.ownerOf(i)
        if(tokenOwner.toLowerCase() === account.toLowerCase()) {
            console.log(`Token ${i} owned by account ${account}`);
            console.log(`Initiating approve to contract ${contractAddress}`);
            await contract.approve(contractAddress, i)
            i = totalSupply;
        }
    }
    console.log('If no transaction was initiated, there were no tokens found.');
}


