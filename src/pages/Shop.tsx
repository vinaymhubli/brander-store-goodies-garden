
import { Navigation } from "@/components/Navigation";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { SearchBar } from "@/components/shop/SearchBar";
import { useState } from "react";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop</h1>
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </div>
          
          <div className="lg:col-span-3">
            <ProductGrid
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
