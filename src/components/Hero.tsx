
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Star, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Hero = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2);
  const { ref: buttonRef, isVisible: buttonVisible } = useScrollAnimation(0.3);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-32 animate-bounce animation-delay-300">
          <Star className="h-6 w-6 text-yellow-400" />
        </div>
        <div className="absolute top-64 right-48 animate-bounce animation-delay-600">
          <Sparkles className="h-5 w-5 text-purple-400" />
        </div>
        <div className="absolute bottom-32 right-32 animate-bounce animation-delay-900">
          <ShoppingBag className="h-6 w-6 text-blue-400" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div 
          ref={heroRef}
          className={`transition-all duration-1000 ${
            heroVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 rounded-full px-6 py-3 mb-8 border border-purple-200 shadow-lg">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="font-semibold text-sm">LUXURY REDEFINED</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Discover
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in animation-delay-300">
              Exquisite
            </span>
            <span className="block animate-fade-in animation-delay-600">
              Luxury
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
            heroVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-5'
          }`}>
            Immerse yourself in a world of unparalleled craftsmanship, where every piece tells a story of elegance, sophistication, and timeless beauty.
          </p>
        </div>

        <div 
          ref={buttonRef}
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-500 ${
            buttonVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Button 
            size="lg" 
            className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingBag className="mr-3 h-5 w-5 group-hover:animate-pulse" />
            Explore Collection
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="group px-12 py-4 text-lg rounded-full border-2 border-gray-300 hover:border-purple-500 hover:text-purple-600 transition-all duration-300 bg-white shadow-lg hover:shadow-xl"
          >
            Learn More
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Stats section */}
        <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-700 ${
          buttonVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Luxury Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">25+</div>
            <div className="text-gray-600">Years Excellence</div>
          </div>
        </div>
      </div>
    </section>
  );
};
