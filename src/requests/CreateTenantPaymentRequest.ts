import {
  ValidatedRequestSchema,
  ContainerTypes
} from 'express-joi-validation';
import * as Joi from 'joi';

export const createTenantPaymentSchema = Joi.object({
  description: Joi.string()
    .min(10)
    .required(),
  value: Joi.number()
    .required(),
})

export interface CreateTenantPaymentRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    description: string,
    value: number,
    isImported?: boolean
    isDeleted?: boolean
  }
}
