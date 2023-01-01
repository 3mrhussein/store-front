import Users from '../user.model';
import dotenv from 'dotenv';
dotenv.config();

describe('Testing User Model', () => {
  const userModel = new Users();
  it('Should have create method', () => {
    expect(userModel.create).toBeDefined();
  });

  it('Should have index method', () => {
    expect(userModel.index).toBeDefined();
  });

  it('Should have show method', () => {
    expect(userModel.show).toBeDefined();
  });
  it('Should have showByName method', () => {
    expect(userModel.showByName).toBeDefined();
  });
});
