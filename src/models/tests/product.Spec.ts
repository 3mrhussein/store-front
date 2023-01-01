import Products from '../products.model';
import dotenv from 'dotenv';
dotenv.config();

describe('Testing Product Model', () => {
  const productModel = new Products();
  it('Should have create method', () => {
    expect(productModel.create).toBeDefined();
  });

  it('Should have index method', () => {
    expect(productModel.index).toBeDefined();
  });

  it('Should have show method', () => {
    expect(productModel.show).toBeDefined();
  });
  it('Should have showByName method', () => {
    expect(productModel.showByName).toBeDefined();
  });
  it('Should have showByCategory method', () => {
    expect(productModel.showByCategory).toBeDefined();
  });
  it('Should have topProducts method', () => {
    expect(productModel.topProducts).toBeDefined();
  });
});
