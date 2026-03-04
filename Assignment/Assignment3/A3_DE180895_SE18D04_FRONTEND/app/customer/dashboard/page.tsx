'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getMyBookings } from '@/app/lib/api';
import { BookingReservation } from '@/app/lib/types';
import { Loader2, Calendar, MapPin, DollarSign } from 'lucide-react';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getMyBookings();
        setBookings(Array.isArray(data) ? data : data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.email}!</h1>
        <p className="text-purple-100">Manage your hotel bookings and discover new luxury stays</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border border-purple-200 hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              Browse Hotels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Discover premium accommodations</p>
            <Link href="/customer/rooms">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Explore Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-blue-200 hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              New Booking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Create your next reservation</p>
            <Link href="/customer/booking">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                Book Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-cyan-200 hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-cyan-600" />
              My Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Update your information</p>
            <Link href="/customer/profile">
              <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="border border-purple-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Your Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No bookings yet</p>
              <Link href="/customer/rooms">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Browse Hotels
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.bookingReservationID}
                  className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 uppercase">Booking ID</p>
                      <p className="font-semibold">#{booking.bookingReservationID}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase">Date</p>
                      <p className="font-semibold">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase">Total Price</p>
                      <p className="font-semibold text-purple-600">${booking.totalPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.bookingStatus === 'CONFIRMED'
                          ? 'bg-green-100 text-green-700'
                          : booking.bookingStatus === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {booking.bookingStatus}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-purple-300 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Ready for your next adventure?</h2>
        <p className="text-gray-600 mb-6">Explore our collection of premium hotels and find your perfect stay</p>
        <Link href="/customer/rooms">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Discover Hotels
          </Button>
        </Link>
      </div>
    </div>
  );
}
