import { Request, Response, NextFunction } from 'express';
import { ITenantPaymentService } from '../services/TenantPaymentService';
import Controller, { Methods } from './Controller';

export default class TenantPaymentController extends Controller {
  path = '/contracts';
  routes = [
    {
      path: '/:contractId/payments/search',
      method: Methods.GET,
      handler: this.search.bind(this), // Binding is necessary to call this.service from methods
    }
  ];

  service: ITenantPaymentService;

  constructor(service: ITenantPaymentService) {
    super(service);
  }

  /**
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  public search(req: Request, res: Response, next: NextFunction): void {
    try {
      const { contractId } = req.params;
      const tenantPayments = this.service.searchByContractId(Number(contractId));
      const tenantPaymentSum = this.service.calculateTenantPaymentSum(tenantPayments);

      super.sendSuccess(res, {
        sum: tenantPaymentSum,
        items: tenantPayments
      });
    } catch(e) {
        console.log(e);
        super.sendError(res, e.message);
    }
  }
}
