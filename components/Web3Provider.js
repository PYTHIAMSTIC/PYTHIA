import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chain, mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'PYTHIA',
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const Web3Provider = ({ children }) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
);
