'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllBookings, updateBooking } from '@/app/lib/api';
import { BookingReservation } from '@/app/lib/types';
import { Loader2, Calendar, User, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function StaffBookingsPage() {
  const [bookings, setBookings] = useState<BookingReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getAllBookings();
        setBookings(Array.isArray(data) ? data : data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId: number, newStatus: string) => {
    setUpdatingId(bookingId);
    try {
      console.log('book id ', bookingId)
      console.log('status ', newStatus)
      await updateBooking(bookingId, newStatus);
      setBookings(prev =>
        prev.map(b => b.bookingReservationID === bookingId ? { ...b, bookingStatus: newStatus } : b)
      );
      setUpdateMessage('Booking status updated successfully!');
      setTimeout(() => setUpdateMessage(''), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update booking');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = filterStatus === 'ALL'
    ? bookings
    : bookings.filter(b => b.bookingStatus === filterStatus);

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.bookingStatus === 'CONFIRMED').length,
    pending: bookings.filter(b => b.bookingStatus === 'PENDING').length,
    cancelled: bookings.filter(b => b.bookingStatus === 'CANCELLED').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Booking Management</h1>
        <p className="text-gray-600">Monitor and update all customer bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Bookings', value: stats.total, gradient: 'from-blue-600 to-blue-400' },
          { label: 'Confirmed', value: stats.confirmed, gradient: 'from-green-600 to-green-400' },
          { label: 'Pending', value: stats.pending, gradient: 'from-yellow-600 to-yellow-400' },
          { label: 'Cancelled', value: stats.cancelled, gradient: 'from-red-600 to-red-400' },
        ].map((stat) => (
          <Card
            key={stat.label}
            className={`border-0 bg-gradient-to-r ${stat.gradient} text-white shadow-lg`}
          >
            <CardContent className="pt-6">
              <p className="text-white/80 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED'].map((status) => (
          <Button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`${
              filterStatus === status
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-white border border-purple-200 text-gray-700 hover:bg-purple-50'
            }`}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Messages */}
      {updateMessage && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{updateMessage}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Bookings List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      ) : filteredBookings.length === 0 ? (
        <Card className="border-purple-200 bg-purple-50 p-8 text-center">
          <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <p className="text-gray-700">No bookings found with this filter</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card
              key={booking.bookingReservationID}
              className="border border-purple-200 hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-6 gap-4 items-start">
                  {/* Booking ID */}
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold">Booking ID</p>
                    <p className="font-bold text-lg text-purple-600">#{booking.bookingReservationID}</p>
                  </div>

                  {/* Customer */}
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Customer
                    </p>
                    <p className="font-semibold text-gray-900">{booking.customer?.fullName}</p>
                    <p className="text-xs text-gray-600">{booking.customer?.email}</p>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Date
                    </p>
                    <p className="font-semibold text-gray-900">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                  </div>

                  {/* Rooms */}
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold">Rooms</p>
                    <p className="font-semibold text-gray-900">{booking.bookingDetails?.length || 0}</p>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Total
                    </p>
                    <p className="font-bold text-lg text-green-600">${booking.totalPrice}</p>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold text-center ${
                      booking.bookingStatus === 'CONFIRMED'
                        ? 'bg-green-100 text-green-700'
                        : booking.bookingStatus === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {booking.bookingStatus}
                    </span>
                    {booking.bookingStatus === 'PENDING' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(booking.bookingReservationID, 'CONFIRMED')}
                        disabled={updatingId === booking.bookingReservationID}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs"
                      >
                        {updatingId === booking.bookingReservationID ? 'Updating...' : 'Confirm'}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Room Details */}
                {booking.bookingDetails && booking.bookingDetails.length > 0 && (
                  <div className="border-t border-purple-100 mt-4 pt-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Room Details:</p>
                    <div className="grid md:grid-cols-3 gap-3">
                      {booking.bookingDetails.map((detail, idx) => (
                        <div key={idx} className="bg-purple-50 p-3 rounded-lg">
                          <p className="font-semibold text-gray-900">Room {detail.room.roomNumber}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {new Date(detail.startDate).toLocaleDateString()} - {new Date(detail.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-purple-600 font-semibold mt-1">${detail.actualPrice}/night</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
