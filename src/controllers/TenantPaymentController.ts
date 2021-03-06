import { Request, Response, NextFunction } from 'express';
import TenantPaymentNotFoundException from '../exceptions/TenantPaymentNotFoundException';
import { ITenantPaymentService, SearchCriteria } from '../services/TenantPaymentService';
import TenantPaymentDTO from '../dto/TenantPaymentDTO';
import Controller, { Methods } from './Controller';
import { CreateTenantPaymentRequest, createTenantPaymentSchema } from '../requests/CreateTenantPaymentRequest';
import { ValidatedRequest } from 'express-joi-validation';

export default class TenantPaymentController extends Controller {
  public path = '/contracts';
  public routes = [
    {
      path: '/:contractId/payments',
      method: Methods.GET,
      handler: this.search.bind(this), // Binding is necessary to call this.service from methods
    },
    {
      path: '/:contractId/payments',
      method: Methods.POST,
      handler: this.create.bind(this),
      handlerMiddleware: [
        this.validator.body(createTenantPaymentSchema)
      ]
    },
    {
      path: '/:contractId/payments/:paymentId',
      method: Methods.DELETE,
      handler: this.delete.bind(this),
    }
  ];

  constructor(protected service: ITenantPaymentService) {
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
  public create(req: ValidatedRequest<CreateTenantPaymentRequest>, res: Response, next: NextFunction): void {
    try {
      const tenantPayment = TenantPaymentDTO.fromRequest(req);
      this.service.create(tenantPayment);
      res.status(201).send();
    } catch (e) {
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
