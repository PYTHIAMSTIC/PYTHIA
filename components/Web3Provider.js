import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ethers } from 'ethers';

// Configure chains and providers
const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
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

// Web3Provider component wrapping the app with RainbowKit and Wagmi configuration
export const Web3Provider = ({ children }) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
);
