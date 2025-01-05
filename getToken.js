const fs = require("fs/promises");
const axios = require("axios");
const { loadData, sleep } = require("./utils");

const reffCode = "emcclcoaglgcpoognfiggmhnhgabppkm";

async function readAccounts(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const accounts = data.split("\n").map((line) => {
      const [email, password] = line.split("|");
      return { email, password };
    });
    return accounts;
  } catch (err) {
    throw new Error(`Error reading accounts file: ${err.message}`);
  }
}

async function login(email, password) {
  const loginUrl = "https://auth.teneo.pro/api/login";

  try {
    const response = await axios.post(
      loginUrl,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "x-api-key": reffCode,
        },
      }
    );

    const access_token = response.data.access_token;
    return access_token;
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    return null;
  }
}

async function refreshTokens() {
  console.log("Processing getting token to all accounts...".blue);
  try {
    await fs.access("tokens.txt");
    await fs.unlink("tokens.txt");
    console.log("clear old tokens.txt successfully".green);
  } catch (error) {
    console.log("file tokens.txt does not exist, creating new file");
  }
  try {
    const accounts = loadData("accounts.txt");
    if (!accounts.length) {
      console.log("No accounts found in the accounts.txt");
      return;
    }

    for (const account of accounts) {
      const [email, password] = account.split("|");
      console.log("Getting access token for:".blue, email, `waiting...`.blue);
      const token = await login(email, password);
      if (token) {
        console.log("Get Access token successfully:".green, token);
        await fs.appendFile("tokens.txt", token + "\n", "utf8");
        console.log("Token saved to file tokens.txt".green);
      }
    }
  } catch (error) {
    console.error("Error processing accounts:", error.message);
  } finally {
  }
}

module.exports = { refreshTokens };
