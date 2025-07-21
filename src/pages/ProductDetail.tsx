
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, CheckCircle } from "lucide-react";
import { useParams, Navigate } from "react-router-dom";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { items, addItem } = useCartStore();
  const { toast } = useToast();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const isInCart = items.some(item => item.id === product.id);

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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Image failed to load:', product.image);
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{product.category}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-4xl font-bold text-purple-600 mb-6">₹{product.price}</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {isInCart ? (
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.location.href = '/cart'}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Go to Cart & Checkout
                </Button>
              ) : (
                <Button 
                  onClick={handleAddToCart} 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
