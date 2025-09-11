import { Button } from "@/components/ui/button";
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  TrendingUp,
  Zap,
  ArrowRight,
  Crown,
  Sparkles,
  Award,
  Diamond,
} from "lucide-react";
import { Testimonials } from "./Testimonials";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export const FeaturedProducts = () => {
  const { addItem: addToCart } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data: productsData, error } = await supabase
        .from("products")
        .select("*, categories(name)")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;

      const productsWithExtras =
        productsData?.map((product, index) => {
          // Use real pricing data
          const sellingPrice = product.selling_price;
          const originalPrice = product.price;
          const hasDiscount = sellingPrice < originalPrice;
          const discountPercentage = hasDiscount
            ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
            : 0;

          return {
            ...product,
            rating: 5.0,
            reviews: Math.floor(Math.random() * 500) + 100,
            category: product.categories?.name || "General",
            discount: hasDiscount ? `${discountPercentage}% OFF` : null,
            features: ["Premium Quality", "Expert Crafted", "Limited Edition"],
            luxury: true,
            buttonColor: [
              "bg-purple-600 hover:bg-purple-700",
              "bg-emerald-600 hover:bg-emerald-700",
              "bg-indigo-600 hover:bg-indigo-700",
            ][index % 3],
            currency: "INR",
          };
        }) || [];

      setProducts(productsWithExtras);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };

  const handleAddToCart = (product: any) => {
    console.log("Add to cart clicked for:", product.name);
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url,
      });

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
      console.log("Item successfully added to cart");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleWishlistToggle = (product: any) => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(wishlistItem);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const handleViewProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleViewAllProducts = () => {
    navigate("/shop");
  };

  return (
    <>
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Simplified background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-32 animate-bounce animation-delay-300">
            <Crown className="h-6 w-6 text-yellow-500 opacity-50" />
          </div>
          <div className="absolute bottom-40 right-40 animate-bounce animation-delay-900">
            <Diamond className="h-5 w-5 text-purple-500 opacity-50" />
          </div>
          <div className="absolute top-2/3 left-20 animate-bounce animation-delay-600">
            <Sparkles className="h-5 w-5 text-pink-500 opacity-50" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 rounded-full px-6 py-3 mb-6 border border-orange-200">
              <Crown className="h-5 w-5 text-orange-600" />
              <span className="font-semibold">FEATURED PRODUCTS</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Customer
              <span className="block text-orange-600">Favorites</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hand-selected premium products beloved by thousands of discerning
              customers worldwide. Each piece represents the perfect harmony of
              quality, design, and exceptional value.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border ${
                  product.luxury ? "border-yellow-200" : "border-gray-200"
                } relative`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {product.discount}
                    </div>
                  )}

                  {/* Luxury indicator */}
                  {product.luxury && (
                    <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-yellow-500/90 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                      <Crown className="h-3 w-3" />
                      <span>LUXURY</span>
                    </div>
                  )}

                  {/* Hover actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex space-x-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleViewProduct(product.id)}
                        className="bg-white/90 hover:bg-white shadow-lg"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleWishlistToggle(product)}
                        className={`shadow-lg ${
                          isInWishlist(product.id)
                            ? "bg-red-100 hover:bg-red-200 text-red-600"
                            : "bg-white/90 hover:bg-white"
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            isInWishlist(product.id) ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600 uppercase tracking-wide font-semibold bg-gray-100 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Features */}
                  <div className="flex space-x-1 overflow-hidden">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full font-medium whitespace-nowrap"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-500 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-gray-800">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-600">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-gray-900">
                        {product.currency === "INR" ? "₹" : "$"}
                        {product.selling_price}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {product.currency === "INR" ? "₹" : "$"}
                        {product.price}
                      </span>
                    </div>
                    <div className="text-green-600 font-semibold">
                      Save {product.currency === "INR" ? "₹" : "$"}
                      {(product.price - product.selling_price).toFixed(2)}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full ${product.buttonColor} text-white rounded-full shadow-lg transition-all duration-300 py-3 font-semibold`}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                    {product.luxury && <Crown className="h-4 w-4 ml-2" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              onClick={handleViewAllProducts}
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-4 rounded-full shadow-lg transition-all duration-300 text-lg font-semibold"
            >
              <Award className="mr-3 h-5 w-5" />
              View All Products
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
};
