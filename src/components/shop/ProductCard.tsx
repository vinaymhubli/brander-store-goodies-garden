
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlist } from "@/hooks/useWishlist";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Tables<"products">;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const handleAddToCart = () => {
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: Number(product.selling_price || product.price),
        image: product.image_url || '/placeholder.svg',
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleWishlistToggle = async () => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: Number(product.selling_price || product.price),
      image: product.image_url || '/placeholder.svg',
    };

    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(wishlistItem);
    }
  };

  const sellingPrice = product.selling_price;
  const originalPrice = product.price;
  const hasDiscount = product.selling_price && product.selling_price < product.price;
  const discountPercentage = hasDiscount ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100) : 0;

  return (
    <Card className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-0">
      <CardContent className="p-0 relative">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <Link to={`/product/${product.id}`}>
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
          </Link>
          
          {/* Discount Badge */}
          {hasDiscount && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0 shadow-lg">
              {discountPercentage}% OFF
            </Badge>
          )}
          
          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="secondary"
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full shadow-lg transition-all duration-200 ${
              isInWishlist(product.id)
                ? "bg-red-100 hover:bg-red-200 text-red-600"
                : "bg-white/90 hover:bg-white"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${
                isInWishlist(product.id) ? "fill-current" : ""
              }`}
            />
          </Button>
          
          {/* Quick View Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
            <Link to={`/product/${product.id}`}>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white shadow-lg"
              >
                <Eye className="h-4 w-4 mr-2" />
                Quick View
              </Button>
            </Link>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < 5 ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">(4.8)</span>
          </div>

          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ₹{sellingPrice}
              </span>
              {hasDiscount && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{originalPrice}
                </span>
              )}
            </div>
            {hasDiscount && (
              <div className="text-green-600 font-medium text-sm">
                Save ₹{(originalPrice - sellingPrice).toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
