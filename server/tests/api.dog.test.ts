import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import dogRoutes from '../routes/dogRoutes';

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);

describe('Dog API Tests', () => {

  it('should return 200 and dog image data for valid route', async () => {
    const response = await request(app)
      .get('/api/dogs/random')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('imageUrl');
    expect(typeof response.body.data.imageUrl).toBe('string');
    expect(response.body.data.imageUrl).toContain('https://');
  });

  it('should return 404 for invalid route', async () => {
    const response = await request(app)
      .get('/api/dogs/invalid-route')
      .expect(404);

    expect(response.status).toBe(404);
  });
});