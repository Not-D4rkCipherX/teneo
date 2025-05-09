# Teneo Community Node BOT
Teneo Community Node BOT

- Register Here : [Teneo Community Node Dashboard](https://dashboard.teneo.pro/auth/signup)
- Download Extension Here : [Teneo Community Node Extension](https://chromewebstore.google.com/detail/teneo-community-node/emcclcoaglgcpoognfiggmhnhgabppkm)
- Use Code : fGgJ4

## Features

  - Auto Get Account Information
  - Auto Run With [Monosans](https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/all.txt) Proxy - Choose 1
  - Auto Run With Private Proxy - Choose 2
  - Auto Run Without Proxy - Choose 3
  - Auto Claim Refferal Reward
  - Auto Claim Refferal & Heartbeat Campaigns Reward
  - Auto Connect and Reconnect Websocket
  - Auto Receive Message Every 15 Minutes
  - Multi Accounts With Threads
    
# How to Get Teneo Access Token

1. Open your browser and login to the TENEO dashboard.
2. Press `F12` to open the **Inspect Elements** panel.
3. Go to the **Console** tab and paste the following code:

   ```javascript
   localStorage.getItem('accessToken')
   ```

4. You will receive your user ID, which looks like this: `"eyjxxxx........"`
5. If you can't paste, type allow pasting and press Enter, then paste the line above.

## Requiremnets

- Make sure you have Python3.9 or higher installed and pip.

## Instalation

1. **Clone The Repositories:**
   ```bash
   git clone https://github.com/Not-D4rkCipherX/teneo.git
   cd teneo
   npm i
   ```
   
## Configuration
```bash
nano tokens.txt
```
- Make sure `tokens.txt` contains data that matches the format expected by the script. Here are examples of file formats:
  ```bash
    eyjxxxx1
    eyjxxxx2
  ```
## For Proxy
```bash
nano proxies.txt
```
- Make sure `proxies.txt` contains data that matches the format expected by the script. Here are examples of file formats:
  ```bash
    ip:port # Default Protcol HTTP.
    protocol://ip:port
    protocol://user:pass@ip:port
  ```

## Run

```bash
node main.js
```

## Buy Me a Coffee

- EVM: 0x47f41Fcb17cF9B7A02C26EE855d26bB8D3928E1b
- TON: UQA-qG5eyQ7gVxvPDpy484xzc0UPS9a8hJsUAwe0T_3D7_oF
- SOL: A1pUv13rRDtubtYJuXswZYSQBJojPhthXJftfNZBRnEX
- SUI: 0xeb697918d66c4ade867d61d0b8fb541df83675e8f60b6b81da8917aab149ee8f

Thank you for visiting this repository, don't forget to contribute in the form of follows and stars.
If you have questions, find an issue, or have suggestions for improvement, feel free to contact me or open an *issue* in this GitHub repository.
