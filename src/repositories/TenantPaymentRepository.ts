import { IRepository } from "../interfaces/Repository";
import { TenantPayment } from '../models/TenantPayment';
import { fakeTenantPayments } from '../data/tenantPayment';

const tenantPayments: TenantPayment[] = fakeTenantPayments;

export interface ITenantPaymentRepository extends IRepository {
  getByContractId(contractId: number): TenantPayment[];
}

export default class TenantPaymentRepository implements ITenantPaymentRepository {
  /**
   * 
   * @param contractId 
   */
  public getByContractId(contractId: number): TenantPayment[] {
    return tenantPayments.filter(tenant => {
      return tenant.contractId === contractId;
    });
  }
}
