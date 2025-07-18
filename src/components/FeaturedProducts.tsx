
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Eye, TrendingUp, Zap, ArrowRight, Crown, Sparkles, Award, Diamond } from "lucide-react";

export const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Master Chef's Imperial Damascus Steel Collection",
      price: 499.99,
      originalPrice: 799.99,
      rating: 5.0,
      reviews: 487,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
      badge: "ULTRA PREMIUM",
      badgeColor: "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500",
      category: "Professional Kitchen",
      discount: "38% OFF",
      features: ["Hand-Forged Damascus", "Lifetime Warranty", "Master Chef Approved"],
      luxury: true
    },
    {
      id: 2,
      name: "Royal Crown Diamond Heritage Necklace",
      price: 2299.99,
      originalPrice: 3199.99,
      rating: 5.0,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
      badge: "IMPERIAL",
      badgeColor: "bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600",
      category: "Royal Jewelry",
      discount: "28% OFF",
      features: ["24K Gold Plated", "Natural Diamonds", "Royal Heritage"],
      luxury: true
    },
    {
      id: 3,
      name: "Artisan Elite Porcelain Dining Collection",
      price: 349.99,
      originalPrice: 519.99,
      rating: 4.9,
      reviews: 356,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
      badge: "EXCLUSIVE",
      badgeColor: "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600",
      category: "Luxury Tableware",
      discount: "33% OFF",
      features: ["Hand-Painted", "Museum Quality", "Limited Edition"],
      luxury: false
    },
    {
      id: 4,
      name: "Imperial Gold Wedding Ring Masterpiece",
      price: 1199.99,
      originalPrice: 1699.99,
      rating: 5.0,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
      badge: "MASTERPIECE",
      badgeColor: "bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600",
      category: "Luxury Jewelry", 
      discount: "29% OFF",
      features: ["18K Pure Gold", "Diamond Accents", "Master Crafted"],
      luxury: true
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 via-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Ultra Premium background elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating luxury elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-32 animate-bounce animation-delay-300">
          <Crown className="h-8 w-8 text-yellow-500 opacity-70" />
        </div>
        <div className="absolute bottom-40 right-40 animate-bounce animation-delay-900">
          <Diamond className="h-6 w-6 text-purple-500 opacity-70" />
        </div>
        <div className="absolute top-2/3 left-20 animate-bounce animation-delay-600">
          <Sparkles className="h-7 w-7 text-pink-500 opacity-70" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 text-orange-800 rounded-full px-8 py-4 mb-8 border-2 border-yellow-400/40 shadow-2xl backdrop-blur-sm">
            <Crown className="h-6 w-6 text-yellow-600" />
            <span className="text-lg font-black tracking-wide">FEATURED LUXURY PRODUCTS</span>
          </div>
          <h2 className="text-6xl lg:text-8xl font-black text-gray-900 mb-8 leading-none">
            Customer
            <span className="block bg-gradient-to-r from-yellow-600 via-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Masterpieces
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Hand-selected premium products beloved by thousands of discerning customers worldwide. 
            Each masterpiece represents the perfect harmony of uncompromising quality, timeless design, and exceptional value.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110 border-2 ${product.luxury ? 'border-yellow-200' : 'border-gray-200'} relative transform hover:-rotate-1`}
            >
              <div className="relative overflow-hidden">
                {/* Ultra premium image with enhanced effects */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-125 transition-transform duration-1000"
                  />
                  
                  {/* Luxury overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {product.luxury && (
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-purple-400/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                  )}
                </div>
                
                {/* Premium badges */}
                <Badge className={`absolute top-6 left-6 ${product.badgeColor} text-white border-0 shadow-2xl text-sm font-black px-4 py-2`}>
                  {product.badge}
                </Badge>
                
                <div className="absolute top-6 right-6 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-black shadow-xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  {product.discount}
                </div>

                {/* Luxury indicator */}
                {product.luxury && (
                  <div className="absolute bottom-6 left-6 flex items-center space-x-2 bg-yellow-500/90 text-yellow-900 px-3 py-2 rounded-full text-xs font-black shadow-lg backdrop-blur-sm">
                    <Crown className="h-3 w-3" />
                    <span>LUXURY</span>
                  </div>
                )}

                {/* Premium hover actions */}
                <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Button size="sm" className="bg-white/95 text-gray-900 hover:bg-white rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300">
                    <Eye className="h-5 w-5" />
                  </Button>
                  <Button size="sm" className="bg-white/95 text-gray-900 hover:bg-white rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-600 uppercase tracking-wider font-black bg-gray-100 px-3 py-2 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-2 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs font-black">TRENDING</span>
                    </div>
                  </div>
                  <h3 className="font-black text-gray-900 text-xl leading-tight group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </div>

                {/* Premium features */}
                <div className="flex flex-wrap gap-2">
                  {product.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-blue-50 text-blue-800 px-3 py-2 rounded-full font-bold border border-blue-200">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Premium rating display */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-500 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-black text-gray-800">
                    {product.rating}
                  </span>
                  <span className="text-sm text-gray-600 font-medium">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Premium pricing */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-black text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <div className="text-lg text-green-600 font-black">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </div>
                </div>

                <Button className={`w-full ${product.luxury ? 'bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 hover:from-yellow-700 hover:via-orange-700 hover:to-red-700' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'} text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-110 py-4 text-lg font-black`}>
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  Add to Cart
                  {product.luxury && <Crown className="h-5 w-5 ml-3" />}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-gray-900 via-gray-800 to-black hover:from-gray-800 hover:via-gray-700 hover:to-gray-900 text-white px-16 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 text-xl font-black border-4 border-gray-700"
          >
            <Award className="mr-4 h-6 w-6" />
            View All Premium Products
            <ArrowRight className="ml-4 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};
