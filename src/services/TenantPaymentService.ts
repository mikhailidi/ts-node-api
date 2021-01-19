import { IRepository } from '../interfaces/Repository';
import { IService } from '../interfaces/Service';
import { ITenantPaymentRepository } from '../repositories/TenantPaymentRepository';

export interface ITenantPaymentService extends IService {
  searchByContractId(contractId: number): [];
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
  searchByContractId(contractId: number): [] {
    return [];
  }
}
