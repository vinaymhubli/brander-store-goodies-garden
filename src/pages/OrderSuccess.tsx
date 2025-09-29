import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CheckCircle, Package, Truck, Home } from "lucide-react";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    image_url: string;
  };
}

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  shipping_address: any;
  order_items: OrderItem[];
}

export default function OrderSuccess() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      navigate("/");
      return;
    }

    fetchOrder();
  }, [orderId, navigate]);

  const fetchOrder = async () => {
    try {
      let query = supabase
        .from("orders")
        .select(`
          *,
          order_items (
            id,
            quantity,
            price,
            product:products (
              id,
              name,
              image_url
            )
          )
        `)
        .eq("id", orderId);

      // If user is logged in, filter by user_id, otherwise get any order with this ID
      if (user) {
        query = query.eq("user_id", user.id);
      }

      const { data, error } = await query.single();

      if (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to load order details");
        navigate("/");
        return;
      }

      setOrder(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
      navigate("/");
    } finally {
      setLoading(false);
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading order details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find the order you're looking for.
            </p>
            <Button asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details */}
          <Card className="p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Order Details</h2>
                <p className="text-sm text-muted-foreground">
                  Order ID: <span className="font-mono">{order.id}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Placed on: {formatDate(order.created_at)}
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Package className="w-3 h-3 mr-1" />
                {order.status}
              </Badge>
            </div>

            <Separator className="my-4" />

            {/* Order Items */}
            <div className="space-y-4">
              <h3 className="font-medium">Items Ordered</h3>
              {order.order_items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Amount:</span>
              <span className="text-xl font-bold text-primary">
                {formatPrice(order.total_amount)}
              </span>
            </div>
          </Card>

          {/* Shipping Information */}
          {order.shipping_address && (
            <Card className="p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Shipping Information
              </h3>
              <div className="text-sm space-y-1">
                <p><strong>Name:</strong> {order.shipping_address.fullName}</p>
                <p><strong>Address:</strong> {order.shipping_address.address}</p>
                <p><strong>City:</strong> {order.shipping_address.city}</p>
                <p><strong>State:</strong> {order.shipping_address.state}</p>
                <p><strong>PIN Code:</strong> {order.shipping_address.pinCode}</p>
                <p><strong>Phone:</strong> {order.shipping_address.phone}</p>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button asChild variant="outline">
                <Link to="/my-orders">View All Orders</Link>
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link to="/track-order">Track Your Orders</Link>
              </Button>
            )}
            <Button asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}