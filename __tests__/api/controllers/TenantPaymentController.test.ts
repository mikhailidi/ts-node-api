import request from 'supertest';
import App from '../../../src/App';

const CONTRACT_HAS_NO_PAYMENT_HISTORY = 123;
const CONTRACT_HAS_PAYMENT_HISTORY = 111222;

describe('Retrieving tenant payment history', () => {
  /**
   * After all tests are done
   */
  afterAll(async done => {
    App.close();
    done();
  });

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

  it('Tests endpoint returns success with no search parameters specified', async () => {
    const result = await request(App)
      .get(`/contracts/${CONTRACT_HAS_PAYMENT_HISTORY}/payments/search`)
      .send();

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      sum: 0,
      items: [
        {
          id: 1367,
          contractId: 111222,
          description: 'Rent to be paid 2',
          value: -100,
          time: '2016-12-01T00:00:00.000Z',
          isImported: false,
          createdAt: '2016-12-01T12:57:09.708Z',
          updatedAt: '2016-12-09T12:57:09.709Z',
          isDeleted: false
        },
        {
          id: 1368,
          contractId: 111222,
          description: 'Rent to be paid 3',
          value: 100,
          time: '2018-12-09T00:00:00.000Z',
          isImported: false,
          createdAt: '2018-12-01T12:57:09.708Z',
          updatedAt: '2018-12-09T12:57:09.709Z',
          isDeleted: false
        },
        {
          id: 1369,
          contractId: 111222,
          description: 'Rent payment 4',
          value: 100,
          time: '2018-12-09T00:00:00.000Z',
          isImported: false,
          createdAt: '2018-12-09T12:57:09.708Z',
          updatedAt: '2020-12-09T12:57:09.709Z',
          isDeleted: false
        },
        {
          id: 1370,
          contractId: 111222,
          description: 'Rent to be paid 4',
          value: -100,
          time: '2019-06-09T00:00:00.000Z',
          isImported: false,
          createdAt: '2019-06-09T12:57:09.708Z',
          updatedAt: '2020-12-09T12:57:09.709Z',
          isDeleted: false
        }
      ]
    });
  });

  it('Tests endpoint returns success with startDate only', async () => {
    const result = await request(App)
      .get(`/contracts/${CONTRACT_HAS_PAYMENT_HISTORY}/payments/search?startDate=2018-01-01`)
      .send();

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      sum: 100,
      items: [
        {
          id: 1368,
          contractId: 111222,
          description: 'Rent to be paid 3',
          value: 100,
          time: '2018-12-09T00:00:00.000Z',
          isImported: false,
          createdAt: '2018-12-01T12:57:09.708Z',
          updatedAt: '2018-12-09T12:57:09.709Z',
          isDeleted: false
        },
        {
          id: 1369,
          contractId: 111222,
          description: 'Rent payment 4',
          value: 100,
          time: '2018-12-09T00:00:00.000Z',
          isImported: false,
          createdAt: '2018-12-09T12:57:09.708Z',
          updatedAt: '2020-12-09T12:57:09.709Z',
          isDeleted: false
        },
        {
          id: 1370,
          contractId: 111222,
          description: 'Rent to be paid 4',
          value: -100,
          time: '2019-06-09T00:00:00.000Z',
          isImported: false,
          createdAt: '2019-06-09T12:57:09.708Z',
          updatedAt: '2020-12-09T12:57:09.709Z',
          isDeleted: false
        }
      ]
    });
  });

  it('Tests endpoint returns success with endDate only', async () => {
    const result = await request(App)
      .get(`/contracts/${CONTRACT_HAS_PAYMENT_HISTORY}/payments/search?endDate=2018-01-01`)
      .send();

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      sum: -100,
      items: [
        {
          id: 1367,
          contractId: 111222,
          description: 'Rent to be paid 2',
          value: -100,
          time: '2016-12-01T00:00:00.000Z',
          isImported: false,
          createdAt: '2016-12-01T12:57:09.708Z',
          updatedAt: '2016-12-09T12:57:09.709Z',
          isDeleted: false
        },
      ]
    });
  });

  it('Tests endpoint returns success with both startDate and endDate', async () => {
    const result = await request(App)
      .get(`/contracts/${CONTRACT_HAS_PAYMENT_HISTORY}/payments/search?startDate=2018-01-01&endDate=2018-12-31`)
      .send();

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      sum: 200,
      items: [
        {
          id: 1368,
          contractId: 111222,
          description: 'Rent to be paid 3',
          value: 100,
          time: '2018-12-09T00:00:00.000Z',
          isImported: false,
          createdAt: '2018-12-01T12:57:09.708Z',
          updatedAt: '2018-12-09T12:57:09.709Z',
          isDeleted: false
        },
        {
          id: 1369,
          contractId: 111222,
          description: 'Rent payment 4',
          value: 100,
          time: '2018-12-09T00:00:00.000Z',
          isImported: false,
          createdAt: '2018-12-09T12:57:09.708Z',
          updatedAt: '2020-12-09T12:57:09.709Z',
          isDeleted: false
        },
      ]
    });
  });
});
