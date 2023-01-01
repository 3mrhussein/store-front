import dotenv from 'dotenv';
import Orders from '../orders.model';
dotenv.config();

describe('Testing Order Model', () => {
  const orderModel = new Orders();
  it('Should have index method', () => {
    expect(orderModel.index).toBeDefined();
  });
  it('Should have create method', () => {
    expect(orderModel.create).toBeDefined();
  });

  it('Should have Get Current Order  method', () => {
    expect(orderModel.currentOrder).toBeDefined();
  });
  it('Should have Get Completed Orders method', () => {
    expect(orderModel.compeletedOrders).toBeDefined();
  });
  it('Should have Insert Product Item to Order method', () => {
    expect(orderModel.insertProduct).toBeDefined();
  });
});
