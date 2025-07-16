// types/user.types.ts

// export interface User {
//   id: number;
//   username: string;
//   email: string;
//   customer_id: string;
//   account_type: 'admin' | 'client';
//   is_active: boolean;
// }

// // Form data sent from frontend to backend for registration
// export interface RegisterFormData {
//   customer_id: string;
//   username: string;
//   email: string;
//   password: string;
//   otp: string;
// }

// // Successful response from backend
// export interface RegisterSuccessResponse {
//   message: string; // e.g. "Signup successful. Please login."
// }

// // Error response from backend
// export interface RegisterErrorResponse {
//   error: string; // e.g. "Username already exists", "Invalid OTP", etc.
// }


// types/user.types.ts

export interface User {
  id: number;
  username: string;
  email: string;
  client_id: string;  // ✅ updated from customer_id
  account_type: 'admin' | 'client';
  is_active: boolean;
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

