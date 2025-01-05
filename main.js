const WebSocket = require("ws");
const fs = require("fs/promises");
const { HttpsProxyAgent } = require("https-proxy-agent");
const readline = require("readline");
const colors = require("colors");

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const tokens = data
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);
    return tokens;
  } catch (error) {
    console.error("Error reading file:", error.message);
    return [];
  }
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class WebSocketClient {
  constructor(token, proxy = null, accountIndex, proxyIP) {
    this.token = token;
    this.proxy = proxy;
    this.proxyIp = proxyIP;
    this.accountIndex = accountIndex;

    this.socket = null;
    this.pingInterval = null;
    this.reconnectAttempts = 0;
    this.wsUrl = "wss://secure.ws.teneo.pro";
    this.version = "v0.2";
  }

  log(msg, type = "info") {
    switch (type) {
      case "success":
        console.log(`[*][Account ${this.accountIndex + 1}]${this.proxyIp ? `[${this.proxyIp}]` : ""} | ${msg}`.green);
        break;
      case "custom":
        console.log(`[*][Account ${this.accountIndex + 1}]${this.proxyIp ? `[${this.proxyIp}]` : ""} | ${msg}`.magenta);
        break;
      case "error":
        console.log(`[!] ${msg}`.red);
        break;
      case "warning":
        console.log(`[*][Account ${this.accountIndex + 1}]${this.proxyIp != "Local" ? `[${this.proxyIp}]` : ""} | ${msg}`.yellow);
        break;
      default:
        console.log(`[*][Account ${this.accountIndex + 1}]${this.proxyIp != "Local" ? `[${this.proxyIp}]` : ""} | ${msg}`.blue);
    }
  }

  async connect() {
    const wsUrl = `${this.wsUrl}/websocket?accessToken=${encodeURIComponent(this.token)}&version=${encodeURIComponent(this.version)}`;

    const options = {};
    if (this.proxy) {
      options.agent = new HttpsProxyAgent(this.proxy);
    }

    this.socket = new WebSocket(wsUrl, options);

    this.socket.onopen = () => {
      const connectionTime = new Date().toISOString();
      console.log(`[Account ${this.accountIndex + 1}] WebSocket connected at`.green, connectionTime);
      this.reconnectAttempts = 0;
      this.startPinging();
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(`[Account ${this.accountIndex + 1}] Received message from WebSocket:`, data);
    };

    this.socket.onclose = () => {
      this.log("WebSocket disconnected", "warning");
      this.stopPinging();
      this.reconnect();
    };

    this.socket.onerror = (error) => {
      console.log(`[Account ${this.accountIndex + 1}] WebSocket error: `.red, error.message);
    };
  }

  reconnect() {
    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 30000);
    this.log(`Reconnecting in ${delay / 1000} seconds...`);
    setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.stopPinging();
    }
  }

  startPinging() {
    this.stopPinging();
    this.pingInterval = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: "PING" }));
      }
    }, 10000);
  }

  stopPinging() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
}
async function checkProxyIP(proxy) {
  try {
    const proxyAgent = new HttpsProxyAgent(proxy);
    const response = await axios.get("https://api.ipify.org?format=json", { httpsAgent: proxyAgent });
    if (response.status === 200) {
      return response.data.ip;
    }
  } catch (error) {}
  return null;
}
async function main() {
  try {
    const tokens = await readFile("tokens.txt");
    rl.question("Do you want to use a proxy? (y/n): ".blue, async (useProxyAnswer) => {
      let useProxy = useProxyAnswer.toLowerCase() === "y";
      let proxies = [];

      if (useProxy) {
        proxies = await readFile("proxies.txt");
      }

      if (tokens.length > 0) {
        const wsClients = [];

        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          const proxy = proxies[i % proxies.length] || null;
          let proxyIP = null;
          if (proxy) {
            try {
              proxyIP = await checkProxyIP(proxy);
            } catch (error) {
              console.log(`Cannot check proxy IP: ${error.message}...skipping`.yellow);
              continue;
            }
          }

          console.log(`Connecting WebSocket for account: ${i + 1} - Proxy: ${proxy || "None"}`.blue);

          const wsClient = new WebSocketClient(token, proxy, i, proxyIP);
          wsClient.connect();
          wsClients.push(wsClient);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        process.on("SIGINT", () => {
          console.log("Program exited. Stopping pinging and disconnecting All WebSockets...".yellow);
          wsClients.forEach((client) => client.stopPinging());
          wsClients.forEach((client) => client.disconnect());
          process.exit(0);
        });
      } else {
        console.log("No tokens found in tokens.txt - exiting...".yellow);
        process.exit(0);
      }
    });
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

main();
