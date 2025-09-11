
import { ProductCard } from "./ProductCard";
import { useMemo, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProductGridProps {
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
}

export const ProductGrid = ({ searchQuery, selectedCategory, priceRange }: ProductGridProps) => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data: productsData, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedProducts = productsData?.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url,
        category: product.categories?.name || 'General',
        description: product.description,
        rating: 5.0, // Mock rating
        reviews: Math.floor(Math.random() * 500) + 50 // Mock reviews
      })) || [];

      setAllProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log("ProductGrid rendering with:", { searchQuery, selectedCategory, priceRange });
  console.log("Total products:", allProducts.length);
  
  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
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
  }, [allProducts, searchQuery, selectedCategory, priceRange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-500">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-base sm:text-lg">No products found matching your criteria.</p>
          <p className="text-gray-400 text-sm mt-2">
            Total products available: {allProducts.length}
          </p>
        </div>
      )}
    </div>
  );
};
