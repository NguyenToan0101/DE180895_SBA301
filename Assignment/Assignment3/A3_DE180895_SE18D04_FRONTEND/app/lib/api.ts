const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
import { Customer,RoomInformation,BookingDetail, BookingReservation} from './types';
export interface FetchOptions extends RequestInit {
  includeToken?: boolean;
}
interface LoginResponse {
  token: string;
  type: string;
  customerID: number;
  email: string;
  roles: string[];
}
let authToken: string | null = null;

export function setAuthToken(token: string) {
  authToken = token;
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined' && !authToken) {
    authToken = localStorage.getItem('authToken');
  }
  return authToken;
}

export function clearAuthToken() {
  authToken = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
}

export async function apiCall<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { includeToken = true, ...fetchOptions } = options;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (includeToken) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearAuthToken();
      window.location.href = '/login';
    }
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `API error: ${response.status}`);
  }

  return response.json();
}

// Auth endpoints
// export async function login(email: string, password: string) {
//   return apiCall('/api/auth/login', {
//     method: 'POST',
//     body: JSON.stringify({ email, password }),
//     includeToken: false,
//   });
// }
export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  return apiCall<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    includeToken: false,
  });
}

export async function register(data: {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  customerBirthday: string;
}) {
  return apiCall('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
    includeToken: false,
  });
}

// Room endpoints
export async function getRooms() {
  return apiCall<RoomInformation[]>('/api/rooms', { includeToken: false });
}

export async function getAvailableRooms(startDate: string, endDate: string) {
  return apiCall(`/api/rooms/available?startDate=${startDate}&endDate=${endDate}`, {
    includeToken: false,
  });
}

export async function getRoomById(id: number) {
  return apiCall(`/api/rooms/${id}`, { includeToken: false });
}

export async function createRoom(roomData: any) {
  return apiCall('/api/rooms', {
    method: 'POST',
    body: JSON.stringify(roomData),
  });
}

export async function updateRoom(id: number, roomData: any) {
  return apiCall(`/api/rooms/${id}`, {
    method: 'PUT',
    body: JSON.stringify(roomData),
  });
}

export async function deleteRoom(id: number) {
  return apiCall(`/api/rooms/${id}`, {
    method: 'DELETE',
  });
}

// Booking endpoints
export async function createBooking(bookingData: any) {
  return apiCall('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
}

export async function getMyBookings() {
  return apiCall<BookingReservation[]>('/api/bookings/my-bookings');
}

export async function getAllBookings() {
  return apiCall<BookingReservation[]>('/api/bookings');
}

// export async function updateBooking(id: number, status: string) {
//   return apiCall(`/api/bookings/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify({ bookingStatus: status }),
//   });
// }
export async function updateBooking(id: number, status: string) {
  return apiCall(`/api/bookings/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ bookingStatus: status }),
  });
}
// Customer endpoints
export async function getCustomerProfile() {
  return apiCall('/api/customer/profile');
}

export async function updateCustomerProfile(data: any) {
  return apiCall('/api/customer/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function getAllCustomers() {
  return apiCall<Customer[]>('/api/staff/customers');
}

export async function updateCustomer(id: number, data: any) {
  return apiCall(`/api/staff/customers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Logout endpoint
export async function logout() {
  return apiCall('/api/auth/logout', {
    method: 'POST',
  }).catch(() => {
    // Even if logout API fails, we want to clear local auth
    return null;
  });
}
