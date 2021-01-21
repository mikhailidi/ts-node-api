import { Request, Response, NextFunction } from 'express';
import TenantPaymentNotFoundException from '../exceptions/TenantPaymentNotFoundException';
import { ITenantPaymentService, SearchCriteria } from '../services/TenantPaymentService';
import Controller, { Methods } from './Controller';

export default class TenantPaymentController extends Controller {
  path = '/contracts';
  routes = [
    {
      path: '/:contractId/payments',
      method: Methods.GET,
      handler: this.search.bind(this), // Binding is necessary to call this.service from methods
    },
    {
      path: '/:contractId/payments/:paymentId',
      method: Methods.DELETE,
      handler: this.delete.bind(this),
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
      const { startDate, endDate } = req.query;

      const searchCriteria: SearchCriteria = {
        startDate: startDate ? new Date(String(startDate)) : null,
        endDate: endDate ? new Date(String(endDate)) : null,
      }
      const tenantPayments = this.service.searchByContractId(Number(contractId), searchCriteria);
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

  /**
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  public delete(req: Request, res: Response, next: NextFunction): void {
    try {
      const { paymentId } = req.params;

      this.service.deletePayment(Number(paymentId));
    
      res.status(204).send();   
    } catch (e) {
      if (e instanceof TenantPaymentNotFoundException) {
        super.sendNotFound(res);
      } else {
        super.sendError(res, e.message);
      }
    }
  }
}
