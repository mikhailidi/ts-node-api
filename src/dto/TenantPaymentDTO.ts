import { ValidatedRequest } from 'express-joi-validation';
import { CreateTenantPaymentRequest } from '../requests/CreateTenantPaymentRequest';

export default class TenantPaymentDTO {
  private constructor(
    public id: number | null,
    public contractId: number,
    public description: string,
    public value: number,
    public time: Date,
    public isImported: boolean = false,
    public isDeleted: boolean = false,
  ) {}

  /**
   * 
   * @param req 
   */
  public static fromRequest(req: ValidatedRequest<CreateTenantPaymentRequest>): TenantPaymentDTO {
    const { description, value } = req.body;
    const { contractId } = req.params;

    return new TenantPaymentDTO(
      null,
      +contractId,
      description,
      +value,
      new Date()
    );
  }
}
