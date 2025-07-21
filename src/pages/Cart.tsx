
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cartStore";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.3);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.2);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div 
            className={`text-center py-16 transition-all duration-1000 ${
              headerVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
            <Link to="/shop">
              <Button className="bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-300">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 
          ref={headerRef}
          className={`text-3xl font-bold text-gray-900 mb-8 transition-all duration-1000 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          Shopping Cart
        </h1>
        
        <div 
          ref={contentRef}
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <Card 
                key={item.id}
                className={`transition-all duration-700 hover:shadow-lg ${
                  contentVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-10'
                }`}
                style={{
                  transitionDelay: contentVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded transition-transform duration-300 hover:scale-110"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-purple-600 font-bold">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-3 py-1 border rounded">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div>
            <Card className={`transition-all duration-1000 delay-500 ${
              contentVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-300">
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full mt-2 hover:scale-105 transition-transform duration-300"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
