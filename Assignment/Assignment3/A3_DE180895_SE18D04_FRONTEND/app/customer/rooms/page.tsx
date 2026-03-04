'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getRooms } from '@/app/lib/api';
import { RoomInformation } from '@/app/lib/types';
import { Loader2, MapPin, Users, DollarSign } from 'lucide-react';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomInformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = await getRooms();
        setRooms(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const filteredRooms = filterStatus === 'ALL'
    ? rooms
    : rooms.filter(room => room.roomStatus === filterStatus);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Browse Our Hotels</h1>
        <p className="text-gray-600">Discover luxury accommodations that match your needs</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'AVAILABLE', 'OCCUPIED', 'MAINTENANCE'].map((status) => (
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

      {/* Rooms Grid */}
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card
              key={room.roomID}
              className="border border-purple-200 overflow-hidden hover:shadow-xl transition-all group"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center text-white text-4xl group-hover:scale-105 transition-transform">
                🏨
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{room.roomNumber}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{room.roomType?.roomTypeName}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    room.roomStatus === 'AVAILABLE'
                      ? 'bg-green-100 text-green-700'
                      : room.roomStatus === 'OCCUPIED'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {room.roomStatus}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{room.roomDetailDescription}</p>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>Max {room.roomMaxCapacity} guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-semibold">${room.roomPricePerDay}/night</span>
                  </div>
                </div>

                {/* Room Description */}
                {room.roomType?.typeDescription && (
                  <div className="pt-2 border-t border-purple-100">
                    <p className="text-xs text-gray-600">{room.roomType.typeDescription}</p>
                  </div>
                )}

                {/* Book Button */}
                {room.roomStatus === 'AVAILABLE' && (
                  <Link href="/customer/booking">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 mt-4">
                      Book Now
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredRooms.length === 0 && (
        <Card className="border-purple-200 p-8 text-center">
          <p className="text-gray-600 mb-4">No rooms available with the selected filter</p>
          <Button
            onClick={() => setFilterStatus('ALL')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            View All Rooms
          </Button>
        </Card>
      )}
    </div>
  );
}
