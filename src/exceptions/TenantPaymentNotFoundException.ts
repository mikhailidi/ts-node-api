import { exception } from "console"

export default class TenantPaymentNotFoundException extends Error {
  constructor() {
    super();

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, TenantPaymentNotFoundException.prototype);
}
}