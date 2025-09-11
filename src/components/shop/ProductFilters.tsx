
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

export const ProductFilters = ({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}: ProductFiltersProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data: categoriesData, error } = await supabase
        .from('categories')
        .select('name')
        .order('name', { ascending: true });

      if (error) throw error;

      const categoryNames = ["All Categories", ...(categoriesData?.map(cat => cat.name) || [])];
      setCategories(categoryNames);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => {
              // Ensure we're comparing strings
              const categoryName = typeof category === 'string' ? category : category.name || category;
              const isSelected = selectedCategory === categoryName;
              
              return (
                <Button
                  key={categoryName}
                  variant={isSelected ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => onCategoryChange(categoryName === "All Categories" ? "" : categoryName)}
                >
                  {categoryName}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Maximum Price</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={[priceRange[1]]}
              onValueChange={(value) => onPriceRangeChange([0, value[0]])}
              max={5000}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹0</span>
              <span>₹{priceRange[1]}</span>
            </div>
            <div className="text-center text-sm text-gray-500">
              Show products up to ₹{priceRange[1]}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
