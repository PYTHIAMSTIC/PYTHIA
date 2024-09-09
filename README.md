# PYTHIA (c) 2024 PYTHAI
<a href="https://delphi.pythai.net">delphi.pythai.net</a><br />
<a href="https://x.com/pythaiamstic">MsTic Pythia: Oracle of Delphi</a>

```nodejs
bankon-nodejs/
├── public/
│   ├── css/
│   │   └── styles.css
│   └── index.html
├── routes/
│   └── auth.js
├── views/
│   └── restricted.html
├── server.js
├── package.json
└── .env
```



create a new directory named pythia with the following structure:<br />

src/: The directory where you'll place your Solidity contracts<br />
lib/: A directory for dependencies<br />
script/: The directory for your deployment or other scripts<br />
test/: The directory where you'll write your tests<br />

# install foundry
```bash
curl -L https://foundry.paradigm.xyz | bash
source ~/.bashrc
foundryup
forge init pythia
```

# compile pythia contract
```bash
cd pythia
forge build
```

# add openzeppelin to foundry
```bash
forge install OpenZeppelin/openzeppelin-contracts
```

update to latest and greatest
```bash
forge update OpenZeppelin/openzeppelin-contracts
```

lock to a specific release
```bash
forge install OpenZeppelin/openzeppelin-contracts@v4.8.0
```

# frontend UIUX

```bash
pythia-nextjs/
│
├── pages/
│   ├── _app.js               # Custom App component to wrap pages with providers
│   ├── index.js              # Home page (equivalent to App.js in React)
│   └── api/                  # API routes if needed
├── components/
│   ├── Web3AuthProvider.js   # Web3Auth context and provider
│   └── Web3Provider.js       # Wagmi and RainbowKit configuration
├── public/                   # Static assets
├── styles/                   # Global styles and CSS files
├── next.config.js            # Next.js configuration file
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation


npx create-next-app pythia-nextjs
cd pythia-nextjs
npm init
npm install @web3auth/core @web3auth/modal ethers wagmi @rainbow-me/rainbowkit
```




