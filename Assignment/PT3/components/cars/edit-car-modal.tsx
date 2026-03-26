'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

interface Country {
  countryID: number
  countryName: string
}

interface Car {
  carID: number
  carName: string
  unitsInStock: number
  unitPrice: number
  countryName: string
  createdAt: string
  updatedAt: string
}

interface EditCarModalProps {
  car: Car
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
}

export default function EditCarModal({ car, onClose, onSubmit }: EditCarModalProps) {
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [carName, setCarName] = useState(car.carName)
  const [unitsInStock, setUnitsInStock] = useState(car.unitsInStock.toString())
  const [unitPrice, setUnitPrice] = useState(car.unitPrice.toString())
  const [countryID, setCountryID] = useState('')
  const [isHydrated, setIsHydrated] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setIsHydrated(true)
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/country')
      if (!response.ok) throw new Error('Failed to fetch countries')
      const data = await response.json()
      setCountries(data)
      // Set current country
      const currentCountry = data.find((c: Country) => c.countryName === car.countryName)
      if (currentCountry) {
        setCountryID(currentCountry.countryID.toString())
      }
    } catch (error) {
      toast.error('Failed to load countries')
      console.error(error)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!carName.trim()) {
      newErrors.carName = 'Car name is required'
    } else if (carName.length <= 10) {
      newErrors.carName = 'Car name must be greater than 10 characters'
    }

    if (!unitsInStock) {
      newErrors.unitsInStock = 'Units in stock is required'
    } else {
      const units = parseInt(unitsInStock)
      if (units < 5 || units > 20) {
        newErrors.unitsInStock = 'Units in stock must be between 5 and 20'
      }
    }

    if (!unitPrice) {
      newErrors.unitPrice = 'Unit price is required'
    } else if (parseFloat(unitPrice) <= 0) {
      newErrors.unitPrice = 'Unit price must be greater than 0'
    }

    if (!countryID) {
      newErrors.countryID = 'Country is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await onSubmit({
        carName,
        unitsInStock: parseInt(unitsInStock),
        unitPrice: parseFloat(unitPrice),
        countryID: parseInt(countryID),
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isHydrated) {
    return null
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Car</DialogTitle>
          <DialogDescription>Update the car details below.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Car Name <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="e.g., Toyota Corolla"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              className={errors.carName ? 'border-destructive' : ''}
            />
            {errors.carName && <p className="text-xs text-destructive mt-1">{errors.carName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Units in Stock <span className="text-destructive">*</span>
            </label>
            <Input
              type="number"
              placeholder="5-20"
              value={unitsInStock}
              onChange={(e) => setUnitsInStock(e.target.value)}
              min="5"
              max="20"
              className={errors.unitsInStock ? 'border-destructive' : ''}
            />
            {errors.unitsInStock && (
              <p className="text-xs text-destructive mt-1">{errors.unitsInStock}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Unit Price <span className="text-destructive">*</span>
            </label>
            <Input
              type="number"
              placeholder="0.00"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              step="0.01"
              min="0"
              className={errors.unitPrice ? 'border-destructive' : ''}
            />
            {errors.unitPrice && (
              <p className="text-xs text-destructive mt-1">{errors.unitPrice}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Country <span className="text-destructive">*</span>
            </label>
            <Select value={countryID} onValueChange={setCountryID}>
              <SelectTrigger className={errors.countryID ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.countryID} value={country.countryID.toString()}>
                    {country.countryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.countryID && (
              <p className="text-xs text-destructive mt-1">{errors.countryID}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Car'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
