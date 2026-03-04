# Hotel Booking System - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 16)                        │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │                  Public Pages                          │   │
│  │  ├── Landing Page (/)                                  │   │
│  │  ├── Login (/login)                                    │   │
│  │  └── Register (/register)                              │   │
│  └────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              Customer Portal (Protected)                │   │
│  │  ├── Dashboard                                          │   │
│  │  ├── Browse Rooms                                       │   │
│  │  ├── Create Bookings                                    │   │
│  │  ├── View Booking History                               │   │
│  │  └── Edit Profile                                       │   │
│  └────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              Staff Dashboard (Protected)                │   │
│  │  ├── Admin Overview                                     │   │
│  │  ├── Customer Management                                │   │
│  │  ├── Room Management                                    │   │
│  │  └── Booking Management                                 │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
              ┌───────────────────────────────┐
              │   API Service Layer (api.ts)  │
              │  - JWT Token Management       │
              │  - Automatic Header Injection │
              │  - Error Handling             │
              │  - Token Refresh              │
              └───────────────────────────────┘
                              ↓
              ┌───────────────────────────────┐
              │   HTTP Client (Fetch API)     │
              │  - CORS Handling              │
              │  - Request/Response Formats   │
              └───────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  BACKEND (Spring Boot)                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │               REST API Controllers                      │   │
│  │  ├── AuthController                                    │   │
│  │  ├── RoomController                                    │   │
│  │  ├── BookingController                                 │   │
│  │  └── CustomerController                                │   │
│  └────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐   │
│  │                 Service Layer                          │   │
│  │  ├── AuthService                                       │   │
│  │  ├── RoomService                                       │   │
│  │  ├── BookingService                                    │   │
│  │  └── CustomerService                                   │   │
│  └────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              Database (PostgreSQL/MySQL)               │   │
│  │  ├── Customer Table                                    │   │
│  │  ├── Room Information Table                            │   │
│  │  ├── Room Type Table                                   │   │
│  │  ├── Booking Reservation Table                         │   │
│  │  └── Booking Detail Table                              │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
app/
├── (auth)/                    # Authentication routes
│   ├── layout.tsx            # Auth layout wrapper
│   ├── login/
│   │   └── page.tsx          # Login page
│   └── register/
│       └── page.tsx          # Registration page
│
├── (customer)/               # Customer protected routes
│   ├── layout.tsx            # Customer layout with navigation
│   ├── dashboard/
│   │   └── page.tsx          # Customer dashboard
│   ├── rooms/
│   │   └── page.tsx          # Browse rooms
│   ├── booking/
│   │   └── page.tsx          # Create booking
│   ├── bookings/
│   │   └── page.tsx          # Booking history
│   └── profile/
│       └── page.tsx          # Customer profile
│
├── (staff)/                  # Staff protected routes
│   ├── layout.tsx            # Staff layout with navigation
│   ├── dashboard/
│   │   └── page.tsx          # Staff dashboard
│   ├── customers/
│   │   └── page.tsx          # Manage customers
│   ├── rooms/
│   │   └── page.tsx          # Manage rooms
│   └── bookings/
│       └── page.tsx          # Manage bookings
│
├── lib/
│   ├── api.ts                # API service with token management
│   ├── auth-context.tsx      # Global auth state provider
│   └── types.ts              # TypeScript interfaces
│
├── hooks/
│   ├── useApi.ts             # API call hook
│   └── (useAuth in lib/)     # Auth hook
│
├── components/
│   └── ui/                   # shadcn/ui components (pre-installed)
│
├── globals.css               # Global styles with theme
├── layout.tsx                # Root layout with AuthProvider
├── page.tsx                  # Landing page
│
└── public/                   # Static assets
```

## Authentication Flow

### Login Process

```
1. User enters email & password
   ↓
2. Frontend: POST /api/auth/login with credentials
   ↓
3. Backend validates & returns JWT token + user data
   ↓
4. Frontend: Store token in localStorage & AuthContext
   ↓
5. Frontend: Redirect to /customer/dashboard or /staff/dashboard
   ↓
6. AuthProvider wraps subsequent requests with token
```

### Protected Route Access

```
1. User tries to access /customer/dashboard
   ↓
2. useAuth() hook checks if isAuthenticated
   ↓
3. If no token, redirect to /login
   ↓
4. If token exists, check user.role
   ↓
5. If role mismatch (customer accessing staff), redirect to /login
   ↓
6. If all valid, render component
```

## State Management Strategy

### AuthContext
- Global authentication state
- User information
- Authentication token
- Login/logout functions
- Tracks authenticated status

### useApi Hook
- Manages loading state
- Handles errors
- Wraps API calls
- Provides execute function

### Component Local State
- Form inputs
- UI toggles (modals, menus)
- Temporary data

## Data Flow

### Making a Booking

```
User Input
   ↓
Booking Component State (selectedRooms, dates)
   ↓
User submits booking
   ↓
useApi hook executes createBooking()
   ↓
apiCall() injects JWT token
   ↓
Fetch sends POST /api/bookings
   ↓
Backend creates booking
   ↓
Frontend receives confirmation
   ↓
Update local state
   ↓
Show success message
   ↓
Redirect to /customer/bookings
```

## API Request Structure

### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Authentication Endpoint

**POST /api/auth/login**
```json
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "customerID": 1,
    "fullName": "John Doe",
    "email": "user@example.com",
    "phoneNumber": "+1234567890",
    "role": "CUSTOMER"
  }
}
```

### Booking Endpoint

**POST /api/bookings**
```json
// Request
{
  "bookingDate": "2024-02-26",
  "totalPrice": 500.00,
  "bookingDetails": [
    {
      "roomID": 1,
      "startDate": "2024-03-01",
      "endDate": "2024-03-05",
      "actualPrice": 100.00
    }
  ]
}

// Response
{
  "bookingReservationID": 123,
  "bookingDate": "2024-02-26",
  "totalPrice": 500.00,
  "bookingStatus": "PENDING",
  "bookingDetails": [...]
}
```

## Key Design Patterns

### 1. Layout-Based Navigation
- Uses Next.js route groups with parentheses: `(auth)`, `(customer)`, `(staff)`
- Each group has its own layout.tsx with navigation
- Enables different UI for different sections

### 2. Protected Routes
- Checked in layout.tsx using useAuth()
- Redirect to login if not authenticated
- Role-based access control in client

### 3. API Service Layer
- Centralized apiCall() function
- Automatic token injection
- Consistent error handling
- Pre-built functions for common operations

### 4. Context-Based State
- Global auth state with AuthProvider
- Accessible via useAuth() hook
- Persisted in localStorage

## Performance Optimizations

1. **Code Splitting**: Next.js automatically splits code by route
2. **Lazy Loading**: Components loaded on-demand
3. **Image Optimization**: Next.js Image component used
4. **CSS Optimization**: Tailwind purges unused styles
5. **API Caching**: Implement SWR for future versions

## Security Considerations

1. **JWT Storage**: Tokens in localStorage (consider httpOnly cookies)
2. **CORS**: Backend must allow frontend origin
3. **HTTPS**: Production must use HTTPS
4. **Token Expiration**: Backend should implement token refresh
5. **Input Validation**: Client-side validation + backend validation
6. **SQL Injection**: Backend uses parameterized queries

## Deployment Architecture

### Development
```
Frontend: http://localhost:3000
Backend: http://localhost:8080
```

### Production
```
Frontend: https://yourdomain.com (Vercel/Netlify)
Backend: https://api.yourdomain.com (Your server)
Database: Managed database service
```

## Future Enhancements

- [ ] Implement payment integration (Stripe)
- [ ] Add real-time notifications (WebSocket)
- [ ] Implement room availability calendar
- [ ] Add advanced search filters
- [ ] Implement user reviews and ratings
- [ ] Add multi-language support
- [ ] Implement dark mode toggle
- [ ] Add email confirmation
- [ ] Implement booking cancellation
- [ ] Add analytics dashboard

---

This architecture provides a scalable, maintainable foundation for the hotel booking system with clear separation of concerns and modern React patterns.
