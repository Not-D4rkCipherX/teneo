const WebSocket = require("ws");
const { promisify } = require("util");
const fs = require("fs");
const readline = require("readline");
const axios = require("axios");
const HttpsProxyAgent = require("https-proxy-agent");
const chalk = require("chalk");
const { loadData, sleep } = require("./utils");
const { refreshTokens } = require("./getToken");

console.log(chalk.yellow.bold(` JOIN (https://t.me/D4rkCipherX)`));

const auth =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlra25uZ3JneHV4Z2pocGxicGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0MzgxNTAsImV4cCI6MjA0MTAxNDE1MH0.DRAvf8nH1ojnJBc3rD_Nw6t1AV8X_g6gmY_HByG2Mag";
const reffCode = "OwAG3kib1ivOJG4Y0OCZ8lJETa6ypvsDtGmdhcjA";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function registerUser() {
  const isExistUrl = "https://auth.teneo.pro/api/check-user-exists";
  const signupUrl = "https://node-b.teneo.pro/auth/v1/signup";
  const data = loadData("accounts_register.txt");
  if (data.length == 0) {
    return console.log(`Not found accounts accounts_register.txt to register`);
  }

  for (const line of data) {
    await sleep(1);
    const [email, password] = line.split("|");
    console.log(`Registering for account: ${email}...`.blue);
    try {
      const isExist = await axios.post(
        isExistUrl,
        { email: email },
        {
          headers: {
            "x-api-key": reffCode,
          },
        }
      );

      if (isExist && isExist.data && isExist.data.exists) {
        console.log("User already exists, please just login with:", email);
        return;
      } else {
        const response = await axios.post(
          signupUrl,
          {
            email: email,
            password: password,
            data: { invited_by: "c4ECB" },
            gotrue_meta_security: {},
            code_challenge: null,
            code_challenge_method: null,
          },
          {
            headers: {
              apikey: auth,
              "Content-Type": "application/json",
              authorization: `Bearer ${auth}`,
              "x-client-info": "supabase-js-web/2.47.10",
              "x-supabase-api-version": "2024-01-01",
            },
          }
        );
      }

      console.log("Registration successful Please Confirm your email at :".green, email);
    } catch (error) {
      console.error("Error during registration:", error.response ? error.response.data : error.message);
    } finally {
      console.log("Completed register all accounts, please verify email before login:".green);
      await sleep(2);
      process.exit(0);
    }
  }
}

async function main() {
  rl.question("Would you like to:\n1. Register an account\n2. Get token\nChoose an option: ", async (option) => {
    switch (option) {
      case "1":
        await registerUser();
      case "2":
        await refreshTokens();
      default:
        console.log("Invalid option. Exiting...");
    }
    process.exit(0);
  });
}
//run
main();
