
import { ChefHat, Gem, Utensils, Sparkles, ArrowRight, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProductCategories = () => {
  const categories = [
    {
      icon: ChefHat,
      title: "Professional Kitchen",
      description: "Restaurant-quality cookware and tools for culinary excellence",
      items: "200+ Products",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      iconBg: "bg-gradient-to-r from-orange-500 to-red-500",
      trend: "+23%"
    },
    {
      icon: Utensils,
      title: "Elegant Tableware",
      description: "Premium dining sets and sophisticated serving accessories",
      items: "150+ Products",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconBg: "bg-gradient-to-r from-green-500 to-emerald-500",
      trend: "+31%"
    },
    {
      icon: Gem,
      title: "Luxury Jewelry",
      description: "Handcrafted pieces featuring precious metals and gemstones",
      items: "100+ Products",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      iconBg: "bg-gradient-to-r from-purple-500 to-pink-500",
      trend: "+41%"
    },
    {
      icon: Sparkles,
      title: "Designer Accessories",
      description: "Exclusive accessories to complement your sophisticated lifestyle",
      items: "80+ Products",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      iconBg: "bg-gradient-to-r from-blue-500 to-indigo-500",
      trend: "+28%"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">Curated Collections</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Shop by
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our expertly curated collections, each designed to elevate your lifestyle 
            with premium quality and timeless elegance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`group relative ${category.bgColor} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/50 backdrop-blur-sm overflow-hidden`}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Trending badge */}
              <div className="absolute top-4 right-4 flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                <TrendingUp className="h-3 w-3" />
                <span>{category.trend}</span>
              </div>

              <div className="relative z-10">
                <div className={`${category.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-800 bg-white/60 px-3 py-1 rounded-full">
                    {category.items}
                  </span>
                </div>

                <Button 
                  className={`w-full bg-gradient-to-r ${category.color} text-white hover:shadow-lg transition-all duration-300 rounded-full group-hover:scale-105`}
                >
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <Button 
            variant="outline" 
            size="lg" 
            className="px-12 py-4 text-lg rounded-full border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:scale-105"
          >
            View All Collections
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
