import { ChefHat, Gem, Utensils, Sparkles, ArrowRight, TrendingUp, Award, Crown, Star, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProductCategories = () => {
  const categories = [
    {
      icon: ChefHat,
      title: "Master Chef Collection", 
      description: "Professional-grade culinary tools crafted for gastronomic excellence",
      items: "300+ Premium Products",
      color: "bg-orange-600",
      bgColor: "bg-orange-50",
      trend: "+35%",
      badge: "BESTSELLER"
    },
    {
      icon: Utensils,
      title: "Royal Dining Experience",
      description: "Sophisticated tableware and serving accessories for distinguished dining",
      items: "250+ Luxury Items",
      color: "bg-emerald-600",
      bgColor: "bg-emerald-50",
      trend: "+42%",
      badge: "PREMIUM"
    },
    {
      icon: Gem,
      title: "Imperial Jewelry",
      description: "Handcrafted masterpieces featuring precious metals and rare gemstones",
      items: "150+ Exclusive Pieces",
      color: "bg-purple-600",
      bgColor: "bg-purple-50",
      trend: "+58%",
      badge: "EXCLUSIVE"
    },
    {
      icon: Crown,
      title: "Luxury Lifestyle",
      description: "Curated accessories and lifestyle products for discerning connoisseurs",
      items: "120+ Designer Items",
      color: "bg-amber-600",
      bgColor: "bg-amber-50",
      trend: "+38%",
      badge: "LIMITED"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Simplified background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 animate-bounce animation-delay-300">
          <Diamond className="h-5 w-5 text-purple-400 opacity-40" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce animation-delay-900">
          <Star className="h-6 w-6 text-yellow-400 opacity-40" />
        </div>
        <div className="absolute bottom-32 right-20 animate-bounce animation-delay-600">
          <Sparkles className="h-5 w-5 text-pink-400 opacity-40" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 rounded-full px-6 py-3 mb-6 border border-orange-200">
            <Crown className="h-5 w-5 text-orange-600" />
            <span className="font-semibold">LUXURY COLLECTIONS</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Shop by
            <span className="block text-orange-600">
              Category
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our meticulously curated collections, each designed to elevate your lifestyle 
            with uncompromising quality and timeless elegance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`group relative ${category.bgColor} rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-200 overflow-hidden`}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                {category.badge}
              </div>

              {/* Trending indicator */}
              <div className="absolute top-4 left-4 flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                <TrendingUp className="h-3 w-3" />
                <span>{category.trend}</span>
              </div>

              <div className="relative z-10 pt-6">
                <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors whitespace-nowrap">
                  {category.title}
                </h3>
                
                <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                  {category.description}
                </p>

                <Button 
                  className={`w-full ${category.color} text-white hover:opacity-90 transition-all duration-300 rounded-full font-semibold py-3`}
                >
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
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
            className="px-12 py-4 text-lg rounded-full border-2 border-gray-400 hover:border-yellow-500 hover:text-yellow-600 transition-all duration-300 font-semibold bg-white shadow-lg"
          >
            <Crown className="mr-3 h-5 w-5" />
            View All Collections
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
