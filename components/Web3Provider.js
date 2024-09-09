import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import Moralis from 'moralis';

// Configure chains and providers (using Alchemy as a provider)
const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY })]
);

// Configure default wallets for RainbowKit
const { connectors } = getDefaultWallets({
  appName: 'PYTHIA',
  chains,
});

// Create Wagmi client using ethers.js
export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider: provider,
});

// Initialize Moralis with your Moralis server and app ID
Moralis.start({
  apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
});

// Web3Provider component wrapping the app with RainbowKit, Wagmi, and Moralis configurations
export const Web3Provider = ({ children }) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
);

