# Hotel Booking System - Frontend Setup Guide

## 🏨 Project Overview

This is a modern, responsive hotel booking frontend built with Next.js 16, React, TypeScript, and Tailwind CSS. It features gradient-based styling, smooth animations, and seamless integration with your Spring Boot backend.

### Key Features

- **Authentication System**: Secure login/registration with JWT token management
- **Customer Portal**: Browse hotels, make bookings, view reservation history, and manage profile
- **Staff Dashboard**: Manage customers, rooms, and bookings with admin controls
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Gradient UI**: Modern gradient backgrounds and color schemes throughout
- **Real-time Integration**: Connects with Spring Boot REST APIs

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended 20 LTS)
- pnpm (or npm/yarn)
- Your Spring Boot backend running on `http://localhost:8080`

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   cd hotel-booking-frontend
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   # or npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Update .env.local** with your backend URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

5. **Start the Development Server**
   ```bash
   pnpm dev
   # The app will be available at http://localhost:3000
   ```

## 📱 Application Structure

### Page Routes

#### Authentication Pages (`/app/(auth)/`)
- `/login` - User login with email/password
- `/register` - New user registration

#### Customer Portal (`/app/(customer)/`)
- `/dashboard` - Main customer dashboard with booking overview
- `/rooms` - Browse and filter available hotel rooms
- `/booking` - Create new bookings with date and room selection
- `/bookings` - View booking history and reservation details
- `/profile` - Manage customer account information

#### Staff Admin (`/app/(staff)/`)
- `/dashboard` - Admin overview with statistics
- `/customers` - Manage customer accounts
- `/rooms` - Manage hotel rooms (CRUD operations)
- `/bookings` - Monitor and update all bookings

### Core Infrastructure

#### State Management (`/app/lib/`)
- **auth-context.tsx** - Global authentication state with AuthProvider
- **api.ts** - Centralized API service with JWT token handling
- **types.ts** - TypeScript interfaces for all entities

#### Custom Hooks (`/app/hooks/`)
- **useApi.ts** - Hook for handling async API calls with loading/error states
- **useAuth.ts** - Hook to access authentication context

## 🔐 Authentication Flow

### Login/Register Process

1. User enters credentials on login/register page
2. API call to backend with `POST /api/auth/login` or `POST /api/auth/register`
3. Receive JWT token and user data
4. Token stored in localStorage and AuthContext
5. Token automatically included in all subsequent API requests
6. Redirect to appropriate dashboard based on user role

### Token Management

- Tokens are stored in localStorage with key `authToken`
- Automatically injected in `Authorization: Bearer <token>` header
- On 401 response, token is cleared and user redirected to login
- Clear token on logout

## 🎨 Design System

### Color Palette

- **Primary Gradient**: Purple to Blue (`from-purple-600 to-blue-600`)
- **Secondary Gradient**: Blue to Cyan (`from-blue-600 to-cyan-600`)
- **Accent**: Orange/Yellow for highlights
- **Backgrounds**: Soft gradients from blue-50 to pink-50
- **Text**: Dark gray on light, white on dark

### Typography

- **Headings**: Bold, gradient text with 4xl-6xl sizes
- **Body**: Regular gray text with 0.95 line height
- **Actions**: Semibold, gradient backgrounds on buttons

### Components Used

- shadcn/ui components for consistency
- Lucide icons for visual elements
- Tailwind CSS for styling
- Custom gradient utilities

## 📡 API Integration

### Backend API Endpoints

The app connects to these Spring Boot endpoints:

#### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/register` - Register new customer

#### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/available?startDate=&endDate=` - Get available rooms
- `GET /api/rooms/{id}` - Get room by ID

#### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get customer's bookings
- `GET /api/bookings` - Get all bookings (staff only)
- `PUT /api/bookings/{id}` - Update booking status

#### Customers
- `GET /api/customer/profile` - Get customer profile
- `PUT /api/customer/profile` - Update customer profile
- `GET /api/staff/customers` - Get all customers (staff only)
- `PUT /api/staff/customers/{id}` - Update customer (staff only)

### Making API Calls

Use the `apiCall` function from `/app/lib/api.ts`:

```typescript
import { apiCall, getRooms, createBooking } from '@/app/lib/api';

// Direct API call
const data = await apiCall('/api/rooms');

// Or use pre-built functions
const rooms = await getRooms();
const booking = await createBooking(bookingData);
```

## 🔧 Configuration

### Backend URL

Update `NEXT_PUBLIC_API_URL` in `.env.local`:

```env
# Development
NEXT_PUBLIC_API_URL=http://localhost:8080

# Production
NEXT_PUBLIC_API_URL=https://your-api.com
```

### CORS Configuration

Ensure your Spring Boot backend has CORS enabled for your frontend origin:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000", "https://yourdomain.com")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowCredentials(true);
            }
        };
    }
}
```

## 🧪 Testing the App

### Test User Credentials

Demo credentials for testing (if your backend accepts any for demo purposes):

**Customer Login:**
- Email: customer@example.com
- Password: password123

**Staff Login:**
- Email: staff@example.com
- Password: password123

### Manual Testing Flow

1. **Register**: Create new account on register page
2. **Browse Rooms**: Navigate to rooms page and view available hotels
3. **Book Room**: Create new booking with dates and room selection
4. **View Bookings**: Check booking history on bookings page
5. **Profile**: Update personal information

For Staff:
1. **Login** with staff credentials
2. **Dashboard**: View system statistics
3. **Manage Customers**: View all customer accounts
4. **Manage Rooms**: View and manage hotel rooms
5. **Manage Bookings**: Update booking statuses

## 📦 Deployment

### Vercel Deployment (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=your-backend-url
   ```
4. Deploy automatically on push

### Self-Hosted Deployment

```bash
# Build the app
pnpm build

# Start production server
pnpm start
```

## 🐛 Troubleshooting

### API Connection Issues

**Issue**: "Failed to fetch" or CORS errors

**Solution**:
1. Check backend is running on correct URL
2. Verify `NEXT_PUBLIC_API_URL` is set correctly
3. Enable CORS on backend
4. Check network tab in browser DevTools

### Authentication Issues

**Issue**: Stuck on login page

**Solution**:
1. Check localStorage has `authToken`
2. Verify JWT token is valid
3. Check API endpoint returns correct response format
4. Clear browser cache and localStorage

### Styling Issues

**Issue**: Gradient buttons look plain

**Solution**:
1. Rebuild Tailwind CSS: `pnpm build`
2. Clear `.next` folder: `rm -rf .next`
3. Restart dev server

## 📚 Key Technologies

- **Next.js 16**: React framework with App Router
- **React 19**: UI library with latest hooks
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable component library
- **Lucide Icons**: Clean SVG icons
- **Fetch API**: HTTP client for API calls

## 📞 Support

For issues or questions:

1. Check this guide first
2. Review browser console for errors
3. Check network requests in DevTools
4. Verify backend API responses
5. Contact development team

## 🎯 Next Steps

1. Configure backend URL
2. Start development server
3. Test login/register flows
4. Create sample bookings
5. Explore staff dashboard
6. Customize branding/colors as needed
7. Deploy to production

---

**Happy Booking! 🎉**
