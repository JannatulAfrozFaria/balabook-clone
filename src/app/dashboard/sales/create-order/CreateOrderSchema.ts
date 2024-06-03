export interface CreateOrderSchema {
  id?: string; // Optional because it will be auto-generated
  invoiceId: string;
  source?: string;
  customerId?: string;
  warehouseId?: string;
  userId?: string;
  products?: any;
  returnProducts?: any;
  returnCalculation?: number;
  totalItem?: number;
  total?: number;
  discount?: number;
  vat?: number;
  grossTotal?: number;
  grossTotalRound?: number;
  totalRecievable?: number;
  totalRecieved?: number;
  changeAmount?: number;
  paidAmount?: number;
  status?: string;
}
