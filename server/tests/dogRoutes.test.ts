import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import { Router } from "express";
import * as dogController from "../controllers/dogController";

vi.mock("../controllers/dogController", () => ({
  getDogImage: vi.fn()
}));

describe("dogRoutes", () => {
  let app: express.Application;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    app = express();
    app.use(express.json());
    
    const router = Router();
    router.get("/random", dogController.getDogImage);
    app.use("/api/dogs", router);
  });

  it("should return 200 and mocked image data", async () => {
    (dogController.getDogImage as any).mockImplementation((req: any, res: any) => {
      res.json({
        success: true,
        data: {
          imageUrl: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
          status: "success"
        }
      });
    });

    const response = await request(app)
      .get("/api/dogs/random");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toContain("dog.ceo");
  });

  it("should return 500 and error message", async () => {
    (dogController.getDogImage as any).mockImplementation((req: any, res: any) => {
      res.status(500).json({
        success: false,
        error: "Failed to fetch dog image: Network error"
      });
    });

    const response = await request(app)
      .get("/api/dogs/random");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Failed to fetch dog image: Network error");
  });
});