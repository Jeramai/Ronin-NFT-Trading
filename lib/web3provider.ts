'use server';

import ABI from '@/lib/ABI';
import { AddressLike, Contract, JsonRpcProvider, Wallet } from 'ethers';

export async function tradingProvider() {
  const RONIN_RPC_URL =
    process.env.NEXT_PUBLIC_CHAIN_ID == '2020' ? 'https://api.roninchain.com/rpc' : 'https://saigon-testnet.roninchain.com/rpc';
  return new JsonRpcProvider(RONIN_RPC_URL);
}
export async function tradingWallet() {
  const provider = await tradingProvider();
  const privateKey = process.env.WALLET_PRIVATE_KEY as string;
  return new Wallet(privateKey, provider);
}
export async function tradingContract() {
  const wallet = await tradingWallet();
  return new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string, ABI, wallet);
}

export async function getTrade(tradeIndex: number) {
  const contract = await tradingContract();
  return contract.getTrade(tradeIndex);
}
export async function proposeTrade(trader: AddressLike) {
  const contract = await tradingContract();
  const tx = await contract.proposeTrade(trader);
  const receipt = await tx.wait();

  // Try and get the tradeId from the event
  const event = receipt.logs[0];
  const parsedEvent = contract.interface.parseLog(event);
  return parseInt(parsedEvent?.args?.tradeId);
}
