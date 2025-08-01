// types/order.types.ts

export interface Kit {
  kit_id: string;
  tilt_angle: number;
  clearance: number;
  configuration: string;
  num_panels: number;
  region: string;
  price: string;
  currency: string;
}

export interface OrderItem {
  id: string;
  kit: Kit;
  quantity: number;
  unit_price: string;
  total_price: string;
}


export interface Order {
  order_id: string;
  client_id: string;                  // Maps to client.client_id in Django
  project_id: string;                 // From project_id field
  manufacturing_location: string;
  dispatch_location: string;
  order_date: string;                 // Use ISO string if coming as DateTime from API
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | string;
  expected_delivery_date?: string | null;
  delivery_date?: string | null;
  remarks?: string | null;
  items: OrderItem[];                 // You should have OrderItem type matching your items
  total_quantity: number;
  kit_count: number;
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
}

// export interface Order {
//   order_id: string;
//   order_date: string;
//   status: string;
//   manufacturing_location: string;
//   dispatch_location: string;
//   expected_delivery_date?: string;
//   delivery_date?: string;
//   remarks?: string;
//   items: OrderItem[];
//   total_quantity: number;
//   kit_count: number;
//   client_id: string;  // ✅ updated from customer_id
// }