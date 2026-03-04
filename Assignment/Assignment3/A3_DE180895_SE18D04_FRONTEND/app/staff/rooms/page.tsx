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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getRooms, createRoom, updateRoom, deleteRoom } from '@/app/lib/api';
import { RoomInformation } from '@/app/lib/types';
import { Loader2, Plus, Edit2, Trash2, Users, DollarSign } from 'lucide-react';

export default function StaffRoomsPage() {
  const [rooms, setRooms] = useState<RoomInformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomInformation | null>(null);
  const [formData, setFormData] = useState<Partial<RoomInformation>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleAddRoom = async () => {
    try {
      setIsSubmitting(true);
      const newRoom = await createRoom(formData);
      setRooms([...rooms, newRoom]);
      setFormData({});
      setShowForm(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create room');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (room: RoomInformation) => {
    setSelectedRoom(room);
    setFormData(room);
    setShowEditDialog(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedRoom) return;
    
    try {
      setIsSubmitting(true);
      await updateRoom(selectedRoom.roomID, formData);
      setRooms(rooms.map(r => 
        r.roomID === selectedRoom.roomID 
          ? { ...r, ...formData }
          : r
      ));
      setShowEditDialog(false);
      setSelectedRoom(null);
      setFormData({});
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update room');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (room: RoomInformation) => {
    setSelectedRoom(room);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRoom) return;
    
    try {
      setIsSubmitting(true);
      await deleteRoom(selectedRoom.roomID);
      setRooms(rooms.filter(r => r.roomID !== selectedRoom.roomID));
      setShowDeleteDialog(false);
      setSelectedRoom(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete room');
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusDistribution = {
    available: rooms.filter(r => r.roomStatus === 'AVAILABLE').length,
    occupied: rooms.filter(r => r.roomStatus === 'OCCUPIED').length,
    maintenance: rooms.filter(r => r.roomStatus === 'MAINTENANCE').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Room Management</h1>
          <p className="text-gray-600">Add, edit, and manage hotel rooms</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Room
        </Button>
      </div>

      {/* Add Room Form */}
      {showForm && (
        <Card className="border border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle>Add New Room</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="roomNumber">Room Number</Label>
                  <Input
                    id="roomNumber"
                    value={formData.roomNumber || ''}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    placeholder="e.g., 101"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="roomType">Room Type</Label>
                  <Input
                    id="roomType"
                    value={formData.roomType?.roomTypeName || ''}
                    onChange={(e) => setFormData({ ...formData, roomType: { roomTypeName: e.target.value } })}
                    placeholder="e.g., Single, Double, Suite"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.roomDetailDescription || ''}
                  onChange={(e) => setFormData({ ...formData, roomDetailDescription: e.target.value })}
                  placeholder="Room details and amenities"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="maxCapacity">Max Capacity</Label>
                  <Input
                    id="maxCapacity"
                    type="number"
                    value={formData.roomMaxCapacity || ''}
                    onChange={(e) => setFormData({ ...formData, roomMaxCapacity: parseInt(e.target.value) })}
                    placeholder="Number of guests"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price Per Day ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.roomPricePerDay || ''}
                    onChange={(e) => setFormData({ ...formData, roomPricePerDay: parseFloat(e.target.value) })}
                    placeholder="e.g., 99.99"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.roomStatus || 'AVAILABLE'} onValueChange={(value) => setFormData({ ...formData, roomStatus: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AVAILABLE">Available</SelectItem>
                      <SelectItem value="OCCUPIED">Occupied</SelectItem>
                      <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({});
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddRoom}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Room'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Available', value: statusDistribution.available, gradient: 'from-green-600 to-green-400' },
          { label: 'Occupied', value: statusDistribution.occupied, gradient: 'from-red-600 to-red-400' },
          { label: 'Maintenance', value: statusDistribution.maintenance, gradient: 'from-yellow-600 to-yellow-400' },
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

      {/* Rooms List */}
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
          {rooms.map((room) => (
            <Card
              key={room.roomID}
              className="border border-purple-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Image Placeholder */}
              <div className="h-40 bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center text-white text-4xl">
                🏨
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{room.roomNumber}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{room.roomType?.roomTypeName}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
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

              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">{room.roomDetailDescription}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>Max {room.roomMaxCapacity} guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-semibold">${room.roomPricePerDay}/night</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 border-t border-purple-100 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50"
                    onClick={() => handleEditClick(room)}
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteClick(room)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && rooms.length === 0 && (
        <Card className="border-purple-200 bg-purple-50 p-8 text-center">
          <p className="text-gray-700 mb-4">No rooms found</p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Room
          </Button>
        </Card>
      )}

      {/* Edit Room Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Room</DialogTitle>
            <DialogDescription>
              Update room information. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-roomNumber">Room Number</Label>
                <Input
                  id="edit-roomNumber"
                  value={formData.roomNumber || ''}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                  placeholder="e.g., 101"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-roomType">Room Type</Label>
                <Input
                  id="edit-roomType"
                  value={formData.roomType?.roomTypeName || ''}
                  onChange={(e) => setFormData({ ...formData, roomType: { roomTypeName: e.target.value } })}
                  placeholder="e.g., Single, Double, Suite"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.roomDetailDescription || ''}
                onChange={(e) => setFormData({ ...formData, roomDetailDescription: e.target.value })}
                placeholder="Room details and amenities"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-maxCapacity">Max Capacity</Label>
                <Input
                  id="edit-maxCapacity"
                  type="number"
                  value={formData.roomMaxCapacity || ''}
                  onChange={(e) => setFormData({ ...formData, roomMaxCapacity: parseInt(e.target.value) })}
                  placeholder="Number of guests"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price Per Day ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={formData.roomPricePerDay || ''}
                  onChange={(e) => setFormData({ ...formData, roomPricePerDay: parseFloat(e.target.value) })}
                  placeholder="e.g., 99.99"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.roomStatus || 'AVAILABLE'} onValueChange={(value) => setFormData({ ...formData, roomStatus: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AVAILABLE">Available</SelectItem>
                    <SelectItem value="OCCUPIED">Occupied</SelectItem>
                    <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Room Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Room</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this room? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-semibold text-gray-900">
              Room {selectedRoom?.roomNumber}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {selectedRoom?.roomType?.roomTypeName}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
