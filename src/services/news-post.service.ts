import { pool } from "../config/databse.config";
import logger from "../utils/logger.util";
import { NewsPost } from "../model/news-post.model";
import { NewsApiClient } from "./webz-client.service";
import { QueryBuilder } from "../utils/query-builder.util";

export class NewsPostService {
  /**
   * Save an array of NewsPost objects to the database.
   * @param posts Array of NewsPost objects to save.
   */
  async saveNewsPosts(posts: NewsPost[]): Promise<void> {
    if (posts.length === 0) {
      logger.info("No posts to save.");
      return;
    }

    const values = posts.map((post) => [
      post.uuid,
      post.url,
      post.ord_in_thread,
      post.parent_url,
      post.author,
      post.published,
      post.title,
      post.text,
      post.language,
      post.sentiment,
      JSON.stringify(post.categories),
      JSON.stringify(post.external_links),
      JSON.stringify(post.external_images),
      JSON.stringify(post.entities),
      post.rating,
      post.crawled,
      post.updated,
      JSON.stringify(post.thread),
    ]);

    const query = `
      INSERT INTO news_posts (
        uuid, url, ord_in_thread, parent_url, author, published, title, text,
        language, sentiment, categories, external_links, external_images,
        entities, rating, crawled, updated, thread
      )
      VALUES ${values
        .map(
          (_, i) =>
            `($${i * 18 + 1}, $${i * 18 + 2}, $${i * 18 + 3}, $${
              i * 18 + 4
            }, $${i * 18 + 5}, $${i * 18 + 6}, $${i * 18 + 7}, $${
              i * 18 + 8
            }, $${i * 18 + 9}, $${i * 18 + 10}, $${i * 18 + 11}, $${
              i * 18 + 12
            }, $${i * 18 + 13}, $${i * 18 + 14}, $${i * 18 + 15}, $${
              i * 18 + 16
            }, $${i * 18 + 17}, $${i * 18 + 18})`
        )
        .join(", ")}
      ON CONFLICT (uuid) DO NOTHING
    `;

    try {
      await pool.query(query, values.flat());
      logger.info(`${posts.length} posts successfully saved to the database.`);
    } catch (error: any) {
      logger.error(`Error saving posts to the database: ${error.message}`);
    }
  }

  /**
   * Fetch news data based on dynamic query parameters and save to the database.
   */
  async getNews(): Promise<void> {
    try {
      // Get query parameters dynamically from command-line arguments or environment variables
      const keyword = process.argv[2] || process.env.QUERY_KEYWORD || "Bitcoin";
      const sentimentInput =
        process.argv[3] || process.env.QUERY_SENTIMENT || "positive";
      const sentiment =
        sentimentInput === "positive" || sentimentInput === "negative"
          ? sentimentInput
          : "positive";
      const size = parseInt(
        process.argv[4] || process.env.QUERY_SIZE || "10",
        10
      );
      const maxResults = parseInt(
        process.argv[5] || process.env.QUERY_MAX_RESULTS || "200",
        10
      );

      logger.info(
        `Using query parameters: keyword=${keyword}, sentiment=${sentiment}, size=${size}, maxResults=${maxResults}`
      );

      // Build dynamic query
      const query = new QueryBuilder()
        .addKeyword(keyword)
        .addSentiment(sentiment)
        .build();

      // Fetch news data
      const newsClient = new NewsApiClient();
      await newsClient.fetchNews(query, size, maxResults);

      logger.info("News data successfully stored in the database.");
    } catch (error: any) {
      logger.error(`Error in main execution: ${error.message}`);
    }
  }
}
