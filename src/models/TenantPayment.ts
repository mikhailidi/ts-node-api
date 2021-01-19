export interface TenantPayment {
  id: number;
  contractId: number;
  description: string;
  value: number;
  isImported: boolean;
  isDeleted: boolean;
  time: Date;
  createdAt: Date;
  updatedAt: Date;
}
