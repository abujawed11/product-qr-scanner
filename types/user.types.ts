
// types/user.types.ts

export interface User {
  id: number;
  username: string;
  email: string;
  client_id: string;  // ✅ updated from customer_id
  account_type: 'admin' | 'client';
  is_active: boolean;
  company_name: string
}

// Form data sent from frontend to backend for registration
export interface RegisterFormData {
  client_id: string;  // ✅ updated from customer_id
  username: string;
  email: string;
  password: string;
  otp: string;
}

// Successful response from backend
export interface RegisterSuccessResponse {
  message: string; // e.g. "Signup successful. Please login."
}

// Error response from backend
export interface RegisterErrorResponse {
  error: string; // e.g. "Username already exists", "Invalid OTP", etc.
}

