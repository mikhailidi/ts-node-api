import { IService } from '../interfaces/Service';
import { TenantPayment } from '../models/TenantPayment';
import TenantPaymentRepository, { ITenantPaymentRepository } from '../repositories/TenantPaymentRepository';

export interface ITenantPaymentService extends IService {
  searchByContractId(contractId: number): TenantPayment[];
  calculateTenantPaymentSum(tenantPayments: TenantPayment[]): number;
}

export default class TenantPaymentService implements ITenantPaymentService {
  protected repository: ITenantPaymentRepository;

  constructor(repository: ITenantPaymentRepository) {
    this.repository = repository;
  }

  /**
   * 
   * @param contractId 
   */
  public searchByContractId(contractId: number): TenantPayment[] {
    return this.repository.getByContractId(contractId);
  }

  /**
   * 
   * @param tenantPayments 
   */
  public calculateTenantPaymentSum(tenantPayments: TenantPayment[]): number {
    let sum: number = 0;

    tenantPayments.forEach(tenantPayment => {
      sum += tenantPayment.value;
    });

    return sum;
  }
}
