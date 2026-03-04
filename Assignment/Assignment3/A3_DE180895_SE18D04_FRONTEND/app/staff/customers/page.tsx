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
import { getAllCustomers, updateCustomer } from '@/app/lib/api';
import { Customer } from '@/app/lib/types';
import { Loader2, Mail, Phone, MapPin, Edit2, Trash2 } from 'lucide-react';

export default function StaffCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<Customer>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const data = await getAllCustomers();
        console.log('DAta' , data)
        setCustomers(Array.isArray(data) ? data : data || []);
        console.log('Customer' , customers)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditFormData(customer);
    setShowEditDialog(true);
  };

  const handleDeleteClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDeleteDialog(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedCustomer) return;
    
    try {
      setIsSubmitting(true);
      await updateCustomer(selectedCustomer.customerID, editFormData);
      // Update the local customers list
      setCustomers(customers.map(c => 
        c.customerID === selectedCustomer.customerID 
          ? { ...c, ...editFormData }
          : c
      ));
      setShowEditDialog(false);
      setSelectedCustomer(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update customer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCustomer) return;
    
    try {
      setIsSubmitting(true);
      // Call delete API (if available) or set customer status to inactive
      // For now, we'll use updateCustomer to mark as inactive
      await updateCustomer(selectedCustomer.customerID, { status: 'INACTIVE' });
      // Update the local customers list
      setCustomers(customers.filter(c => c.customerID !== selectedCustomer.customerID));
      setShowDeleteDialog(false);
      setSelectedCustomer(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete customer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Customer Management</h1>
        <p className="text-gray-600">View and manage all customer accounts</p>
      </div>

      {/* Search Bar */}
      <Card className="border border-purple-200">
        <CardContent className="pt-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
          />
        </CardContent>
      </Card>

      {/* Customers Table */}
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
        <div className="space-y-4">
          {filteredCustomers.length === 0 ? (
            <Card className="border-purple-200 bg-purple-50 p-8 text-center">
              <p className="text-gray-700 mb-4">No customers found</p>
            </Card>
          ) : (
            filteredCustomers.map((customer) => (
              <Card key={customer.customerID} className="border border-purple-200 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">Name</p>
                      <p className="font-bold text-lg text-gray-900">{customer.fullName}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">Email</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-purple-600" />
                        <p className="font-semibold text-gray-900">{customer.email}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">Phone</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <p className="font-semibold text-gray-900">{customer.phoneNumber}</p>
                      </div>
                    </div>
{/* 
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">Address</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <p className="font-semibold text-gray-900 truncate">{customer.address}</p>
                      </div>
                    </div> */}

                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                        onClick={() => handleEditClick(customer)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteClick(customer)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {/* <div className="border-t border-purple-100 mt-4 pt-4">
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">ID Document:</span>
                        <span className="font-semibold ml-2 text-gray-900">{customer.identificationID}</span>
                      </div>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Summary */}
      <Card className="border border-purple-200 bg-purple-50/50">
        <CardContent className="pt-6">
          <p className="text-gray-700">
            <span className="font-bold text-lg text-purple-600">{filteredCustomers.length}</span>
            {' '}customer(s) found
          </p>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>
              Update customer information. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={editFormData.fullName || ''}
                onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={editFormData.email || ''}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={editFormData.phoneNumber || ''}
                onChange={(e) => setEditFormData({ ...editFormData, phoneNumber: e.target.value })}
                placeholder="Enter phone number"
              />
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this customer? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-semibold text-gray-900">
              {selectedCustomer?.fullName}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {selectedCustomer?.email}
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
