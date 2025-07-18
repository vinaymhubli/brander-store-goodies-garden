
import { ShoppingCart, Search, User, Menu, Heart, Bell, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-xl shadow-2xl border-b-2 border-gradient-to-r from-yellow-200 via-purple-200 to-pink-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Premium Logo */}
          <div className="flex-shrink-0 group">
            <img 
              src="/lovable-uploads/a7e71e82-81bb-47bd-baf0-7c00f71b9133.png" 
              alt="Brandter E-commerce Store" 
              className="h-16 w-auto group-hover:scale-110 transition-transform duration-300 filter drop-shadow-xl"
            />
          </div>

          {/* Ultra Premium Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-12">
              <a href="#" className="relative text-gray-800 hover:text-purple-600 px-6 py-3 text-lg font-bold transition-all duration-500 group transform hover:scale-110">
                <Crown className="inline h-5 w-5 mr-2 text-yellow-500" />
                Kitchen & Food
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></span>
              </a>
              <a href="#" className="relative text-gray-800 hover:text-purple-600 px-6 py-3 text-lg font-bold transition-all duration-500 group transform hover:scale-110">
                <Sparkles className="inline h-5 w-5 mr-2 text-purple-500" />
                Luxury Jewelry
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></span>
              </a>
              <a href="#" className="relative text-gray-800 hover:text-purple-600 px-6 py-3 text-lg font-bold transition-all duration-500 group transform hover:scale-110">
                Collections
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></span>
              </a>
              <a href="#" className="relative text-gray-800 hover:text-purple-600 px-6 py-3 text-lg font-bold transition-all duration-500 group transform hover:scale-110">
                About Us
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></span>
              </a>
            </div>
          </div>

          {/* Ultra Premium Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 rounded-full transform hover:scale-125 shadow-lg hover:shadow-purple-200">
              <Search className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 rounded-full relative transform hover:scale-125 shadow-lg hover:shadow-pink-200">
              <Heart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-black shadow-lg animate-pulse">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 rounded-full relative transform hover:scale-125 shadow-lg hover:shadow-blue-200">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full h-3 w-3 animate-ping"></span>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-green-50 hover:text-green-600 transition-all duration-300 rounded-full transform hover:scale-125 shadow-lg hover:shadow-green-200">
              <User className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 rounded-full transform hover:scale-125 shadow-lg hover:shadow-purple-200">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white text-sm rounded-full h-7 w-7 flex items-center justify-center font-black shadow-xl animate-bounce">
                2
              </span>
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 rounded-full transform hover:scale-125 shadow-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Ultra Premium Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t-2 border-gradient-to-r from-purple-200 to-pink-200 bg-white/98 backdrop-blur-xl shadow-2xl rounded-b-3xl">
            <div className="px-6 py-8 space-y-6">
              <a href="#" className="flex items-center px-6 py-4 text-xl font-bold text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-200">
                <Crown className="h-6 w-6 mr-4 text-yellow-500" />
                Kitchen & Food
              </a>
              <a href="#" className="flex items-center px-6 py-4 text-xl font-bold text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-200">
                <Sparkles className="h-6 w-6 mr-4 text-purple-500" />
                Luxury Jewelry
              </a>
              <a href="#" className="flex items-center px-6 py-4 text-xl font-bold text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-200">
                Collections
              </a>
              <a href="#" className="flex items-center px-6 py-4 text-xl font-bold text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-200">
                About Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
