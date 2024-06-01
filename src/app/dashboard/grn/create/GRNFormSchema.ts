export interface GRNFormSchema {
  id?: string;
  grnNo?: string;
  supplierId?: string;
  poNoId?: string;
  products?: any[];
  total?: number;
  grossTotal?: number;
  grossTotalRound?: number;
  totalItem?: number;
  tax?: number;
  discount?: number;
  note?: string;
  status?: string;
  userId?: string;
  // MongoDB ObjectId reference to User
}
