
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { useCartStore } from "@/store/cartStore";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Tables<"products">;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore();
  const { toast } = useToast();

  console.log('ProductCard rendering for product:', product.name);

  const handleAddToCart = () => {
    console.log('Add to cart clicked for:', product.name);
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
      console.log('Item successfully added to cart and toast shown');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <img
              src={product.image_url || '/placeholder.svg'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.error('Image failed to load:', product.image_url);
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
        </Link>
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col">
              {product.selling_price && product.selling_price < product.price ? (
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-primary">₹{product.selling_price}</p>
                  <p className="text-lg text-muted-foreground line-through">₹{product.price}</p>
                </div>
              ) : (
                <p className="text-2xl font-bold text-primary">₹{product.price}</p>
              )}
            </div>
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
