// Auth
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// export interface User {
//   customerID: number;
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   roles: string[];
// }
export interface User {
  customerID: number;
  email: string;
  roles: string[];
}
// Room
export interface RoomType {
  roomTypeID: number;
  roomTypeName: string;
  typeDescription: string;
  typeNote: string;
}

export interface RoomInformation {
  roomID: number;
  roomNumber: string;
  roomDetailDescription: string;
  roomMaxCapacity: number;
  roomStatus: string;
  roomPricePerDay: number;
  roomType: RoomType;
}

// Customer
// export interface Customer {
//   customerID: number;
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   address: string;
//   identificationID: string;
// }

export interface Customer {
  customerID: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  customerStatus: string;
  customerBirthday: string;
  roles: string[];
}
// Booking
export interface BookingDetailId {
  bookingReservationID: number;
  roomID: number;
}

export interface BookingDetail {
  id: BookingDetailId;
  startDate: string;
  endDate: string;
  actualPrice: number;
  bookingReservation?: BookingReservation;
  room: RoomInformation;
}

export interface BookingReservation {
  bookingReservationID: number;
  bookingDate: string;
  totalPrice: number;
  bookingStatus: string;
  customer: Customer;
  bookingDetails: BookingDetail[];
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
