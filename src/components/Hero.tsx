
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles, Award, Shield, Crown, Gem, Zap } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const heatMatProduct = {
      id: 999, // Special ID for Heat Mat Pro
      name: "Heat Mat Pro - Food Heating Pad",
      price: 4999,
      image: "/lovable-uploads/84e3fe74-3fe5-4aa1-b8f7-c02c0b8b19a1.png",
    };

    console.log('Add to cart clicked for Heat Mat Pro');
    try {
      addItem(heatMatProduct);
      
      toast({
        title: "Added to cart",
        description: `${heatMatProduct.name} has been added to your cart.`,
      });
      console.log('Heat Mat Pro successfully added to cart');
    } catch (error) {
      console.error('Error adding Heat Mat Pro to cart:', error);
    }
  };

  const handleShopNow = () => {
    navigate('/shop');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  const handleProductClick = () => {
    navigate('/product/999');
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image with Zoom Animation */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat animate-zoom-in"
          style={{
            backgroundImage: `url('/lovable-uploads/7c9872de-4a65-4cdd-a731-46c007c1a429.png')`
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 md:top-20 md:left-20 w-48 h-48 md:w-72 md:h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-48 h-48 md:w-72 md:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 md:top-32 md:left-1/4 animate-bounce animation-delay-300">
          <Crown className="h-4 w-4 md:h-6 md:w-6 text-yellow-400 opacity-60" />
        </div>
        <div className="absolute top-32 right-1/4 md:top-48 md:right-1/4 animate-bounce animation-delay-900">
          <Gem className="h-4 w-4 md:h-5 md:w-5 text-purple-400 opacity-60" />
        </div>
        <div className="absolute bottom-24 left-1/3 md:bottom-32 md:left-1/3 animate-bounce animation-delay-600">
          <Sparkles className="h-4 w-4 md:h-6 md:w-6 text-pink-400 opacity-60" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-32 pb-12 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in text-center lg:text-left">
            <div className="space-y-4 md:space-y-6">
              {/* Premium Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-3 py-2 md:px-4 md:py-2 border border-white/20">
                <Crown className="h-3 w-3 md:h-4 md:w-4 text-yellow-400" />
                <span className="text-xs md:text-sm text-white font-semibold">PREMIUM KITCHEN TECH</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-2 w-2 md:h-3 md:w-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="block text-orange-400">
                  HEAT MAT
                </span>
                <span className="block text-purple-400">
                  PRO
                </span>
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-200 font-normal mt-1 md:mt-2">
                  Food Heating Pad
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Keep your meals perfectly warm with our 
                <span className="text-yellow-400 font-medium"> adjustable temperature technology</span>. 
                Features built-in timer, child lock safety, and 
                <span className="text-purple-400 font-medium"> compact portable design</span> 
                for modern kitchens.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center lg:justify-start">
              <Button 
                onClick={handleShopNow}
                size="lg" 
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-6 md:px-8 py-3 rounded-full shadow-lg transition-all duration-300"
              >
                <Crown className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button 
                onClick={handleLearnMore}
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto px-6 md:px-8 py-3 rounded-full bg-white/90 text-slate-900 hover:bg-white hover:text-slate-900 border-white shadow-lg transition-all duration-300 font-semibold"
              >
                <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-yellow-400 mb-1">15K+</div>
                <div className="text-xs md:text-sm text-gray-300">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-purple-400 mb-1">2 Year</div>
                <div className="text-xs md:text-sm text-gray-300">Warranty</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-pink-400 mb-1">24/7</div>
                <div className="text-xs md:text-sm text-gray-300">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product showcase */}
          <div className="relative animate-fade-in animation-delay-300 mt-8 lg:mt-0">
            <div className="relative group">
              {/* Product card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 md:p-8 border border-white/20 shadow-xl transform hover:scale-105 transition-all duration-500">
                <div className="cursor-pointer" onClick={handleProductClick}>
                  <img 
                    src="/lovable-uploads/84e3fe74-3fe5-4aa1-b8f7-c02c0b8b19a1.png" 
                    alt="Heat Mat Pro - Food Heating Pad" 
                    className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 
                      className="text-lg md:text-xl font-bold text-white cursor-pointer hover:text-purple-200 transition-colors"
                      onClick={handleProductClick}
                    >
                      Heat Mat Pro - Food Heating Pad
                    </h3>
                    <div className="flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-400/40">
                      <Shield className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                      <span className="text-green-400 text-xs font-semibold">SAFE</span>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                    Adjustable temperature electric food warmer with compact portable design, built-in timer and child lock safety features.
                  </p>
                  <div className="flex items-center justify-between pt-3 md:pt-4">
                    <div className="space-y-1">
                      <div className="text-xl md:text-2xl font-bold text-yellow-400">₹4999</div>
                      <div className="text-base md:text-lg text-gray-400 line-through">₹7999</div>
                    </div>
                    <Button 
                      onClick={handleAddToCart}
                      className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-4 md:px-6 py-2 font-semibold text-sm md:text-base"
                    >
                      <Zap className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 bg-red-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg">
                31% OFF
              </div>
              <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-blue-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg">
                FREE SHIPPING
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-auto">
          <path d="M0 120L1440 120L1440 0C1440 0 1200 80 720 80C240 80 0 0 0 0V120Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};
