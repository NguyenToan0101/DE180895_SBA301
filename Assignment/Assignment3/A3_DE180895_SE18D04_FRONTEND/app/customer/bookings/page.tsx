'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { getMyBookings } from '@/app/lib/api';
import { BookingReservation } from '@/app/lib/types';
import { Loader2, Calendar, MapPin, DollarSign, ArrowRight, X } from 'lucide-react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState<BookingReservation | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

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

  const handleViewDetails = (booking: BookingReservation) => {
    setSelectedBooking(booking);
    setShowDetailsDialog(true);
  };

  const filteredBookings = filterStatus === 'ALL'
    ? bookings
    : bookings.filter(booking => booking.bookingStatus === filterStatus);

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
        <h1 className="text-4xl font-bold mb-2 text-gray-900">My Bookings</h1>
        <p className="text-gray-600">View and manage all your hotel reservations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Bookings', value: stats.total, color: 'from-blue-600 to-blue-400' },
          { label: 'Confirmed', value: stats.confirmed, color: 'from-green-600 to-green-400' },
          { label: 'Pending', value: stats.pending, color: 'from-yellow-600 to-yellow-400' },
          { label: 'Cancelled', value: stats.cancelled, color: 'from-red-600 to-red-400' },
        ].map((stat) => (
          <Card key={stat.label} className={`border-0 bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
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

      {/* Bookings List */}
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
      ) : filteredBookings.length === 0 ? (
        <Card className="border-purple-200 bg-purple-50 p-12 text-center">
          <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <p className="text-gray-700 mb-4 text-lg">No bookings found</p>
          <Link href="/customer/booking">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Create New Booking
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card
              key={booking.bookingReservationID}
              className="border border-purple-200 hover:shadow-lg transition-shadow overflow-hidden"
            >
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-5 gap-4 items-start">
                  {/* Booking ID */}
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold">Booking ID</p>
                    <p className="font-bold text-lg text-purple-600">#{booking.bookingReservationID}</p>
                  </div>

                  {/* Booking Date */}
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold">Date</p>
                    <p className="font-semibold">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                  </div>

                  {/* Rooms Info */}
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold">Rooms</p>
                    <p className="font-semibold">{booking.bookingDetails?.length || 0} room(s)</p>
                    <div className="text-xs text-gray-500 mt-1">
                      {booking.bookingDetails?.map((detail) => (
                        <span key={detail.room.roomID}>
                          Room {detail.room.roomNumber}
                          {booking.bookingDetails.indexOf(detail) < booking.bookingDetails.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Total Price */}
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold">Total Price</p>
                    <p className="font-bold text-lg text-green-600">${booking.totalPrice}</p>
                  </div>

                  {/* Status & Action */}
                  <div className="flex flex-col items-end justify-between h-full">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      booking.bookingStatus === 'CONFIRMED'
                        ? 'bg-green-100 text-green-700'
                        : booking.bookingStatus === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {booking.bookingStatus}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 text-purple-600 border-purple-200 hover:bg-purple-50"
                      onClick={() => handleViewDetails(booking)}
                    >
                      View Details <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Booking Details Expansion */}
                <div className="border-t border-purple-100 mt-4 pt-4">
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    {booking.bookingDetails?.map((detail, idx) => (
                      <div key={idx} className="bg-purple-50 p-3 rounded-lg">
                        <p className="font-semibold text-gray-900">Room {detail.room.roomNumber}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {new Date(detail.startDate).toLocaleDateString()} to {new Date(detail.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-purple-600 font-semibold mt-1">${detail.actualPrice}/night</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* New Booking CTA */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-dashed border-purple-300 rounded-2xl p-8 text-center">
        <p className="text-gray-700 mb-4">Ready to book another stay?</p>
        <Link href="/customer/booking">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Create New Booking
          </Button>
        </Link>
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Complete information for your booking reservation
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6 py-4">
              {/* Booking Header */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Booking ID</p>
                  <p className="font-bold text-lg text-purple-600">#{selectedBooking.bookingReservationID}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Booking Date</p>
                  <p className="font-semibold">{new Date(selectedBooking.bookingDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Status</p>
                  <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${
                    selectedBooking.bookingStatus === 'CONFIRMED'
                      ? 'bg-green-100 text-green-700'
                      : selectedBooking.bookingStatus === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedBooking.bookingStatus}
                  </span>
                </div>
              </div>

              {/* Room Details */}
              <div className="border-t border-purple-100 pt-4">
                <p className="font-semibold text-gray-900 mb-3">Rooms Booked</p>
                <div className="space-y-3">
                  {selectedBooking.bookingDetails?.map((detail, idx) => (
                    <div key={idx} className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">Room {detail.room.roomNumber}</p>
                          <p className="text-sm text-gray-600">{detail.room.roomType?.roomTypeName}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded font-semibold ${
                          detail.room.roomStatus === 'AVAILABLE'
                            ? 'bg-green-100 text-green-700'
                            : detail.room.roomStatus === 'OCCUPIED'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {detail.room.roomStatus}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-700">
                          <span className="font-semibold">Check-in:</span> {new Date(detail.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Check-out:</span> {new Date(detail.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Duration:</span> {Math.ceil((new Date(detail.endDate).getTime() - new Date(detail.startDate).getTime()) / (1000 * 60 * 60 * 24))} nights
                        </p>
                        <p className="text-purple-600 font-semibold">
                          ${detail.actualPrice}/night
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="border-t border-purple-100 pt-4">
                <p className="font-semibold text-gray-900 mb-3">Pricing Summary</p>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Total Price</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">
                      ${selectedBooking.totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Room Info */}
              {selectedBooking.bookingDetails?.[0]?.room && (
                <div className="border-t border-purple-100 pt-4">
                  <p className="font-semibold text-gray-900 mb-3">Room Information</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 text-sm">
                    <p className="text-gray-700">
                      <span className="font-semibold">Description:</span> {selectedBooking.bookingDetails[0].room.roomDetailDescription}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Max Capacity:</span> {selectedBooking.bookingDetails[0].room.roomMaxCapacity} guests
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDetailsDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
