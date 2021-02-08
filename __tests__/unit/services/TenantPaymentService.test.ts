import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { TenantPayment } from '../../../src/models/TenantPayment';
import { ITenantPaymentRepository } from '../../../src/repositories/TenantPaymentRepository';
import TenantPaymentService from '../../../src/services/TenantPaymentService';
import TenantPaymentDTO from '../../../src/dto/TenantPaymentDTO';

let mockTenantPaymentModel: MockProxy<TenantPayment>;
let mockRepository: MockProxy<ITenantPaymentRepository>;
let testObject: TenantPaymentService;

beforeEach(() => {
  mockTenantPaymentModel = mock<TenantPayment>();
  mockRepository = mock<ITenantPaymentRepository>();
  testObject = new TenantPaymentService(mockRepository);
});

afterEach(() => {
  mockReset(mockTenantPaymentModel);
  mockReset(mockRepository);
});

describe('Test TenantPaymentService', () => {
  it('Tests create method', () => {
    const tenantPaymentValueObjectMock = mock<TenantPaymentDTO>();

    mockRepository.create.calledWith(tenantPaymentValueObjectMock);
    testObject.create(tenantPaymentValueObjectMock);
  });

  it('Tests deletePayment method', () => {
    const testTenantId = 123;

    mockRepository.getPaymentById.calledWith(testTenantId).mockReturnValue(mockTenantPaymentModel);
    mockRepository.deletePaymentById.calledWith(testTenantId);

    testObject.deletePayment(testTenantId);
  });
});
