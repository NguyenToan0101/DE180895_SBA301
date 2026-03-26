'use client'

import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

interface Car {
  carID: number
  carName: string
  unitsInStock: number
  unitPrice: number
  countryName: string
  createdAt: string
  updatedAt: string
}

interface CarsTableProps {
  cars: Car[]
  onEdit: (car: Car) => void
  onDelete: (carId: number) => void
  isAdmin: boolean
}

export default function CarsTable({ cars, onEdit, onDelete, isAdmin }: CarsTableProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm')
    } catch {
      return dateString
    }
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No cars found. {isAdmin && 'Add a new car to get started.'}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Car ID</th>
            <th className="text-left py-3 px-4 font-medium">Car Name</th>
            <th className="text-right py-3 px-4 font-medium">Units in Stock</th>
            <th className="text-right py-3 px-4 font-medium">Unit Price</th>
            <th className="text-left py-3 px-4 font-medium">Country</th>
            <th className="text-left py-3 px-4 font-medium">Created At</th>
            <th className="text-left py-3 px-4 font-medium">Updated At</th>
            {isAdmin && <th className="text-center py-3 px-4 font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.carID} className="border-b hover:bg-muted/50">
              <td className="py-3 px-4">{car.carID}</td>
              <td className="py-3 px-4 font-medium">{car.carName}</td>
              <td className="py-3 px-4 text-right">{car.unitsInStock}</td>
              <td className="py-3 px-4 text-right">${car.unitPrice.toFixed(2)}</td>
              <td className="py-3 px-4">{car.countryName}</td>
              <td className="py-3 px-4">{formatDate(car.createdAt)}</td>
              <td className="py-3 px-4">{formatDate(car.updatedAt)}</td>
              {isAdmin && (
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(car)}
                      title="Edit car"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(car.carID)}
                      title="Delete car"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
