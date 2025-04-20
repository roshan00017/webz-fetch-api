import axios from "axios";
import { NewsApiClient } from "../../services/webz-client.service";
import { NewsPostService } from "../../services/news-post.service";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the `saveNewsPosts` method of `NewsPostService`
jest
  .spyOn(NewsPostService.prototype, "saveNewsPosts")
  .mockImplementation(async () => {});

describe("NewsApiClient", () => {
  let newsApiClient: NewsApiClient;

  beforeEach(() => {
    newsApiClient = new NewsApiClient("test-api-key", "https://api.test.com");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch news and save posts in batches", async () => {
    const mockResponse = {
      data: {
        posts: [
          { uuid: "1", title: "Test Post 1" },
          { uuid: "2", title: "Test Post 2" },
        ],
        totalResults: 2,
        moreResultsAvailable: 0,
        next: null,
        requestsLeft: 100,
        warnings: null,
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    await newsApiClient.fetchNews("test-query", 10, 200);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.test.com/newsApiLite?token=test-api-key&q=test-query&size=10"
    );
    expect(NewsPostService.prototype.saveNewsPosts).toHaveBeenCalledTimes(1);
    expect(NewsPostService.prototype.saveNewsPosts).toHaveBeenCalledWith(
      mockResponse.data.posts
    );
  });
});

//TODO - Add more tests for different scenarios, such as error handling, multiple batches, etc.
