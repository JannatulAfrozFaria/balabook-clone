export interface GrnSchema {
  id?: string;
  grnNo?: string;
  supplierId?: string;
  poNoId?: string;
  tpnId?: string;
  products?: any[];
  total?: number;
  grossTotal?: number;
  grossTotalRound?: number;
  totalItem?: number;
  tax?: number;
  discount?: number;
  status?: string;
  userId?: string;
  // MongoDB ObjectId reference to User
}
