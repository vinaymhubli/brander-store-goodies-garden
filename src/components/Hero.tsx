
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles, Award, Shield, Crown, Gem, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 via-indigo-900 to-slate-900 overflow-hidden">
      {/* Ultra Premium Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-600"></div>
      </div>

      {/* Floating luxury elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-1/4 animate-bounce animation-delay-300">
          <Crown className="h-8 w-8 text-yellow-400 opacity-70" />
        </div>
        <div className="absolute top-48 right-1/4 animate-bounce animation-delay-900">
          <Gem className="h-6 w-6 text-purple-400 opacity-70" />
        </div>
        <div className="absolute bottom-32 left-1/3 animate-bounce animation-delay-600">
          <Sparkles className="h-7 w-7 text-pink-400 opacity-70" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center min-h-[80vh]">
          {/* Left Content - Enhanced */}
          <div className="space-y-10 animate-fade-in">
            <div className="space-y-8">
              {/* Ultra Premium Badge */}
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-full px-6 py-3 border border-yellow-400/30 shadow-2xl">
                <Crown className="h-5 w-5 text-yellow-400" />
                <span className="text-sm text-white font-bold tracking-wide">ULTRA PREMIUM COLLECTION</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-none tracking-tight">
                <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
                  LUXURY
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-pulse animation-delay-300">
                  REDEFINED
                </span>
                <span className="block text-5xl lg:text-6xl text-gray-200 font-light mt-4 tracking-wider">
                  Beyond Excellence
                </span>
              </h1>
              
              <p className="text-2xl text-gray-200 leading-relaxed max-w-2xl font-light">
                Experience the pinnacle of craftsmanship with our exclusive collection of 
                <span className="text-yellow-400 font-medium"> premium kitchenware</span> and 
                <span className="text-purple-400 font-medium"> exquisite jewelry</span>. 
                Where every piece tells a story of unparalleled luxury.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 hover:from-yellow-700 hover:via-orange-700 hover:to-red-700 text-white text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-500 transform hover:scale-110 border-2 border-yellow-400/30">
                <Crown className="mr-3 h-6 w-6" />
                Explore Luxury Collection
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button variant="outline" size="lg" className="text-xl px-12 py-6 rounded-full border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-white/60">
                <Sparkles className="mr-3 h-6 w-6" />
                Our Heritage Story
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t-2 border-gradient-to-r from-yellow-400/30 via-purple-400/30 to-pink-400/30">
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-black text-yellow-400 mb-2 group-hover:animate-pulse">50K+</div>
                <div className="text-sm text-gray-300 font-medium">Elite Customers</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-black text-purple-400 mb-2 group-hover:animate-pulse">1000+</div>
                <div className="text-sm text-gray-300 font-medium">Luxury Products</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-black text-pink-400 mb-2 group-hover:animate-pulse">24/7</div>
                <div className="text-sm text-gray-300 font-medium">Concierge Service</div>
              </div>
            </div>
          </div>

          {/* Right Content - Ultra Premium Product Showcase */}
          <div className="relative animate-fade-in animation-delay-300">
            <div className="relative group">
              {/* Main luxury product card */}
              <div className="bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-2xl rounded-3xl p-10 border-2 border-white/30 shadow-2xl transform hover:scale-105 transition-all duration-700 hover:rotate-1 relative overflow-hidden">
                {/* Animated border */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 rounded-3xl opacity-30 animate-pulse"></div>
                <div className="relative z-10">
                  <img 
                    src="/lovable-uploads/b9939234-d571-4c99-9503-c34008224ce6.png" 
                    alt="Premium Kitchen Collection" 
                    className="w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="mt-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-black text-white">
                        Royal Elite Cookware
                      </h3>
                      <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-400/40">
                        <Shield className="h-5 w-5 text-green-400" />
                        <span className="text-green-400 text-sm font-bold">CERTIFIED LUXURY</span>
                      </div>
                    </div>
                    <p className="text-gray-200 leading-relaxed text-lg">
                      Master chef's choice featuring premium materials and lifetime craftsmanship warranty. 
                      Compatible with all cooking surfaces including professional induction systems.
                    </p>
                    <div className="flex items-center justify-between pt-6">
                      <div className="space-y-2">
                        <div className="text-4xl font-black text-yellow-400">$899.99</div>
                        <div className="text-xl text-gray-400 line-through">$1,299.99</div>
                        <div className="text-green-400 font-bold">Save $400</div>
                      </div>
                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-full px-10 py-4 text-lg font-bold transform hover:scale-110 transition-all duration-300 shadow-xl">
                        <Zap className="mr-2 h-5 w-5" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Ultra Premium floating elements */}
              <div className="absolute -top-8 -left-8 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-black shadow-2xl animate-bounce">
                50% OFF
              </div>
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-black shadow-2xl">
                FREE WORLDWIDE SHIPPING
              </div>
              <div className="absolute top-1/2 -right-16 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-black shadow-2xl transform rotate-12 animate-pulse">
                EXCLUSIVE EDITION
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path d="M0 120L1440 120L1440 0C1440 0 1200 80 720 80C240 80 0 0 0 0V120Z" fill="url(#waveGradient)"/>
        </svg>
      </div>
    </section>
  );
};
