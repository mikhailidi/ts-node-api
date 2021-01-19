import { IRepository } from '../interfaces/Repository';
import { IService } from '../interfaces/Service';
import { ITenantPaymentRepository } from '../repositories/TenantPaymentRepository';

export interface ITenantPaymentService extends IService {
}

export default class TenantPaymentService implements ITenantPaymentService {
  protected repository: ITenantPaymentRepository;

  constructor(repository: ITenantPaymentRepository) {
    this.repository = repository;
  }
}
