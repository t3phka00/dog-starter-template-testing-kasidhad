import { describe, it, expect, vi, beforeEach } from "vitest";
import { getRandomDogImage } from "../services/dogService";

describe("dogService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return image URL and success status when API succeeds", async () => {
    const mockApiResponse = {
      message: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
      status: "success"
    };
    
    const mockFetchResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockApiResponse)
    };
    
    global.fetch = vi.fn().mockResolvedValue(mockFetchResponse);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockApiResponse.message);
    expect(result.status).toBe("success");
    expect(global.fetch).toHaveBeenCalledOnce();
  });

  it("should throw error when API returns 500", async () => {
    const mockFetchResponse = {
      ok: false,
      status: 500
    };
    
    global.fetch = vi.fn().mockResolvedValue(mockFetchResponse);

    await expect(getRandomDogImage()).rejects.toThrow(
      "Failed to fetch dog image: Dog API returned status 500"
    );
  });
});