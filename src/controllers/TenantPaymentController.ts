import { Request, Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';

export default class TenantPaymentController extends Controller {
  path = '/contracts';
  routes = [
    {
      path: '/:contractId/payments/search',
      method: Methods.GET,
      handler: this.search,
    }
  ];

  /**
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  public search(req: Request, res: Response, next: NextFunction): void {
    try {
      super.sendSuccess(res, {
        sum: 0,
        items: []
      });
    } catch(e) {
        console.log(e);
        super.sendError(res, e.message);
    }
  }
}
