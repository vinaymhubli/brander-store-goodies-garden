
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { useMemo } from "react";

interface ProductGridProps {
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
}

export const ProductGrid = ({ searchQuery, selectedCategory, priceRange }: ProductGridProps) => {
  console.log("ProductGrid rendering with:", { searchQuery, selectedCategory, priceRange });
  console.log("Total products:", products.length);
  
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      console.log(`Product: ${product.name}`, {
        matchesSearch,
        matchesCategory,
        matchesPrice,
        price: product.price,
        priceRange
      });
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
    
    console.log("Filtered products:", filtered.length);
    return filtered;
  }, [searchQuery, selectedCategory, priceRange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          <p className="text-gray-400 text-sm mt-2">
            Total products available: {products.length}
          </p>
        </div>
      )}
    </div>
  );
};
