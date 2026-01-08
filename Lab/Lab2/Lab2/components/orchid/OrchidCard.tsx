"use client"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Orchid } from "@/data/orchids"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
interface Props {
  orchid: Orchid
}

export default function OrchidCard({ orchid }: Props) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={orchid.image}
          alt={orchid.name}
          fill
          className="object-cover"
        />

        {orchid.isSpecial && (
          <Badge className="absolute top-2 left-2 bg-pink-500">
            Special
          </Badge>
        )}
      </div>

      {/* Header */}
      <CardHeader>
        <CardTitle>{orchid.name}</CardTitle>
        <CardDescription>{orchid.category}</CardDescription>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center">
        <span className="font-semibold text-green-600">
          {orchid.price.toLocaleString()} ₫
        </span>

        {/* Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">Detail</Button>
          </DialogTrigger>

          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{orchid.name}</DialogTitle>
            </DialogHeader>

            {/* Modal content */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image */}
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                  src={orchid.image}
                  alt={orchid.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Category: {orchid.category}
                </p>

                <p className="text-lg font-semibold text-green-600">
                  {orchid.price.toLocaleString()} ₫
                </p>

                <p className="leading-relaxed">
                  {orchid.description}
                </p>

                {orchid.isSpecial && (
                  <Badge className="bg-pink-500 w-fit">
                    Special Orchid
                  </Badge>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}