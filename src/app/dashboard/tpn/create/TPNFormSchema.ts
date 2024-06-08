export interface TPNFormSchema {
  id?: string; // Optional because it will be auto-generated
  tpnNo: string; // PO Number must be provided
  products?: any; // MongoDB ObjectId reference to Supplier

  totalItem?: number;
  total?: number;
  tax?: number;
  discount?: number;
  grossTotal?: number;
  grossTotalRound?: number;
  whToId?: String;
  whFromId?: String;
  userId?: string;
  status?: string; // Assuming status is a string; refine based on possible values
}
