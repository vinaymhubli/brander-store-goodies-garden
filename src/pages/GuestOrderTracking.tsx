import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { Package, Search, Mail, Phone, MapPin, Calendar, DollarSign, User } from "lucide-react";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  products: {
    id: string;
    name: string;
    image_url: string;
  };
}

interface Order {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  shipping_address: any;
  order_items: OrderItem[];
}

export const GuestOrderTracking = () => {
  const navigate = useNavigate();
  const [searchMethod, setSearchMethod] = useState<'email' | 'orderId'>('email');
  const [searchValue, setSearchValue] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      toast.error('Please enter a search value');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (
              id,
              name,
              image_url
            )
          )
        `)
        .is('user_id', null) // Only guest orders
        .order('created_at', { ascending: false });

      if (searchMethod === 'email') {
        // Search by email in shipping address
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Filter by email in shipping address
        const filteredOrders = data?.filter(order => {
          const shippingAddress = order.shipping_address as any;
          return shippingAddress?.email?.toLowerCase().includes(searchValue.toLowerCase());
        }) || [];
        
        setOrders(filteredOrders);
      } else {
        // Search by order ID (handle both full UUID and partial ID)
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Filter by order ID - handle both full UUID and partial matches
        const filteredOrders = data?.filter(order => {
          const fullId = order.id;
          const partialId = fullId.slice(-8).toUpperCase();
          const searchUpper = searchValue.toUpperCase();
          
          return fullId.toUpperCase().includes(searchUpper) || 
                 partialId.includes(searchUpper);
        }) || [];
        
        setOrders(filteredOrders);
      }
    } catch (error: any) {
      console.error('Search error:', error);
      toast.error('Failed to search orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Track Your Order
          </h1>
          <p className="text-muted-foreground">
            Enter your email or order ID to view your order details
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Your Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Method Toggle */}
            <div className="flex gap-2">
              <Button
                variant={searchMethod === 'email' ? 'default' : 'outline'}
                onClick={() => setSearchMethod('email')}
                className="flex-1"
              >
                <Mail className="h-4 w-4 mr-2" />
                Search by Email
              </Button>
              <Button
                variant={searchMethod === 'orderId' ? 'default' : 'outline'}
                onClick={() => setSearchMethod('orderId')}
                className="flex-1"
              >
                <Package className="h-4 w-4 mr-2" />
                Search by Order ID
              </Button>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <Label htmlFor="search">
                {searchMethod === 'email' ? 'Email Address' : 'Order ID'}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  type={searchMethod === 'email' ? 'email' : 'text'}
                  placeholder={
                    searchMethod === 'email' 
                      ? 'Enter your email address' 
                      : 'Enter your order ID'
                  }
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>

            {/* Help Text */}
            <div className="text-sm text-muted-foreground">
              {searchMethod === 'email' ? (
                <p>Enter the email address you used during checkout to find all your orders.</p>
              ) : (
                <p>Enter your order ID (found in your order confirmation email).</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searched && (
          <div className="space-y-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : orders.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchMethod === 'email' 
                      ? 'No orders found with this email address.'
                      : 'No order found with this ID.'
                    }
                  </p>
                  <Button asChild>
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Found {orders.length} order{orders.length > 1 ? 's' : ''}
                </h2>
                <div className="space-y-6">
                  {orders.map((order) => (
                    <Card key={order.id} className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                      <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <CardTitle className="text-lg font-semibold">
                              Order #{order.id.slice(-8).toUpperCase()}
                            </CardTitle>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formatDate(order.created_at)}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                ₹{order.total_amount.toFixed(2)}
                              </div>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {order.order_items.map((item, index) => (
                            <div key={item.id}>
                              <div className="flex items-center gap-4">
                                <img
                                  src={item.products.image_url}
                                  alt={item.products.name}
                                  className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium">{item.products.name}</h4>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-sm text-muted-foreground">
                                      Quantity: {item.quantity}
                                    </span>
                                    <span className="font-semibold">
                                      ₹{(Number(item.price) * item.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {index < order.order_items.length - 1 && (
                                <Separator className="mt-4" />
                              )}
                            </div>
                          ))}
                        </div>

                        {order.shipping_address && (
                          <div className="mt-6 pt-4 border-t border-border/50">
                            <h5 className="font-semibold mb-2 flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              Shipping Address
                            </h5>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p><strong>Name:</strong> {order.shipping_address.fullName}</p>
                              <p><strong>Address:</strong> {order.shipping_address.address}</p>
                              <p><strong>City:</strong> {order.shipping_address.city}</p>
                              <p><strong>State:</strong> {order.shipping_address.state}</p>
                              <p><strong>PIN Code:</strong> {order.shipping_address.pinCode}</p>
                              <p><strong>Phone:</strong> {order.shipping_address.phone}</p>
                              <p><strong>Email:</strong> {order.shipping_address.email}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Can't find your order?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check your email for order confirmation</li>
                  <li>• Make sure you're using the correct email address</li>
                  <li>• Order ID is case-sensitive</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Want to create an account?</h4>
                <p className="text-sm text-muted-foreground">
                  Create an account to easily track all your orders and get personalized recommendations.
                </p>
                <Button asChild>
                  <Link to="/signup">Create Account</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};
