
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles, Award, Shield } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              {/* Premium Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Award className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-white font-medium">Premium Quality Guaranteed</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Luxury
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Redefined
                </span>
                <span className="block text-4xl lg:text-5xl text-gray-300 font-light">
                  For Modern Living
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Discover an exclusive collection of premium kitchenware and exquisite jewelry. 
                Where craftsmanship meets innovation, and every piece tells a story of excellence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                <Sparkles className="mr-2 h-5 w-5" />
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 rounded-full border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                Watch Our Story
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-sm text-gray-400">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-gray-400">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-400">Expert Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Product Showcase */}
          <div className="relative animate-fade-in animation-delay-300">
            <div className="relative group">
              {/* Main product card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-700 hover:rotate-1">
                <img 
                  src="/lovable-uploads/b9939234-d571-4c99-9503-c34008224ce6.png" 
                  alt="Premium Kitchen Collection" 
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      Elite Cookware Collection
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Shield className="h-5 w-5 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">Certified</span>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Professional-grade cookware designed for culinary excellence. 
                    Compatible with all cooking surfaces including induction.
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-white">$399.99</div>
                      <div className="text-lg text-gray-400 line-through">$599.99</div>
                    </div>
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-full px-8">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg animate-bounce">
                33% OFF
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                Free Shipping
              </div>
              <div className="absolute top-1/2 -right-12 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg transform rotate-12">
                Limited Edition
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L1440 120L1440 0C1440 0 1200 80 720 80C240 80 0 0 0 0V120Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};
