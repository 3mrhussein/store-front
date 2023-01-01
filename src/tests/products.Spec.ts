import supertest from 'supertest';
import { app } from '..';
const request = supertest(app);

describe('Test Products End Points', () => {
  it('Expect products/ To GET 200', async () => {
    const response = await request.get('/products');
    expect(response.statusCode).toBe(200);
  });

  it('Expect products/top/ To GET 200', async () => {
    const response = await request.get('/products/top');
    expect(response.statusCode).toBe(200);
  });
  it('Expect products/search/ To GET 200', async () => {
    const response = await request.get('/products/search');
    expect(response.statusCode).toBe(200);
  });
  it('Expect products/category/ To GET 200', async () => {
    const response = await request.get('/products/category');
    expect(response.statusCode).toBe(200);
  });

  it('Expect products/:id To Throw Error Invalid UUID GET 404', async () => {
    const response = await request.get('/products/invalid');
    expect(response.statusCode).toBe(400);
  });

  it('Expect products/create/ To Require Authentication GET 302', async () => {
    const response = await request.get('/products/create');
    expect(response.statusCode).toBe(302);
  });

  it('Expect products/create/ To Require Authentication POST 302', async () => {
    const response = await request.post('/products/create');
    expect(response.statusCode).toBe(302);
  });
});
