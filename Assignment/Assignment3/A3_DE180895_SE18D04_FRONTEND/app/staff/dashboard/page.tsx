'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAllBookings, getAllCustomers, getRooms } from '@/app/lib/api';
import { BookingReservation, Customer, RoomInformation } from '@/app/lib/types';
import { Loader2, Users, DoorOpen, Calendar, TrendingUp } from 'lucide-react';

export default function StaffDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalRooms: 0,
    totalBookings: 0,
    confirmedBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [customers, rooms, bookings] = await Promise.all([
          getAllCustomers(),
          getRooms(),
          getAllBookings(),
        ]);
        console.log('Customer :' , customers)
        console.log('room :' , rooms)
        console.log('Booking:' , bookings)
        const customersList = Array.isArray(customers) ? customers : customers|| [];
        const roomsList = Array.isArray(rooms) ? rooms : rooms || [];
        const bookingsList = Array.isArray(bookings) ? bookings : bookings || [];
        
        setStats({
          totalCustomers: customersList.length,
          totalRooms: roomsList.length,
          totalBookings: bookingsList.length,
          confirmedBookings: bookingsList.filter((b: BookingReservation) => b.bookingStatus === 'CONFIRMED').length,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Welcome, {user?.email}!</h1>
        <p className="text-purple-100">Manage customers, rooms, and bookings from your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      ) : error ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-800">{error}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              icon: Users,
              label: 'Total Customers',
              value: stats.totalCustomers,
              gradient: 'from-blue-600 to-blue-400',
            },
            {
              icon: DoorOpen,
              label: 'Total Rooms',
              value: stats.totalRooms,
              gradient: 'from-purple-600 to-purple-400',
            },
            {
              icon: Calendar,
              label: 'Total Bookings',
              value: stats.totalBookings,
              gradient: 'from-green-600 to-green-400',
            },
            {
              icon: TrendingUp,
              label: 'Confirmed Bookings',
              value: stats.confirmedBookings,
              gradient: 'from-pink-600 to-pink-400',
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className={`border-0 bg-gradient-to-r ${stat.gradient} text-white shadow-lg`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <Icon className="h-12 w-12 opacity-20" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border border-purple-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Customer Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">View and manage all customer accounts</p>
            <Link href="/staff/customers">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Manage Customers
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DoorOpen className="h-5 w-5 text-blue-600" />
              Room Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Add, edit, or delete hotel rooms</p>
            <Link href="/staff/rooms">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                Manage Rooms
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-green-200 hover:shadow-lg transition-shadow md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Booking Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Monitor and update all customer bookings and reservations</p>
            <Link href="/staff/bookings">
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                View All Bookings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border border-purple-200 shadow-lg">
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <span className="text-gray-700 font-semibold">Admin Name</span>
            <span className="text-gray-900">{user?.email}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="text-gray-700 font-semibold">Email</span>
            <span className="text-gray-900">{user?.email}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span className="text-gray-700 font-semibold">Role</span>
            <span className="text-gray-900 font-semibold text-green-600">{user?.roles}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
            <span className="text-gray-700 font-semibold">Last Updated</span>
            <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
