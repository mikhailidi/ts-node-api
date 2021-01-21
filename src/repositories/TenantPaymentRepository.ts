import { IRepository } from "../interfaces/Repository";
import { TenantPayment } from '../models/TenantPayment';
import { fakeTenantPayments } from '../data/tenantPayment';

export interface ITenantPaymentRepository extends IRepository {
  getByContractId(contractId: number): TenantPayment[];
  getPaymentById(paymentId: number): TenantPayment | undefined;
  deletePaymentById(paymentId: number): void;
}

export default class TenantPaymentRepository implements ITenantPaymentRepository {

  private tenantPayments: TenantPayment[] = fakeTenantPayments;

  /**
   * 
   * @param contractId 
   */
  public getByContractId(contractId: number): TenantPayment[] {
    return this.tenantPayments.filter(tenantPayment => {
      return tenantPayment.contractId === contractId;
    });
  }

  /**
   * 
   * @param paymentId 
   */
  public getPaymentById(paymentId: number): TenantPayment | undefined {
    return this.tenantPayments.find(tenantPayment => tenantPayment.id === paymentId);
  }

  /**
   * 
   * @param paymentId 
   */
  public deletePaymentById(paymentId: number): void {
    const removeIndex = this.tenantPayments.map(tenantPayment => tenantPayment.id).indexOf(paymentId);

    this.tenantPayments.splice(removeIndex, 1);
  }
}
