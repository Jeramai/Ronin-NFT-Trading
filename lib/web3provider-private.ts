'use server';

import { Contract, JsonRpcProvider, Wallet } from 'ethers';
import ABI from './ABI';

async function getPrivateContract() {
  const RONIN_RPC_URL =
    process.env.NEXT_PUBLIC_CHAIN_ID == '2020' ? 'https://api.roninchain.com/rpc' : 'https://saigon-testnet.roninchain.com/rpc';
  const provider = new JsonRpcProvider(RONIN_RPC_URL);
  const privateKey = process.env.WALLET_PRIVATE_KEY as string;
  const wallet = new Wallet(privateKey, provider);

  return new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string, ABI, wallet);
}

export async function proposeTrade(fromAddress: string, toAddress: string) {
  const contract = await getPrivateContract();

  try {
    // Send the transaction
    const tx = await contract.proposeTrade(fromAddress, toAddress);
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
