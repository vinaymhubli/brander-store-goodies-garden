
import { ShoppingCart, Search, User, Menu, Heart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 group">
            <img 
              src="/lovable-uploads/a7e71e82-81bb-47bd-baf0-7c00f71b9133.png" 
              alt="Brandter E-commerce Store" 
              className="h-12 w-auto group-hover:scale-105 transition-transform duration-300 filter drop-shadow-md"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              <a href="#" className="relative text-gray-800 hover:text-purple-600 px-4 py-2 font-medium transition-all duration-300 group">
                Kitchen & Food
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <a href="#" className="relative text-gray-800 hover:text-purple-600 px-4 py-2 font-medium transition-all duration-300 group">
                Luxury Jewelry
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <a href="#" className="relative text-gray-800 hover:text-purple-600 px-4 py-2 font-medium transition-all duration-300 group">
                Collections
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <a href="#" className="relative text-gray-800 hover:text-purple-600 px-4 py-2 font-medium transition-all duration-300 group">
                About Us
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 rounded-full relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-2 w-2"></span>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-green-50 hover:text-green-600 transition-all duration-300 rounded-full">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 rounded-full">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                2
              </span>
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/98 backdrop-blur-xl shadow-lg rounded-b-2xl">
            <div className="px-4 py-6 space-y-4">
              <a href="#" className="block px-4 py-3 font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300">
                Kitchen & Food
              </a>
              <a href="#" className="block px-4 py-3 font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300">
                Luxury Jewelry
              </a>
              <a href="#" className="block px-4 py-3 font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300">
                Collections
              </a>
              <a href="#" className="block px-4 py-3 font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300">
                About Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
