export interface PoSchema {
  id?: string; // Optional because it will be auto-generated
  poNo: string; // PO Number must be provided
  supplierId?: string; // MongoDB ObjectId reference to Supplier
  containerId?: string;
  products?: any; // Array of products in the purchase order
  lcNo?: string;
  piNo?: string;
  totalItem?: number;
  total?: number;
  tax?: number;
  qty?: number;
  discount?: number;
  grossTotal?: number;
  grossTotalRound?: number;
  note?: String;
  country?: String;
  status?: string; // Assuming status is a string; refine based on possible values
  userId?: string; // MongoDB ObjectId reference to User
}
