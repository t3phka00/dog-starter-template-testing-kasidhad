import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5000';

test('API: should return random dog image', async ({ request }) => {

  const response = await request.get(`${BASE_URL}/api/dogs/random`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);

  expect(body.data).toBeDefined();

  expect(body.data.imageUrl).toBeDefined();

  expect(typeof body.data.imageUrl).toBe('string');

});

test('API: invalid route returns error', async ({ request }) => {

  const response = await request.get(`${BASE_URL}/api/dogs/invalid`);

  expect(response.status()).toBe(404);

  const body = await response.json();

  expect(body.error).toBeDefined();

  expect(typeof body.error).toBe('string');

});