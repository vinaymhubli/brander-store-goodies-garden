
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, CheckCircle, ArrowLeft } from "lucide-react";
import { useParams, Navigate, Link } from "react-router-dom";
import { products } from "@/data/products";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { items, addItem } = useCartStore();
  const { toast } = useToast();

  // Get featured products from FeaturedProducts component
  const featuredProducts = [
    {
      id: 1,
      name: "Twist & Shine Hairpin",
      price: 399,
      originalPrice: 799,
      rating: 5.0,
      reviews: 487,
      image: "/lovable-uploads/0e47b206-5348-4675-8404-0969b160c876.png",
      category: "Hair Accessories",
      description: "Add a graceful twist to your hairdo with this sleek metallic hairpin. Perfect for both casual buns and elegant updos."
    },
    {
      id: 2,
      name: "Elegance Pearl Hairclip",
      price: 499,
      originalPrice: 899,
      rating: 5.0,
      reviews: 203,
      image: "/lovable-uploads/9c745f4d-f750-4284-a540-39dd602c2848.png",
      category: "Hair Accessories",
      description: "A timeless hair accessory featuring faux pearls and a golden finish. Ideal for formal events or adding charm to your daily look."
    },
    {
      id: 4,
      name: "Bold Bloom Hairclip",
      price: 1199.99,
      originalPrice: 1699.99,
      rating: 5.0,
      reviews: 142,
      image: "/lovable-uploads/878e4c65-0f31-41e4-a08d-901d3c4b56e9.png",
      category: "Hair Accessories", 
      description: "Make a statement with this vibrant floral clip, designed to hold thick hair while adding a touch of playful boldness."
    }
  ];

  const product = featuredProducts.find(p => p.id === Number(id)) || products.find(p => p.id === Number(id));

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
      
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/shop">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="w-full">
            <div className="aspect-square overflow-hidden rounded-lg bg-white">
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
          </div>

          {/* Product Details */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-base sm:text-lg text-gray-600 mb-4">{product.category}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
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

              <p className="text-3xl sm:text-4xl font-bold text-purple-600 mb-4 sm:mb-6">₹{product.price}</p>
            </div>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-3">Product Description</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{product.description}</p>
              </CardContent>
            </Card>

            <div className="space-y-4 sticky bottom-0 bg-gray-50 p-4 sm:p-0 sm:bg-transparent sm:static">
              {isInCart ? (
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 text-base sm:text-lg"
                  onClick={() => window.location.href = '/cart'}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Go to Cart & Checkout
                </Button>
              ) : (
                <Button 
                  onClick={handleAddToCart} 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 sm:py-4 text-base sm:text-lg"
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
