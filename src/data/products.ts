
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
    name: "Twist & Shine Hairpin",
    price: 399,
    image: "/lovable-uploads/0e47b206-5348-4675-8404-0969b160c876.png",
    category: "Hair Accessories",
    description: "Add a graceful twist to your hairdo with this sleek metallic hairpin. Perfect for both casual buns and elegant updos.",
    rating: 5.0,
    reviews: 487
  },
  {
    id: 2,
    name: "Elegance Pearl Hairclip",
    price: 499,
    image: "/lovable-uploads/9c745f4d-f750-4284-a540-39dd602c2848.png",
    category: "Hair Accessories",
    description: "A timeless hair accessory featuring faux pearls and a golden finish. Ideal for formal events or adding charm to your daily look.",
    rating: 5.0,
    reviews: 203
  },
  {
    id: 4,
    name: "Bold Bloom Hairclip",
    price: 1199.99,
    image: "/lovable-uploads/878e4c65-0f31-41e4-a08d-901d3c4b56e9.png",
    category: "Hair Accessories",
    description: "Make a statement with this vibrant floral clip, designed to hold thick hair while adding a touch of playful boldness.",
    rating: 5.0,
    reviews: 142
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
