const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });
    // expect(createMessage).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });
  
  // it('gets all orders from the db', async () => {
  //   const order = await Order.insert({ quantity: 10 });

  //   return request(app)
  //     .get('/api/v1/orders')
  //     .then((res) => {
  //       expect(res.body).toEqual([order]);
  //     });
  // });
  it('gets an order by id', async () => {
    const order = await Order.insert({ quantity: 10 });

    return request(app)
      .get(`/api/v1/orders/${order.id}`)
      .then((res) => {
        expect(res.body).toEqual(order);
      });
  });
  // it('updates and order by id', async () => {
  //   const order = await Order.insert({ quantity: 10 });

  //   return request(app)
  //     .get('/api/v1/orders')
  //     .then((res) => {
  //       expect(res.body).toEqual([order]);
  //     });
  // });
  it('deletes an order by id', async () => {
    const order = await Order.insert({ quantity: 10 });
    return request(app)
      .delete(`/api/v1/orders/${order.id}`)
      .then((res) => {
        expect(res.body).not.toContain(order);
      });
  });
});
