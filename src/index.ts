import dotenv from "dotenv";
import logger from "./utils/logger.util";
import { NewsApiClient } from "./services/webz-client.service";
import { NewsPostService } from "./services/news-post.service";
import readline from "readline";

dotenv.config();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create an instance of NewsApiClient
const getNews = new NewsPostService();
const newsApiClient = new NewsApiClient();
function promptUser(): void {
  rl.question(
    "Do you want to run another query? (yes/no): ",
    async (answer: string) => {
      if (answer.toLowerCase() === "yes") {
        await getNews.getNews();
        promptUser(); // Ask again after completing the query
      } else {
        logger.info("Exiting the application.");
        rl.close();
      }
    }
  );
}

async function main() {
  await getNews.getNews();
  promptUser();
}

main();
