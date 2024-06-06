'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

const projectId = 'a968843231d52df8229c554e6de695a2' // Using my CHESTS project ID. Feel free to make your own <3

const mainnet = {
  chainId: 8453,
  name: 'Base Mainnet',
  currency: 'ETH',
  explorerUrl: 'https://basescan.org',
  rpcUrl: 'https://mainnet.base.org'
}

const metadata = {
  name: "Rawr Wrappa",
  description: "Wrap and unwrap the RAWR token",
  url: 'https://www.onchaindinos.xyz/',
  icons: ['https://www.onchaindinos.xyz/img/logo.png']
}

const ethersConfig = defaultConfig({
  metadata,

  /*Optional*/
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true, 
  rpcUrl: '...',
  defaultChainId: 8453
})

createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true, 
  enableOnramp: true 
})

export function Web3Modal({ children }) { 
  return children                         
}