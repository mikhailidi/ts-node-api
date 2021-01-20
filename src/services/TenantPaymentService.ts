import { objectKeysEmpty } from '../common';
import { IFilter } from '../interfaces/Filter';
import { IService } from '../interfaces/Service';
import { TenantPayment } from '../models/TenantPayment';
import { ITenantPaymentRepository } from '../repositories/TenantPaymentRepository';
import StartFromDateFilter from '../filters/StartFromDateFilter';

export type SearchCriteria = {
  startDate: Date | null;
  endDate: Date | null;
}
export interface ITenantPaymentService extends IService {
  searchByContractId(contractId: number, criteria: SearchCriteria): TenantPayment[];
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
   * @param criteria 
   */
  public searchByContractId(contractId: number, criteria: SearchCriteria): TenantPayment[] {
    const tenantPayments = this.repository.getByContractId(contractId);

    if (!objectKeysEmpty(criteria)) {
      return this.filterTenantPaymentsBySearchCriteria(tenantPayments, criteria);
    }

    return tenantPayments;
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

      return filters.every(filter => {
        return filter.filter();
      });
    });
  }
}
