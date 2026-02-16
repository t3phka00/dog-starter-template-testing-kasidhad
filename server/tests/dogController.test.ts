import { describe, it, expect, vi } from "vitest";
import { getDogImage } from "../controllers/dogController";
import * as dogService from "../services/dogService";

vi.mock("../services/dogService", () => ({
  getRandomDogImage: vi.fn()
}));

describe("dogController", () => {
  it("should return success true and mocked image data", async () => {
    const mockImageData = {
      imageUrl: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
      status: "success"
    };
    
    (dogService.getRandomDogImage as any).mockResolvedValue(mockImageData);

    const req = {} as any;
    const res = {
      json: vi.fn()
    } as any;

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockImageData
    });
  });
});