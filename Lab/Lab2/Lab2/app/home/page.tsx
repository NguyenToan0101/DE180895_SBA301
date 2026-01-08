import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import OrchidCard from "@/components/orchid/OrchidCard"
import { orchids } from "@/data/orchids"

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🌸 Orchid Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {orchids.map((orchid) => (
          <OrchidCard key={orchid.id} orchid={orchid} />
        ))}
      </div>
    </div>
  )
}


