import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Eye, TrendingUp, Zap, ArrowRight } from "lucide-react";

export const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Master Chef's Damascus Steel Knife Set",
      price: 299.99,
      originalPrice: 449.99,
      rating: 4.9,
      reviews: 324,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
      badge: "Best Seller",
      badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500",
      category: "Kitchen",
      discount: "33% OFF",
      features: ["Damascus Steel", "Lifetime Warranty", "Professional Grade"]
    },
    {
      id: 2,
      name: "Royal Collection Diamond Necklace",
      price: 1299.99,
      originalPrice: 1899.99,
      rating: 5.0,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
      badge: "Luxury",
      badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      category: "Jewelry",
      discount: "31% OFF",
      features: ["18K Gold", "Certified Diamonds", "Handcrafted"]
    },
    {
      id: 3,
      name: "Artisan Ceramic Dinnerware Collection",
      price: 189.99,
      originalPrice: 269.99,
      rating: 4.8,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
      badge: "New Arrival",
      badgeColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
      category: "Tableware",
      discount: "30% OFF",
      features: ["Handmade", "Dishwasher Safe", "Lead-Free"]
    },
    {
      id: 4,
      name: "Heritage Gold Wedding Ring Set",
      price: 599.99,
      originalPrice: 899.99,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
      badge: "Limited",
      badgeColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
      category: "Jewelry", 
      discount: "33% OFF",
      features: ["14K Gold", "Custom Engraving", "Lifetime Polish"]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-6 py-2 mb-6">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Featured Products</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Customer
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Favorites
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hand-picked premium products loved by thousands of customers worldwide. 
            Each piece represents the perfect blend of quality, design, and value.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badges */}
                <Badge className={`absolute top-4 left-4 ${product.badgeColor} text-white border-0 shadow-lg`}>
                  {product.badge}
                </Badge>
                
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {product.discount}
                </div>

                {/* Hover actions */}
                <div className="absolute inset-0 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white rounded-full shadow-lg">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white rounded-full shadow-lg">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-medium bg-gray-100 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs font-medium">Popular</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
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
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {product.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
