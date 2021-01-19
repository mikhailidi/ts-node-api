import request from 'supertest';
import App from '../../../src/App';

const CONTRACT_HAS_NO_PAYMENT_HISTORY = 123;

describe('Retrieving tenant payment history', () => {
  it('Tests endpoint returns success response for contract with no payment history', async () => {
    const result = await request(App)
      .get(`/contracts/${CONTRACT_HAS_NO_PAYMENT_HISTORY}/payments/search`)
      .send();

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      sum: 0,
      items: []
    });
  });
});
