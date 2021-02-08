import { IRepository } from "../interfaces";
import { TenantPayment } from '../models/TenantPayment';
import { fakeTenantPayments } from '../data/tenantPayment';
import TenantPaymentDTO from "../dto/TenantPaymentDTO";

export interface ITenantPaymentRepository extends IRepository {
  getByContractId(contractId: number): TenantPayment[];
  getPaymentById(paymentId: number): TenantPayment | undefined;
  create(tenantPaymentDTO: TenantPaymentDTO): void;
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
   * @param tenantPaymentDTO 
   */
  public create(tenantPaymentDTO: TenantPaymentDTO): void {
    const tenantPayment: TenantPayment = {
      id: this.newPaymentId(),
      contractId: tenantPaymentDTO.contractId,
      description: tenantPaymentDTO.description,
      value: tenantPaymentDTO.value,
      isDeleted: tenantPaymentDTO.isDeleted,
      isImported: tenantPaymentDTO.isImported,
      time: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tenantPayments.push(tenantPayment);
  }

  /**
   * 
   * @param paymentId 
   */
  public deletePaymentById(paymentId: number): void {
    const removeIndex = this.tenantPayments.map(tenantPayment => tenantPayment.id).indexOf(paymentId);

    this.tenantPayments.splice(removeIndex, 1);
  }

  /**
   * @returns number
   */
  private newPaymentId(): number {
    return this.tenantPayments[this.tenantPayments.length - 1].id + 1;
  }
}
