import { Web3Auth } from '@web3auth/modal';
import { useEffect, useState, createContext, useContext } from 'react';
import { ethers } from 'ethers';

export const Web3AuthContext = createContext(null);

export const Web3AuthProvider = ({ children }) => {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID, // Use an environment variable for the client ID
          chainConfig: { chainNamespace: "eip155", chainId: "0x1" }, // Ethereum Mainnet
        });

        await web3authInstance.initModal();
        setWeb3auth(web3authInstance);

        if (web3authInstance.provider) {
          const web3Provider = new ethers.providers.Web3Provider(web3authInstance.provider);
          setProvider(web3Provider);
        }
      } catch (error) {
        console.error("Error initializing Web3Auth:", error);
      }
    };

    initWeb3Auth();
  }, []);

  const login = async () => {
    if (!web3auth) return;

    try {
      const web3authProvider = await web3auth.connect();
      const ethersProvider = new ethers.providers.Web3Provider(web3authProvider);
      setProvider(ethersProvider);
    } catch (error) {
      console.error('Web3Auth Login Error:', error);
    }
  };

  const logout = async () => {
    if (!web3auth) return;

    try {
      await web3auth.logout();
      setProvider(null);
    } catch (error) {
      console.error('Web3Auth Logout Error:', error);
    }
  };

  return (
    <Web3AuthContext.Provider value={{ provider, login, logout }}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  return useContext(Web3AuthContext);
};
