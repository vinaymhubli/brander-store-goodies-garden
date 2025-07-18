
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { useMemo } from "react";

interface ProductGridProps {
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
}

export const ProductGrid = ({ searchQuery, selectedCategory, priceRange }: ProductGridProps) => {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceRange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
