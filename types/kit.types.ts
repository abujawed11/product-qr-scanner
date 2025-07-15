export interface Kit {
  kit_id: string;
  tilt_angle: number;
  clearance: number;
  configuration: string;
  num_panels: number;
  region?: string;
  price: number;
  currency: string;
  is_active: boolean;
}
