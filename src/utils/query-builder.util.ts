export class QueryBuilder {
  private filters: string[] = [];

  addKeyword(keyword: string): QueryBuilder {
    this.filters.push(`"${keyword}"`);
    return this;
  }

  addSentiment(sentiment: "positive" | "negative"): QueryBuilder {
    this.filters.push(`sentiment:${sentiment}`);
    return this;
  }

  addAuthor(author: string): QueryBuilder {
    this.filters.push(`author:${author}`);
    return this;
  }

  /**
   * Builds the query string by combining all filters with "AND".
   * @returns The final query string.
   */
  build(): string {
    return this.filters.length ? this.filters.join(" AND ") : "";
  }
}
