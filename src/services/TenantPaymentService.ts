import { IService } from '../interfaces/Service';
import { TenantPayment } from '../models/TenantPayment';
import { ITenantPaymentRepository } from '../repositories/TenantPaymentRepository';

export interface ITenantPaymentService extends IService {
  searchByContractId(contractId: number): TenantPayment[];
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
}
