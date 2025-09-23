import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart, CheckCircle, ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { useProductSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/integrations/supabase/types";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { cartItems, addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) throw new Error('Product ID is required');
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name,
            description
          )
        `)
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data as Tables<"products"> & {
        categories: { name: string; description: string | null } | null;
      };
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-6 bg-muted rounded w-1/4"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return <Navigate to="/shop" replace />;
  }

  // Update SEO for product page
  useProductSEO({
    id: parseInt(product.id),
    name: product.name,
    price: Number(product.selling_price || product.price),
    description: product.description || `Premium ${product.name} from Brander Store. High-quality product with excellent customer ratings.`,
    image: product.image_url || '/placeholder.svg',
    category: product.categories?.name || 'Products',
    rating: 4.5, // You might want to fetch actual ratings from your database
    reviews: Math.floor(Math.random() * 100) + 10, // You might want to fetch actual review count
  });

  const isInCart = cartItems.some((item: any) => item.product_id === product.id);
  const discountPercentage = product.selling_price && product.selling_price < product.price 
    ? Math.round(((product.price - product.selling_price) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    try {
      addToCart(product);
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product.stock_quantity || 10)) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          {product.categories && (
            <>
              <span className="hover:text-foreground transition-colors">{product.categories.name}</span>
              <span>/</span>
            </>
          )}
          <span className="text-foreground font-medium">{product.name}</span>
        </div>
        
        <Link to="/shop">
          <Button variant="ghost" className="mt-2 -ml-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-card border">
              <img
                src={product.image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.categories && (
                <Badge variant="secondary" className="mb-3">
                  {product.categories.name}
                </Badge>
              )}
              
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
                {product.name}
              </h1>
              
              {/* Price Section */}
              <div className="flex items-center gap-4 mb-6">
                {product.selling_price && product.selling_price < product.price ? (
                  <>
                    <span className="text-4xl font-bold text-primary">
                      ₹{Number(product.selling_price).toLocaleString()}
                    </span>
                    <span className="text-2xl text-muted-foreground line-through">
                      ₹{Number(product.price).toLocaleString()}
                    </span>
                    <Badge variant="destructive">
                      {discountPercentage}% OFF
                    </Badge>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-primary">
                    ₹{Number(product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                {product.stock_quantity > 0 ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">
                      In Stock ({product.stock_quantity} available)
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Description */}
            {product.description && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Product Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= (product.stock_quantity || 10)}
                  className="h-10 w-10"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {isInCart ? (
                <Button 
                  size="lg"
                  className="w-full h-14 text-lg"
                  variant="secondary"
                  onClick={() => window.location.href = '/cart'}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Go to Cart & Checkout
                </Button>
              ) : (
                <Button 
                  onClick={handleAddToCart} 
                  size="lg"
                  className="w-full h-14 text-lg"
                  disabled={product.stock_quantity <= 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              )}
              
              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Truck className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-muted-foreground">On orders above ₹999</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-muted-foreground">100% secure checkout</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <RotateCcw className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-muted-foreground">7-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;