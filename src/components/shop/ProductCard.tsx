
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
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
        price: product.price,
        image: product.image,
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
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.error('Image failed to load:', product.image);
                e.currentTarget.src = '/placeholder.svg';
              }}
              onLoad={() => console.log('Image loaded successfully:', product.image)}
            />
          </div>
        </Link>
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 hover:text-purple-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">${product.price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
