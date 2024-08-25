import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWeb3Auth } from '../components/Web3AuthProvider';

export default function HomePage() {
  const { login, logout, provider } = useWeb3Auth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>PYTHIA: Zodiac and Tarot Voice of the Ancients</h1>
      <ConnectButton />

      <div style={{ marginTop: '20px' }}>
        {!provider ? (
          <>
            <button onClick={login}>Login with Social Account</button>
            <p style={{ fontSize: '12px', color: 'gray' }}>
              (Use Google, Facebook, or Twitter to connect your wallet)
            </p>
          </>
        ) : (
          <>
            <p>Connected to Web3 via Social Login</p>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}
