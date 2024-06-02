export interface CreateOrderSchema {
  id?: string; // Optional because it will be auto-generated
  invoiceId: string;
  source?: string;
  warehouseId?: string;
  userId?: string;
  products?: any;
  returnProducts?: any;
  returnCalculation?: any;
  totalItems?: number;
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
