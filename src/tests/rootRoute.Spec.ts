import supertest from 'supertest';
import { app } from '..';
const request = supertest(app);

describe('Test root End Points', () => {
  it('Expect GET "/" 200', async () => {
    const response = await request.get('/');
    expect(response.statusCode).toBe(200);
  });
  it('Expect GET "/signup"  200', async () => {
    const response = await request.get('/signup');
    expect(response.statusCode).toBe(200);
  });
  it('Expect signin/ to GET 200 ', async () => {
    const response = await request.get('/signin');
    expect(response.statusCode).toBe(200);
  });

  it('Expect signup/ To POST 200 ', async () => {
    await request
      .post('/signup')
      .send({ firstName: 'Amr', lastName: 'Hussein', password: 'test12' })
      .expect(200);
  });

  it('Expect POST signin/ To Redirect("/") 302 ', async () => {
    await request
      .post('/signin')
      .send({ firstName: 'Amr', lastName: 'Hussein', password: 'test12' })
      .expect(302);
  });
});
