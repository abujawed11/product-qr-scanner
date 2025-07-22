// types/warranty.ts
export type OrderInfo = {
  order_id: string;
  [key: string]: unknown;
};

export type WarrantyClaimRow = {
  war_req_id: string;
  order: OrderInfo | null;
  company_name: string;
  kit_number: string;
  status: string;
  pdf_url?: string;
  created_at: string;
};

export type Upload = {
  id: number;
  step_key: string;
  media_type: "image" | "video" | string;
  media_file: string;
};

export type ClaimDetail = WarrantyClaimRow & {
  contact_name: string;
  contact_phone: string;
  email: string;
  checklist_answers: unknown;
  uploads: Upload[];
};


