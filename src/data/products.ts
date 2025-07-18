
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
    name: "Diamond Engagement Ring",
    price: 299.99,
    image: "/lovable-uploads/60f61926-86cc-4be3-9cba-67af0112135b.png",
    category: "Rings",
    description: "Beautiful diamond engagement ring with classic design",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Gold Necklace",
    price: 199.99,
    image: "/lovable-uploads/b9939234-d571-4c99-9503-c34008224ce6.png",
    category: "Necklaces",
    description: "Elegant gold necklace perfect for any occasion",
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "Pearl Earrings",
    price: 149.99,
    image: "/lovable-uploads/60f61926-86cc-4be3-9cba-67af0112135b.png",
    category: "Earrings",
    description: "Classic pearl earrings with silver backing",
    rating: 4.7,
    reviews: 67
  },
  {
    id: 4,
    name: "Silver Bracelet",
    price: 89.99,
    image: "/lovable-uploads/b9939234-d571-4c99-9503-c34008224ce6.png",
    category: "Bracelets",
    description: "Modern silver bracelet with unique design",
    rating: 4.5,
    reviews: 43
  },
  {
    id: 5,
    name: "Luxury Watch",
    price: 799.99,
    image: "/lovable-uploads/60f61926-86cc-4be3-9cba-67af0112135b.png",
    category: "Watches",
    description: "Premium luxury watch with leather strap",
    rating: 4.9,
    reviews: 156
  },
  {
    id: 6,
    name: "Tennis Bracelet",
    price: 399.99,
    image: "/lovable-uploads/b9939234-d571-4c99-9503-c34008224ce6.png",
    category: "Bracelets",
    description: "Sparkling tennis bracelet with diamonds",
    rating: 4.8,
    reviews: 92
  }
];
