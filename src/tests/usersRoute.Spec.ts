import supertest from 'supertest';
import { app } from '..';
const request = supertest(app);

describe('Test Users End Points', () => {
  it('Expect users/ To Require Authentication GET 302', async () => {
    const response = await request.get('/users');
    expect(response.statusCode).toBe(302);
  });

  it('Expect users/current-user/ To Require Authentication GET 302', async () => {
    const response = await request.get('/users/current-user');
    expect(response.statusCode).toBe(302);
  });

  it('Expect users/search/ To Require Authentication GET 302', async () => {
    const response = await request.get('/users/search');
    expect(response.statusCode).toBe(302);
  });

  it('Expect users/ To Require Authentication GET 302', async () => {
    const newUserResponse = await request
      .post('/signup')
      .send({ firstName: 'testuser', lastName: 'testuser', password: 'test12' });
    const response = await request.get(`/users/${newUserResponse.body.id}`);
    expect(response.statusCode).toBe(302);
  });
});
