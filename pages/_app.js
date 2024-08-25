import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Web3Provider } from '../components/Web3Provider';
import { Web3AuthProvider } from '../components/Web3AuthProvider';

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Web3AuthProvider>
        <Component {...pageProps} />
      </Web3AuthProvider>
    </Web3Provider>
  );
}

export default MyApp;
