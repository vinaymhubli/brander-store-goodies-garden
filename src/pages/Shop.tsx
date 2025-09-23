import { Navigation } from "@/components/Navigation";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { SearchBar } from "@/components/shop/SearchBar";
import { useCategorySEO } from "@/hooks/useSEO";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Footer } from "@/components/Footer";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);

  // Initialize state from URL query parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    const priceParam = searchParams.get("price");

    console.log("Shop useEffect - URL params:", {
      categoryParam,
      searchParam,
      priceParam,
    });

    if (categoryParam) {
      console.log("Setting selectedCategory to:", categoryParam);
      setSelectedCategory(categoryParam);
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    }

    if (priceParam) {
      const price = parseInt(priceParam);
      if (!isNaN(price) && price > 0) {
        setPriceRange([0, price]);
      }
    }
  }, [searchParams]);

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    console.log(
      "handleCategoryChange called with:",
      category,
      "type:",
      typeof category
    );
    setSelectedCategory(category);
    const newSearchParams = new URLSearchParams(searchParams);

    if (category) {
      newSearchParams.set("category", category);
    } else {
      newSearchParams.delete("category");
    }

    setSearchParams(newSearchParams);
  };

  // Update URL when search changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const newSearchParams = new URLSearchParams(searchParams);

    if (query) {
      newSearchParams.set("search", query);
    } else {
      newSearchParams.delete("search");
    }

    setSearchParams(newSearchParams);
  };

  // Update SEO based on category and search
  const getCategoryName = (category: string) => {
    switch (category.toLowerCase()) {
      case "hair-accessories":
      case "hair accessories":
        return "Hair Accessories";
      case "kitchen-appliances":
      case "kitchen appliances":
        return "Kitchen Appliances";
      default:
        return "All Products";
    }
  };

  const categoryName = getCategoryName(selectedCategory);
  const categoryDescription = selectedCategory
    ? `Browse our collection of premium ${categoryName.toLowerCase()} at Brander Store. High-quality products with fast delivery and excellent customer service.`
    : "Discover our full range of premium hair accessories and kitchen appliances at Brander Store. Shop with confidence and enjoy fast delivery.";

  useCategorySEO(categoryName, categoryDescription);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Shop
          </h1>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Mobile Filters Overlay */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
              <div className="bg-white h-full w-80 max-w-[90vw] overflow-y-auto">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <ProductFilters
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Desktop Filters */}
          <div className="hidden lg:block lg:col-span-1">
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
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
      <Footer />
    </div>
  );
};

export default Shop;
