'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import CarsTable from '@/components/cars/cars-table'
import AddCarModal from '@/components/cars/add-car-modal'
import EditCarModal from '@/components/cars/edit-car-modal'
import DeleteConfirmDialog from '@/components/cars/delete-confirm-dialog'
import { LogOut } from 'lucide-react'

interface Car {
  carID: number
  carName: string
  unitsInStock: number
  unitPrice: number
  countryName: string
  createdAt: string
  updatedAt: string
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingCar, setEditingCar] = useState<Car | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; carId: number | null }>({
    show: false,
    carId: null,
  })
  const [isHydrated, setIsHydrated] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    if (!user) {
      router.push('/login')
      return
    }
    fetchCars()
  }, [user, router, isHydrated])

  const fetchCars = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:8080/api/car')
      if (!response.ok) throw new Error('Failed to fetch cars')
      const data = await response.json()
      setCars(data)
    } catch (error) {
      toast.error('Failed to load cars')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCar = async (carData: any) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:8080/api/admin/car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(carData),
      })

      if (!response.ok) throw new Error('Failed to add car')

      const newCar = await response.json()
      // Add to top of list
      setCars([newCar, ...cars])
      setShowAddModal(false)
      toast.success('Car added successfully')
    } catch (error) {
      toast.error('Failed to add car')
      console.error(error)
    }
  }

  const handleEditCar = async (carData: any) => {
    if (!editingCar) return

    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`http://localhost:8080/api/admin/car/${editingCar.carID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(carData),
      })

      if (!response.ok) throw new Error('Failed to update car')

      const updatedCar = await response.json()
      setCars(cars.map((c) => (c.carID === editingCar.carID ? updatedCar : c)))
      setShowEditModal(false)
      setEditingCar(null)
      toast.success('Car updated successfully')
    } catch (error) {
      toast.error('Failed to update car')
      console.error(error)
    }
  }

  const handleDeleteCar = async (carId: number) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`http://localhost:8080/api/admin/car/${carId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error('Failed to delete car')

      setCars(cars.filter((c) => c.carID !== carId))
      setDeleteConfirm({ show: false, carId: null })
      toast.success('Car deleted successfully')
    } catch (error) {
      toast.error('Failed to delete car')
      console.error(error)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
    toast.success('Logged out successfully')
  }

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b p-4">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        </div>
        <div className="p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="h-8 w-full bg-muted rounded animate-pulse" />
                <div className="h-8 w-full bg-muted rounded animate-pulse" />
                <div className="h-8 w-full bg-muted rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-2xl font-bold">Cars Management</h1>
            <p className="text-sm text-muted-foreground">Logged in as: {user?.emailAddress}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Cars List</CardTitle>
              <CardDescription>View and manage all vehicles</CardDescription>
            </div>
            {isAdmin && (
              <Button onClick={() => setShowAddModal(true)}>Add New Car</Button>
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading cars...</div>
            ) : (
              <CarsTable
                cars={cars}
                onEdit={(car) => {
                  if (isAdmin) {
                    setEditingCar(car)
                    setShowEditModal(true)
                  }
                }}
                onDelete={(carId) => {
                  if (isAdmin) {
                    setDeleteConfirm({ show: true, carId })
                  }
                }}
                isAdmin={isAdmin}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {showAddModal && (
        <AddCarModal onClose={() => setShowAddModal(false)} onSubmit={handleAddCar} />
      )}

      {showEditModal && editingCar && (
        <EditCarModal
          car={editingCar}
          onClose={() => {
            setShowEditModal(false)
            setEditingCar(null)
          }}
          onSubmit={handleEditCar}
        />
      )}

      {deleteConfirm.show && deleteConfirm.carId && (
        <DeleteConfirmDialog
          carName={cars.find((c) => c.carID === deleteConfirm.carId)?.carName || ''}
          onConfirm={() => handleDeleteCar(deleteConfirm.carId!)}
          onCancel={() => setDeleteConfirm({ show: false, carId: null })}
        />
      )}
    </div>
  )
}
