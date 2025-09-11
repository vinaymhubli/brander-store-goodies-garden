
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useWishlist } from "@/hooks/useWishlist";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { items, loading, removeItem } = useWishlist();
  const { addItem } = useCartStore();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  const handleRemoveFromWishlist = async (id: string) => {
    await removeItem(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">Save items for later</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <Heart className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6 px-4">Start adding items you love to your wishlist</p>
            <Link to="/shop">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">{item.name}</h3>
                  <p className="text-lg sm:text-xl font-bold text-purple-600 mb-3 sm:mb-4">₹{item.price}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Link to={`/product/${item.id}`}>
                      <Button variant="outline" className="w-full sm:w-auto text-sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
