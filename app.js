import { Client } from "twitter-api-sdk";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
console.log(process.env.BEARER_TOKEN);

let i = 0;
async function main(next_token = "") {
  const client = new Client(process.env.BEARER_TOKEN);

  try {
    const response = await client.tweets.tweetsRecentSearch({
      query: "bjorka",
      max_results: 100,
      next_token,
    });
    console.log("response", JSON.stringify(response, null, 2));
    fs.writeFileSync(`./data/data${i}.json`, JSON.stringify(response));
    if (response.meta.next_token) {
      i++;
      main(response.meta.next_token);
    } else {
      return `
      ====================
      FINISH FETCHING DATA
      ====================`;
    }
  } catch (error) {
    console.log(error);
  }
}

main();
