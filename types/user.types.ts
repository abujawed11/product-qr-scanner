// types/user.types.ts

// Form data sent from frontend to backend for registration
export interface RegisterFormData {
  customer_id: string;
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
