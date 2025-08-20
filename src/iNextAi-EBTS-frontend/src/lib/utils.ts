import { mainnet, polygon, base } from 'viem/chains';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/blockchain-helpers.ts

export const SUPPORTED_CHAINS = {
  [mainnet.id]: {
    ...mainnet,
    blockExplorer: 'https://etherscan.io'
  },
  [polygon.id]: {
    ...polygon, 
    blockExplorer: 'https://polygonscan.com'
  },
  [base.id]: {
    ...base,
    blockExplorer: 'https://basescan.org'
  }
} as const;

export const getChainName = (chainId: number): string => {
  return SUPPORTED_CHAINS[chainId as keyof typeof SUPPORTED_CHAINS]?.name || 'Unknown Chain';
};

export const getBlockExplorer = (chainId: number): string => {
  return SUPPORTED_CHAINS[chainId as keyof typeof SUPPORTED_CHAINS]?.blockExplorer || '';
};

export const formatBalance = (balance: string | number, decimals = 4): string => {
  const num = typeof balance === 'string' ? parseFloat(balance) : balance;
  return num.toFixed(decimals);
};
