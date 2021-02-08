import { objectKeysEmpty } from '../common';
import { IFilter } from '../interfaces';
import { IService } from '../interfaces';
import { TenantPayment } from '../models/TenantPayment';
import { ITenantPaymentRepository } from '../repositories/TenantPaymentRepository';
import StartFromDateFilter from '../filters/StartFromDateFilter';
import EndToDateFilter from '../filters/EndToDateFilter';
import TenantPaymentNotFoundException from '../exceptions/TenantPaymentNotFoundException';
import TenantPaymentDTO from '../dto/TenantPaymentDTO';

export type SearchCriteria = {
  startDate: Date | null;
  endDate: Date | null;
}
export interface ITenantPaymentService extends IService {
  searchByContractId(contractId: number, criteria: SearchCriteria): TenantPayment[];
  calculateTenantPaymentSum(tenantPayments: TenantPayment[]): number;
  create(tenantPaymentDTO: TenantPaymentDTO): void;
  deletePayment(paymentId: number): void;
}

export default class TenantPaymentService implements ITenantPaymentService {

  constructor(protected repository: ITenantPaymentRepository) {}

  /**
   * 
   * @param contractId 
   * @param criteria 
   */
  public searchByContractId(contractId: number, criteria: SearchCriteria): TenantPayment[] {
    const tenantPayments = this.repository.getByContractId(contractId);

    return objectKeysEmpty(criteria)
      ? tenantPayments
      : this.filterTenantPaymentsBySearchCriteria(tenantPayments, criteria);
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

  /**
   * 
   * @param tenantPaymentDTO 
   */
  create(tenantPaymentDTO: TenantPaymentDTO): void {
    // throw ContractNotFoundException if contract with given contractId doesn't exist

    this.repository.create(tenantPaymentDTO)
  }

  /**
   * 
   * @param paymentId 
   */
  public deletePayment(paymentId: number): void {
    const tenantPayment = this.repository.getPaymentById(paymentId);

    if (!tenantPayment) {
      throw new TenantPaymentNotFoundException();
    }

    this.repository.deletePaymentById(paymentId);
  }

  /**
   * 
   * @param tenantPayments 
   * @param searchCriteria 
   */
  private filterTenantPaymentsBySearchCriteria(tenantPayments: TenantPayment[], searchCriteria: SearchCriteria): TenantPayment[] {
    return tenantPayments.filter(tenantPayment => {
      const filters: IFilter[] = [];

      if (searchCriteria.startDate) {
        filters.push(
          new StartFromDateFilter(searchCriteria.startDate, tenantPayment.createdAt)
        )
      }
      if (searchCriteria.endDate) {
        filters.push(
          new EndToDateFilter(searchCriteria.endDate, tenantPayment.createdAt)
        )
      }

      return filters.every(filter => {
        return filter.filter();
      });
    });
  }
}
