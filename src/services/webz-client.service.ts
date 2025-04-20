import axios from "axios";
import dotenv from "dotenv";
import logger from "../utils/logger.util";
import { NewsPost } from "../model/news-post.model";
import { NewsPostService } from "./news-post.service";

dotenv.config();

interface ApiResponse {
  posts: NewsPost[];
  totalResults: number;
  moreResultsAvailable: number;
  next: string | null;
  requestsLeft: number;
  warnings: string | null;
}
const newsPostService = new NewsPostService();

export class NewsApiClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(
    apiKey: string = process.env.WEBZ_API_KEY || "",
    baseUrl: string = "https://api.webz.io"
  ) {
    if (!apiKey) {
      throw new Error("WEBZ_API_KEY is not set in the environment variables");
    }
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }
  async fetchNews(
    query: string,
    batchSize: number = 10,
    maxBatchSize: number = 200,
    next: string | null = null
  ): Promise<void> {
    if (!query.trim()) {
      throw new Error("Query parameter cannot be empty");
    }

    if (batchSize <= 0 || maxBatchSize <= 0) {
      throw new Error("Batch size and max batch size must be greater than 0");
    }

    let hasMore = true;
    let nextToken = next;
    let totalFetched = 0;
    const maxIterations = 100; // Safeguard to prevent infinite loops
    let iterationCount = 0;

    while (hasMore && iterationCount < maxIterations) {
      iterationCount++;
      let batchResults: NewsPost[] = [];
      let batchFetched = 0;

      // Fetch results in batches of `batchSize` until `maxBatchSize` is reached
      while (batchFetched < maxBatchSize && hasMore) {
        try {
          const url = this.buildUrl(query, batchSize, nextToken);
          logger.info(`Fetching results with URL: ${url}`);
          const response = await axios.get<ApiResponse>(url);

          batchResults.push(...response.data.posts);
          batchFetched += response.data.posts.length;
          totalFetched += response.data.posts.length;

          logger.info(
            `Fetched ${response.data.posts.length} posts in this batch. Total fetched so far: ${totalFetched}.`
          );

          hasMore = response.data.moreResultsAvailable > 0;
          nextToken = response.data.next;

          logger.info(`Requests left: ${response.data.requestsLeft}`);
          if (response.data.warnings) {
            logger.warn(`API Warning: ${response.data.warnings}`);
          }
        } catch (error: any) {
          logger.error(`Error fetching news: ${error.message}`, {
            stack: error.stack,
          });
          throw new Error(`Failed to fetch news for query "${query}"`);
        }
      }

      // Save the current batch to the database
      if (batchResults.length > 0) {
        logger.info(`Saving ${batchResults.length} posts to the database.`);
        await newsPostService.saveNewsPosts(batchResults); // Save the batch to the database
        logger.info(
          `Batch of ${batchResults.length} posts saved successfully.`
        );
      }

      logger.info(
        `Batch complete. Fetched ${batchFetched} posts in this batch. Total fetched so far: ${totalFetched}.`
      );

      // If the total fetched in this batch is less than `maxBatchSize`, stop fetching
      if (batchFetched < maxBatchSize) {
        break;
      }
    }

    if (iterationCount >= maxIterations) {
      logger.warn("Reached maximum iteration limit while fetching news");
    }

    logger.info(`Finished fetching news. Total fetched: ${totalFetched}`);
  }
  private buildUrl(
    query: string,
    size: number,
    nextToken: string | null
  ): string {
    if (nextToken) {
      return nextToken.startsWith("/")
        ? `${this.baseUrl}${nextToken}`
        : nextToken;
    }

    return `${this.baseUrl}/newsApiLite?token=${
      this.apiKey
    }&q=${encodeURIComponent(query)}&size=${size}`;
  }
}
