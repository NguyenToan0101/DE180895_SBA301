export interface Orchid {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  isSpecial: boolean
}

export const orchids: Orchid[] = [
  {
    id: 1,
    name: "White Phalaenopsis",
    description: "Elegant white Phalaenopsis orchid, symbol of purity and grace.",
    price: 850000,
    category: "Phalaenopsis",
    image: "/images/1.jpg",
    isSpecial: true,
  },
  {
    id: 2,
    name: "Purple Cattleya",
    description: "Large purple blooms with a strong fragrance, perfect for decoration.",
    price: 1200000,
    category: "Cattleya",
    image: "/images/2.jpg",
    isSpecial: false,
  },
  {
    id: 3,
    name: "Yellow Dendrobium",
    description: "Bright yellow Dendrobium orchid, easy to care and long-lasting flowers.",
    price: 650000,
    category: "Dendrobium",
    image: "/images/3.jpg",
    isSpecial: false,
  },
  {
    id: 4,
    name: "Blue Vanda",
    description: "Rare blue Vanda orchid with stunning color and premium quality.",
    price: 1800000,
    category: "Vanda",
    image: "/images/4.jpg",
    isSpecial: true,
  },
  {
    id: 5,
    name: "Golden Oncidium",
    description: "Golden dancing lady orchid, cheerful and vibrant appearance.",
    price: 720000,
    category: "Oncidium",
    image: "/images/5.jpg",
    isSpecial: false,
  },
  {
    id: 6,
    name: "White Phalaenopsis",
    description: "Pure white moth orchid symbolizing elegance and beauty.",
    price: 850000,
    category: "Phalaenopsis",
    image: "/images/6.jpg",
    isSpecial: true,
  },
  {
    id: 7,
    name: "Purple Dendrobium",
    description: "Vibrant purple dendrobium orchid with long-lasting blooms.",
    price: 650000,
    category: "Dendrobium",
    image: "/images/7.jpg",
    isSpecial: false,
  },
  {
    id: 8,
    name: "Pink Cattleya",
    description: "Large pink cattleya orchid with a pleasant fragrance.",
    price: 980000,
    category: "Cattleya",
    image: "/images/8.jpg",
    isSpecial: true,
  },
  
]
