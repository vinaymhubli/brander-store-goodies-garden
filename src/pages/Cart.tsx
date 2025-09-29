
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useSEO } from "@/hooks/useSEO";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Shield, Truck, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  useSEO({
    title: 'Shopping Cart - Brander Store',
    description: 'Review your selected hair accessories and kitchen appliances in your shopping cart. Secure checkout with fast delivery.',
    keywords: ['shopping cart', 'cart', 'checkout', 'hair accessories', 'kitchen appliances'],
    type: 'website',
  });
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleProceedToCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    navigate('/checkout');
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart`,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mx-auto w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-8">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Start shopping to find amazing products!
            </p>
            <Link to="/shop">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</p>
        </div>
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Secure Checkout</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            <Truck className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Free Shipping</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            <ShoppingBag className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Premium Quality</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src={item.products.image_url || '/placeholder.svg'}
                        alt={item.products.name}
                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.products.name}</h3>
                      <p className="text-2xl font-bold text-purple-600 mb-3">₹{item.products.selling_price || item.products.price}</p>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 font-medium">Quantity:</span>
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-white"
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 py-1 bg-white rounded font-semibold text-gray-900 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-white"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900 mb-2">
                        ₹{((item.products.selling_price || item.products.price) * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600"
                        onClick={() => handleRemoveItem(item.id, item.products.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div>
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm sticky top-4">
              <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span className="font-medium">Subtotal ({cartItems.length} items)</span>
                      <span className="font-semibold">₹{getTotalPrice().toFixed(2)}</span>
                    </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  {/* <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Tax (GST)</span>
                    <span className="font-semibold">Calculated at checkout</span>
                  </div> */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-purple-600">₹{getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 mb-3"
                >
                  <span className="flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 mb-4"
                  onClick={() => {
                    clearCart();
                    toast({
                      title: "Cart Cleared",
                      description: "All items have been removed from your cart",
                    });
                  }}
                >
                  Clear Cart
                </Button>
                
                <div className="text-center">
                  <Link to="/shop">
                    <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                      ← Continue Shopping
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700 text-center">
                    <span className="font-semibold text-green-700">Free shipping</span> on all orders!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
