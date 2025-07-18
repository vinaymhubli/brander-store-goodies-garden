
import { ChefHat, Gem, Utensils, Sparkles, ArrowRight, TrendingUp, Award, Crown, Star, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProductCategories = () => {
  const categories = [
    {
      icon: ChefHat,
      title: "Master Chef Collection",
      description: "Professional-grade culinary tools crafted for gastronomic excellence and culinary mastery",
      items: "300+ Premium Products",
      color: "from-orange-600 via-red-600 to-pink-600",
      bgColor: "bg-gradient-to-br from-orange-50 via-red-50 to-pink-50",
      iconBg: "bg-gradient-to-r from-orange-600 via-red-600 to-pink-600",
      trend: "+35%",
      badge: "BESTSELLER"
    },
    {
      icon: Utensils,
      title: "Royal Dining Experience",
      description: "Sophisticated tableware and serving accessories for the most distinguished dining occasions",
      items: "250+ Luxury Items",
      color: "from-emerald-600 via-teal-600 to-cyan-600",
      bgColor: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50",
      iconBg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600",
      trend: "+42%",
      badge: "PREMIUM"
    },
    {
      icon: Gem,
      title: "Imperial Jewelry",
      description: "Handcrafted masterpieces featuring the finest precious metals and rare gemstones from around the world",
      items: "150+ Exclusive Pieces",
      color: "from-purple-600 via-violet-600 to-indigo-600",
      bgColor: "bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50",
      iconBg: "bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600",
      trend: "+58%",
      badge: "EXCLUSIVE"
    },
    {
      icon: Crown,
      title: "Luxury Lifestyle",
      description: "Curated accessories and lifestyle products for the most discerning connoisseurs of luxury",
      items: "120+ Designer Items",
      color: "from-yellow-600 via-amber-600 to-orange-600",
      bgColor: "bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50",
      iconBg: "bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600",
      trend: "+38%",
      badge: "LIMITED"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-slate-50 relative overflow-hidden">
      {/* Ultra Premium background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating luxury elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 animate-bounce animation-delay-300">
          <Diamond className="h-6 w-6 text-purple-400 opacity-60" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce animation-delay-900">
          <Star className="h-8 w-8 text-yellow-400 opacity-60" />
        </div>
        <div className="absolute bottom-32 right-20 animate-bounce animation-delay-600">
          <Sparkles className="h-7 w-7 text-pink-400 opacity-60" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 text-orange-800 rounded-full px-8 py-4 mb-8 border-2 border-yellow-400/30 shadow-xl backdrop-blur-sm">
            <Crown className="h-6 w-6 text-yellow-600" />
            <span className="text-lg font-black tracking-wide">CURATED LUXURY COLLECTIONS</span>
          </div>
          <h2 className="text-6xl lg:text-8xl font-black text-gray-900 mb-8 leading-none">
            Shop by
            <span className="block bg-gradient-to-r from-yellow-600 via-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Discover our meticulously curated collections, each designed to elevate your lifestyle 
            with uncompromising quality, timeless elegance, and extraordinary craftsmanship that defines true luxury.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`group relative ${category.bgColor} rounded-3xl p-10 hover:shadow-2xl transition-all duration-700 hover:scale-110 border-2 border-white/60 backdrop-blur-sm overflow-hidden transform hover:-rotate-1`}
            >
              {/* Ultra premium background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Premium badge */}
              <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-black shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                {category.badge}
              </div>

              {/* Trending indicator */}
              <div className="absolute top-6 left-6 flex items-center space-x-2 bg-green-500/20 text-green-800 px-3 py-2 rounded-full text-sm font-bold backdrop-blur-sm border border-green-400/40">
                <TrendingUp className="h-4 w-4" />
                <span>{category.trend}</span>
              </div>

              <div className="relative z-10 pt-8">
                <div className={`${category.iconBg} w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-125 transition-transform duration-500 group-hover:rotate-12`}>
                  <category.icon className="h-10 w-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-gray-800 transition-colors leading-tight">
                  {category.title}
                </h3>
                
                <p className="text-gray-700 mb-8 text-base leading-relaxed font-medium">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-black text-gray-800 bg-white/80 px-4 py-2 rounded-full shadow-lg border border-gray-200">
                    {category.items}
                  </span>
                </div>

                <Button 
                  className={`w-full bg-gradient-to-r ${category.color} text-white hover:shadow-2xl transition-all duration-500 rounded-full group-hover:scale-110 text-lg font-bold py-4 border-2 border-white/30`}
                >
                  Explore Collection
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Ultra Premium call to action */}
        <div className="text-center mt-20">
          <Button 
            variant="outline" 
            size="lg" 
            className="px-16 py-6 text-xl rounded-full border-4 border-gray-400 hover:border-yellow-500 hover:text-yellow-600 transition-all duration-500 hover:scale-110 font-black bg-white/80 backdrop-blur-sm shadow-2xl hover:shadow-yellow-500/25"
          >
            <Crown className="mr-4 h-6 w-6" />
            View All Luxury Collections
            <ArrowRight className="ml-4 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};
