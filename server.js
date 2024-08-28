
```bash
mkdir bankon-nodejs
cd bankon-nodejs
npm init -y
npm install express dotenv


Creating the .env File
touch .env

```bash WEB3AUTH_CLIENT_ID=your-web3auth-client-id
PORT=3000
```

WEB3AUTH_CLIENT_ID=your-web3auth-client-id
PORT=3000
4. Creating the server.js File
This is the entry point of our Node.js application. It will serve the HTML pages and handle the basic routing.

javascript
Copy code
// server.js

require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Restricted page
app.get('/restricted', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/restricted.html'));
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
5. Creating the index.html File
This is the main login page with a button to trigger Web3Auth login.

html
Copy code
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BANKON Login</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to BANKON</h1>
        <button id="login-button">Login with Web3Auth</button>
        <p id="message"></p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@web3auth/web3auth@1.1.0"></script>
    <script>
        document.getElementById('login-button').addEventListener('click', async function () {
            const clientId = '<?= process.env.WEB3AUTH_CLIENT_ID ?>'; // Web3Auth Client ID

            const web3auth = new Web3Auth({
                clientId: clientId,
                chainConfig: {
                    chainNamespace: "eip155",
                    chainId: "0x1", // Ethereum mainnet
                    rpcTarget: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"
                }
            });

            await web3auth.initModal();
            const provider = await web3auth.connect();

            if (provider) {
                document.getElementById('message').textContent = 'Login successful! Redirecting...';
                setTimeout(() => {
                    window.location.href = '/restricted';
                }, 2000);
            } else {
                document.getElementById('message').textContent = 'Login failed!';
            }
        });
    </script>
</body>
</html>
6. Creating the restricted.html File
This is the restricted page that users are redirected to after a successful login.

html
Copy code
<!-- views/restricted.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restricted Area</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <div class="container">
        <h1>Restricted Area</h1>
        <p>You have successfully logged in to the restricted area.</p>
    </div>
</body>
</html>
7. Creating the styles.css File
Add some basic styling for the HTML pages.

css
Copy code
/* public/css/styles.css */
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    text-align: center;
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    margin-bottom: 20px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

p {
    margin-top: 20px;
    color: #333;
}
8. Running the Application
To run the application, use the following command:

bash
Copy code
node server.js
You should see the following message in your terminal:

arduino
Copy code
Server is running on http://localhost:3000
9. Testing the Application
Login: Visit http://localhost:3000 in your browser. You should see the BANKON login page with the "Login with Web3Auth" button.
Redirect: After successfully logging in via Web3Auth, the user will be redirected to the /restricted page, which is only accessible after logging in.
10. Conclusion
This third version of BANKON is a simple, pure Node.js example that demonstrates how to implement a basic login experience with Web3Auth. It includes a redirect to a restricted area upon successful authentication, providing a foundation for more complex web applications. This setup is minimal, focusing on core functionalities using plain HTML, CSS, and Node.js without the overhead of frameworks like Express or EJS templating.
