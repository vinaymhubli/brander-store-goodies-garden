import {
  ShoppingCart,
  Search,
  User,
  Menu,
  Heart,
  Bell,
  LogOut,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/hooks/useWishlist";
import { useCartCountStore } from "@/store/cartCountStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut, profile } = useAuth();
  const { toast } = useToast();
  const { cartItems } = useCart();
  const { cartItemCount } = useCartCountStore();

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
      navigate("/");
    }
  };

  return (
    <nav className="bg-white sticky top-0 z-[99]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <img
              src="/lovable-uploads/a7e71e82-81bb-47bd-baf0-7c00f71b9133.png"
              alt="Brandter E-commerce Store"
              className="h-12 w-auto group-hover:scale-105 transition-transform duration-300 filter drop-shadow-md"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="relative text-gray-800 hover:text-purple-600 px-4 py-2 font-medium transition-all duration-300 group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                to="/shop"
                className="relative text-gray-800 hover:text-purple-600 px-4 py-2 font-medium transition-all duration-300 group"
              >
                Shop
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                to="/contact"
                className="relative text-gray-800 hover:text-purple-600 px-4 py-2 font-medium transition-all duration-300 group"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                to="/about"
                className="relative text-gray-800 hover:text-purple-600 px-4 py-2 font-medium transition-all duration-300 group"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                to="/track-order"
                className="relative text-gray-800 hover:text-purple-600 px-4 py-2 font-medium transition-all duration-300 group"
              >
                Track Order
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>

          {/* Desktop Right side icons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 rounded-full relative"
              onClick={handleWishlistClick}
            >
              <Heart className="h-5 w-5" />
              {/* {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )} */}
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-green-50 hover:text-green-600 transition-all duration-300 rounded-full"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">
                      {profile?.full_name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/my-orders")}>
                    <Package className="h-4 w-4 mr-2" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-green-50 hover:text-green-600 transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
                <span className="text-gray-400">or</span>
                <span className="text-sm text-gray-600">Shop as Guest</span>
              </div>
            )}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 rounded-full"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/98 backdrop-blur-xl shadow-lg rounded-b-2xl">
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Links */}
              <Link
                to="/"
                className="block px-4 py-3 font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="block px-4 py-3 font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
              >
                Shop
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-3 font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className="block px-4 py-3 font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
              >
                About Us
              </Link>
              <Link
                to="/track-order"
                className="block px-4 py-3 font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
              >
                Track Order
              </Link>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Mobile Action Items */}
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-3 hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 rounded-xl relative"
                  onClick={handleWishlistClick}
                >
                  <Heart className="h-5 w-5 mr-3" />
                  Wishlist
                  {/* {wishlistCount > 0 && (
                    <span className="absolute right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {wishlistCount}
                    </span>
                  )} */}
                </Button>

                {user ? (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-4 py-3 hover:bg-green-50 hover:text-green-600 transition-all duration-300 rounded-xl"
                      onClick={() => navigate("/my-orders")}
                    >
                      <Package className="h-5 w-5 mr-3" />
                      My Orders
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-4 py-3 hover:bg-red-50 hover:text-red-600 transition-all duration-300 rounded-xl"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" className="block">
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-3 hover:bg-green-50 hover:text-green-600 transition-all duration-300 rounded-xl"
                      >
                        <User className="h-5 w-5 mr-3" />
                        Sign In
                      </Button>
                    </Link>
                    <div className="text-center text-sm text-gray-500">
                      or continue as guest
                    </div>
                  </div>
                )}

                <Link to="/cart" className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-3 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 rounded-xl relative"
                  >
                    <ShoppingCart className="h-5 w-5 mr-3" />
                    Cart
                    {cartItemCount > 0 && (
                      <span className="absolute right-4 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
