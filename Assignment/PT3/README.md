# Cars Management System

A full-stack application for managing car inventory with authentication, CRUD operations, and role-based access control (Admin-only features).

## Features

### ✅ User Authentication
- Login page with email and password
- Automatic redirection based on authentication status
- Role-based access control (Admin/User)
- Logout functionality

### ✅ Cars Management

#### 3. List All Cars (No Authentication Required)
- View all cars in a table format
- Display: CarID, CarName, UnitsInStock, UnitPrice, CountryName, CreatedAt, UpdatedAt
- Responsive design with auto-scrolling on mobile

#### 4. Delete Car (Admin Only)
- Requires Admin role verification
- Confirmation dialog before deletion
- Updates list after successful deletion

#### 5. Add New Car (Admin Only)
- Form validation:
  - **All fields required**
  - CarName: Must be greater than 10 characters
  - UnitsInStock: Must be between 5 and 20
  - UnitPrice: Must be greater than 0
  - Country: Required
- New items appear at the top of the list
- CreatedAt = Current Date (set automatically)
- CreatedAt ≤ UpdatedAt validation (backend enforced)

#### Additional: Edit Car (Admin Only)
- Update existing car details with same validation rules

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19.2** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI components
- **Sonner** - Toast notifications
- **date-fns** - Date formatting
- **Lucide React** - Icons

### Backend (Java/Spring Boot)
- Spring Boot REST API
- Spring Security with JWT authentication
- JPA/Hibernate ORM
- MySQL database

## Prerequisites

1. **Node.js** 18+ and npm/pnpm
2. **Backend Server** running on `http://localhost:8080`
   - Auth endpoints: `/api/auth/login`, `/api/auth/register`
   - Public endpoints: `/api/car`, `/api/country`
   - Admin endpoints: `/api/admin/car/*`, `/api/admin/account/*`

## Environment Setup

### Backend Configuration Required

Ensure your Spring Boot backend is configured with:

```properties
# CORS configuration
spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allow-credentials=true
```

## Installation & Running

### 1. Install Dependencies
```bash
pnpm install
# or npm install
```

### 2. Start Development Server
```bash
pnpm dev
# or npm run dev
```

The application will be available at `http://localhost:3000`

### 3. Development Workflow
- Navigate to `http://localhost:3000` → redirects to login
- Login with Admin credentials to access add/edit/delete features
- The cars list is accessible without authentication

## User Flow

### For Regular Users
1. Login with credentials
2. View cars list (read-only)
3. Logout

### For Admin Users
1. Login with Admin account
2. View cars list
3. **Add New Car** - Click "Add New Car" button, fill form, submit
   - New car appears at top of list
4. **Edit Car** - Click pencil icon, modify fields, save
5. **Delete Car** - Click trash icon, confirm deletion
6. Logout

## API Endpoints Used

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user
- `POST /api/auth/logout` - Logout

### Public (No Auth Required)
- `GET /api/car` - Get all cars
- `GET /api/car/{id}` - Get car by ID
- `GET /api/country` - Get all countries

### Admin Only (Requires JWT + ADMIN role)
- `POST /api/admin/car` - Create car
- `PUT /api/admin/car/{id}` - Update car
- `DELETE /api/admin/car/{id}` - Delete car

## Form Validation

### Add/Edit Car Form

| Field | Rules | Error Message |
|-------|-------|----------------|
| Car Name | > 10 characters, required | "Car name must be greater than 10 characters" |
| Units in Stock | 5-20 inclusive, required | "Units in stock must be between 5 and 20" |
| Unit Price | > 0, required | "Unit price must be greater than 0" |
| Country | Required | "Country is required" |

## Security Features

- ✅ JWT token storage in localStorage
- ✅ Authorization headers on admin endpoints
- ✅ Role-based access control (isAdmin check)
- ✅ Protected routes with login redirect
- ✅ Confirmation dialogs for destructive actions

## Project Structure

```
app/
├── page.tsx                 # Home redirect page
├── layout.tsx              # Root layout with AuthProvider
├── login/
│   └── page.tsx            # Login page
├── cars/
│   └── page.tsx            # Cars management page
├── providers.tsx           # Auth context provider
└── globals.css             # Global styles

components/
└── cars/
    ├── cars-table.tsx      # Cars list table
    ├── add-car-modal.tsx   # Add car form modal
    ├── edit-car-modal.tsx  # Edit car form modal
    └── delete-confirm-dialog.tsx # Delete confirmation
```

## Notes

- The application assumes the backend is running on `http://localhost:8080`
- All timestamps use ISO 8601 format
- New cars appear at the top of the list (prepended)
- Role-based features only appear to Admin users
- Toast notifications provide real-time feedback on all operations

## Future Enhancements

- Search and filter functionality
- Pagination for large car lists
- Export cars to CSV/Excel
- Advanced statistics dashboard
- Bulk operations (delete multiple cars)
- Image upload for car photos
