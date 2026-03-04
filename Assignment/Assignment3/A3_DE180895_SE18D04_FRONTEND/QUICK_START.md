# 🚀 Quick Start Guide

Get your Hotel Booking System running in minutes!

## 1️⃣ Install Dependencies

```bash
pnpm install
```

## 2️⃣ Configure Backend URL

Create `.env.local` file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set your backend URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 3️⃣ Start Development Server

```bash
pnpm dev
```

The app will be available at **http://localhost:3000**

## 4️⃣ Test the Application

### As a Customer:
1. Go to http://localhost:3000
2. Click **Register** to create a new account
3. Fill in your details (name, email, phone, password)
4. After registration, you'll be logged in automatically
5. Browse available rooms and create bookings
6. Check your booking history

### As Staff:
1. Use staff credentials to login
2. Access the admin dashboard
3. Manage customers, rooms, and bookings

## 📝 Available Test Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/login` | User login |
| `/register` | User registration |
| `/customer/dashboard` | Customer home (protected) |
| `/customer/rooms` | Browse hotel rooms |
| `/customer/booking` | Create new booking |
| `/customer/bookings` | View your bookings |
| `/customer/profile` | Edit your profile |
| `/staff/dashboard` | Admin dashboard (protected) |
| `/staff/customers` | Manage customers |
| `/staff/rooms` | Manage rooms |
| `/staff/bookings` | Manage bookings |

## 🎨 Features Included

✅ **User Authentication** - Login/Register with JWT tokens
✅ **Customer Portal** - Browse, book, and manage reservations
✅ **Staff Dashboard** - Manage all system entities
✅ **Responsive Design** - Works on all devices
✅ **Gradient UI** - Modern purple-to-blue gradient design
✅ **Real-time Updates** - Instant booking confirmations
✅ **Error Handling** - User-friendly error messages

## 🔌 Backend API Connection

The frontend connects to your Spring Boot backend at the URL specified in `.env.local`.

**Required Spring Boot Endpoints:**

```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/rooms
GET    /api/rooms/available
GET    /api/rooms/{id}
POST   /api/bookings
GET    /api/bookings
GET    /api/bookings/{id}
PUT    /api/bookings/{id}
GET    /api/customer/profile
PUT    /api/customer/profile
GET    /api/staff/customers
PUT    /api/staff/customers/{id}
```

## 🛠️ Troubleshooting

**Port already in use?**
```bash
pnpm dev -- -p 3001
```

**Clear cache and rebuild:**
```bash
rm -rf .next node_modules
pnpm install
pnpm dev
```

**Backend connection issues?**
- Check backend is running on `http://localhost:8080`
- Verify CORS is enabled on backend
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`

## 📚 Full Documentation

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete documentation.

## 🎉 Ready to Go!

You're all set! The hotel booking system is now running with:
- Beautiful gradient UI
- Full authentication system
- Customer booking portal
- Staff admin dashboard
- Real-time backend integration

Enjoy! 🏨✨
