import ERC721 from '@openzeppelin/contracts/build/contracts/ERC721.json';
import { ChainIds, requestRoninWalletConnector } from '@sky-mavis/tanto-connect';
import { BrowserProvider, Contract } from 'ethers';
import ABI from './ABI';

async function connectWallet() {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID == '2020' ? ChainIds.RoninMainnet : ChainIds.RoninTestnet;
  const connector = await requestRoninWalletConnector();
  return connector.connect(chainId);
}
async function getContract() {
  const wallet = await connectWallet();
  const provider = new BrowserProvider(wallet.provider);
  const signer = await provider.getSigner(wallet.account);

  return new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string, ABI, signer);
}

export async function proposeTrade(trader: string) {
  const contract = await getContract();

  try {
    // Send the transaction
    const tx = await contract.proposeTrade(trader);
    // Wait for transaction to be mined
    const receipt = await tx.wait();

    // Get the trade ID from the event
    const event = receipt.logs[0];
    const parsedEvent = contract.interface.parseLog(event);
    return parseInt(parsedEvent?.args?.tradeId);
  } catch (error) {
    console.error('Error proposing trade:', error);
    throw error;
  }
}
export async function agreeTrade(tradeIndex: number, tokenAHash: string, tokenAId: number, tokenBHash: string, tokenBId: number) {
  const contract = await getContract();

  try {
    // Send the transaction
    const tx = await contract.agreeTrade(tradeIndex, tokenAHash, tokenAId, tokenBHash, tokenBId);
    // Wait for transaction to be mined
    await tx.wait();
  } catch (error) {
    console.error('Error proposing trade:', error);
    throw error;
  }
}
export async function confirmTrade(tradeIndex: number) {
  const contract = await getContract();

  try {
    // Send the transaction
    const tx = await contract.confirmTrade(tradeIndex);
    // Wait for transaction to be mined
    await tx.wait();
  } catch (error) {
    console.error('Error proposing trade:', error);
    throw error;
  }
}
export async function getTrade(tradeIndex: number) {
  const contract = await getContract();
  return contract.getTrade(tradeIndex);
}

export async function approveNftTransfer(nftContractAddress: string, NftId: number) {
  const wallet = await connectWallet();
  const provider = new BrowserProvider(wallet.provider);
  const signer = await provider.getSigner(wallet.account);

  const nftContract = new Contract(nftContractAddress, ERC721.abi, signer);
  try {
    const tx = await nftContract.approve(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, NftId);
    await tx.wait();
  } catch (error) {
    console.error('Error approving NFT transfer:', error);
    throw error;
  }
}
