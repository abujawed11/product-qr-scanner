// Define the Order type locally (matches backend)
export type AdminOrder = {
  order_id: string;
  client: string;
  client_name: string;
  project_id: string;
  manufacturing_location: string;
  dispatch_location: string;
  order_date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | string;
  expected_delivery_date?: string | null;
  delivery_date?: string | null;
  remarks?: string | null;
  delivery_address?: string | null;
  billing_address?: string | null;
  po_date?: string | null;
  payment_received?: string | null;
  payment_percentage?: string | null;
  total_kits?: string | null;
  partial_delivery_allowed?: string | null;
  production_status?: string | null;
  dispatch_status?: string | null;
  delivery_status?: string | null;
  production_unit?: string | null;
  created_at: string;
  updated_at: string;
};
