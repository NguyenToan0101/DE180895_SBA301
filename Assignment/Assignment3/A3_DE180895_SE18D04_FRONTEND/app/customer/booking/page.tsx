'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getRooms, createBooking } from '@/app/lib/api';
import { RoomInformation } from '@/app/lib/types';
import { Loader2, CheckCircle2, AlertCircle, Plus, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function BookingPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<RoomInformation[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = await getRooms();
        setRooms(Array.isArray(data) ? data : data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomSelect = (roomId: number) => {
    setSelectedRooms(prev =>
      prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]
    );
  };

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || selectedRooms.length === 0) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    const totalPrice = selectedRooms.reduce((sum, roomId) => {
      const room = rooms.find(r => r.roomID === roomId);
      return sum + (room ? room.roomPricePerDay * nights : 0);
    }, 0);

    return totalPrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!startDate || !endDate || selectedRooms.length === 0) {
      setError('Please select dates and at least one room');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError('End date must be after start date');
      return;
    }

    setSubmitting(true);

    try {
      const details = selectedRooms.map(roomId => ({
        roomID: roomId,
        startDate,
        endDate,
        actualPrice: rooms.find(r => r.roomID === roomId)?.roomPricePerDay || 0,
      }));

      await createBooking({
        // bookingDate: new Date().toISOString().split('T')[0],
        // details,
        // totalPrice: calculateTotalPrice(),
        details
      });
      
      setSuccess('Booking created successfully! Redirecting...');
      setTimeout(() => {
        router.push('/customer/bookings');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Create New Booking</h1>
        <p className="text-gray-600">Select rooms and dates for your stay</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date Selection */}
          <Card className="border border-purple-200">
            <CardHeader>
              <CardTitle>Select Your Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-gray-700">Check-in Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border-purple-200 focus:ring-purple-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-gray-700">Check-out Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border-purple-200 focus:ring-purple-500"
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Room Selection */}
          <Card className="border border-purple-200">
            <CardHeader>
              <CardTitle>Select Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                </div>
              ) : (
                <div className="space-y-3">
                  {rooms.filter(r => r.roomStatus === 'AVAILABLE').map(room => (
                    <div
                      key={room.roomID}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedRooms.includes(room.roomID)
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      onClick={() => handleRoomSelect(room.roomID)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">Room {room.roomNumber}</p>
                          <p className="text-sm text-gray-600">{room.roomType?.roomTypeName}</p>
                          <p className="text-sm text-gray-600">Capacity: {room.roomMaxCapacity} guests</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-purple-600">${room.roomPricePerDay}/night</p>
                          <input
                            type="checkbox"
                            checked={selectedRooms.includes(room.roomID)}
                            onChange={() => {}}
                            className="mt-2 w-4 h-4 text-purple-600"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div>
          <Card className="border-2 border-gradient-to-r from-purple-600 to-blue-600 sticky top-24 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Check-in</p>
                  <p className="font-semibold text-gray-900">{startDate || 'Not selected'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Check-out</p>
                  <p className="font-semibold text-gray-900">{endDate || 'Not selected'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Selected Rooms</p>
                  <p className="font-semibold text-gray-900">{selectedRooms.length} room(s)</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700 font-semibold">Total Price</span>
                  <span className="text-2xl font-bold text-purple-600">${totalPrice}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Button
                  type="submit"
                  disabled={submitting || selectedRooms.length === 0 || !startDate || !endDate}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Complete Booking
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="w-full"
                >
                  Cancel
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
