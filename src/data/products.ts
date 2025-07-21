
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Master Chef's Damascus Steel Collection",
    price: 399,
    image: "/lovable-uploads/f3cff865-b598-4bb1-9049-99b64a31c5d1.png",
    category: "Professional Kitchen",
    description: "Hand-forged Damascus steel kitchen knife collection featuring premium carbon steel construction with lifetime warranty. Master chef approved for professional kitchens.",
    rating: 5.0,
    reviews: 487
  },
  {
    id: 2,
    name: "Royal Diamond Heritage Necklace",
    price: 499,
    image: "/lovable-uploads/ffa69f3f-1a99-47e3-9499-487b428d86b4.png",
    category: "Royal Jewelry",
    description: "24K gold plated heritage necklace featuring natural diamonds and royal craftsmanship. A timeless piece representing luxury and elegance.",
    rating: 5.0,
    reviews: 203
  },
  {
    id: 3,
    name: "Artisan Porcelain Dining Collection",
    price: 349.99,
    image: "/lovable-uploads/d27ef0bf-b53c-4275-a245-4a25eeb7c8e4.png",
    category: "Luxury Tableware",
    description: "Hand-painted porcelain dining set of museum quality. Limited edition collection featuring intricate designs and premium craftsmanship.",
    rating: 4.9,
    reviews: 356
  },
  {
    id: 4,
    name: "Imperial Gold Wedding Ring",
    price: 1199.99,
    image: "/lovable-uploads/fd729123-23d2-4374-b4df-1a186593e99b.png",
    category: "Luxury Jewelry",
    description: "18K pure gold wedding ring with diamond accents. Master crafted with exceptional attention to detail for your special moments.",
    rating: 5.0,
    reviews: 142
  },
  {
    id: 5,
    name: "Diamond Engagement Ring",
    price: 299.99,
    image: "/lovable-uploads/f3cff865-b598-4bb1-9049-99b64a31c5d1.png",
    category: "Rings",
    description: "Beautiful diamond engagement ring with classic design",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 6,
    name: "Gold Necklace",
    price: 199.99,
    image: "/lovable-uploads/ffa69f3f-1a99-47e3-9499-487b428d86b4.png",
    category: "Necklaces",
    description: "Elegant gold necklace perfect for any occasion",
    rating: 4.6,
    reviews: 89
  },
  {
    id: 7,
    name: "Pearl Earrings",
    price: 149.99,
    image: "/lovable-uploads/d27ef0bf-b53c-4275-a245-4a25eeb7c8e4.png",
    category: "Earrings",
    description: "Classic pearl earrings with silver backing",
    rating: 4.7,
    reviews: 67
  },
  {
    id: 8,
    name: "Silver Bracelet",
    price: 89.99,
    image: "/lovable-uploads/fd729123-23d2-4374-b4df-1a186593e99b.png",
    category: "Bracelets",
    description: "Modern silver bracelet with unique design",
    rating: 4.5,
    reviews: 43
  },
  {
    id: 9,
    name: "Luxury Watch",
    price: 799.99,
    image: "/lovable-uploads/f3cff865-b598-4bb1-9049-99b64a31c5d1.png",
    category: "Watches",
    description: "Premium luxury watch with leather strap",
    rating: 4.9,
    reviews: 156
  },
  {
    id: 10,
    name: "Tennis Bracelet",
    price: 399.99,
    image: "/lovable-uploads/ffa69f3f-1a99-47e3-9499-487b428d86b4.png",
    category: "Bracelets",
    description: "Sparkling tennis bracelet with diamonds",
    rating: 4.8,
    reviews: 92
  },
  {
    id: 999,
    name: "Heat Mat Pro - Food Heating Pad",
    price: 4999,
    image: "/lovable-uploads/84e3fe74-3fe5-4aa1-b8f7-c02c0b8b19a1.png",
    category: "Kitchen Appliances",
    description: "Adjustable temperature electric food warmer with compact portable design, built-in timer and child lock safety features. Keep your meals perfectly warm with premium kitchen technology.",
    rating: 4.9,
    reviews: 234
  }
];
