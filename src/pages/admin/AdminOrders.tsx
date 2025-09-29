import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: any;
  created_at: string;
  profiles: {
    email: string;
    full_name: string | null;
  } | null;
  order_items: {
    id: string;
    quantity: number;
    price: number;
    products: {
      name: string;
    } | null;
  }[];
}

interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
}

export const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats>({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  const fetchOrders = async () => {
    try {
      // First fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            quantity,
            price,
            products (
              name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Then fetch profiles for each order
      const ordersWithProfiles = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('email, full_name')
            .eq('user_id', order.user_id)
            .single();

          return {
            ...order,
            profiles: profileData
          };
        })
      );

      setOrders(ordersWithProfiles as Order[]);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select('total_amount, status');

      if (error) throw error;

      const totalOrders = ordersData?.length || 0;
      const totalRevenue = ordersData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
      const pendingOrders = ordersData?.filter(order => order.status === 'pending').length || 0;
      const deliveredOrders = ordersData?.filter(order => order.status === 'delivered').length || 0;

      setStats({
        totalOrders,
        totalRevenue,
        pendingOrders,
        deliveredOrders,
      });
    } catch (error) {
      console.error('Error fetching order stats:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
      
      fetchOrders();
      fetchStats();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'processing':
        return 'default';
      case 'shipped':
        return 'outline';
      case 'delivered':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      description: 'All time orders',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      description: 'All time revenue',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Package,
      description: 'Orders to process',
    },
    {
      title: 'Delivered Orders',
      value: stats.deliveredOrders,
      icon: Users,
      description: 'Successfully delivered',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders List</CardTitle>
          <CardDescription>Manage customer orders and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id.slice(0, 8)}...</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {order.profiles?.full_name || order.shipping_address?.fullName || 'Guest Customer'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.profiles?.email || order.shipping_address?.email || 'N/A'}
                      </div>
                      {order.shipping_address?.phone && (
                        <div className="text-xs text-muted-foreground">
                          📞 {order.shipping_address.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>₹{order.total_amount}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewOrderDetails(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Select
                        value={order.status}
                        onValueChange={(value: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order ID: {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Customer Information</h4>
                  <p>{selectedOrder.profiles?.full_name || selectedOrder.shipping_address?.fullName || 'Guest Customer'}</p>
                  <p className="text-muted-foreground">{selectedOrder.profiles?.email || selectedOrder.shipping_address?.email || 'N/A'}</p>
                  {selectedOrder.shipping_address?.phone && (
                    <p className="text-muted-foreground">📞 {selectedOrder.shipping_address.phone}</p>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold">Order Information</h4>
                  <p>Status: <Badge variant={getStatusVariant(selectedOrder.status)}>{selectedOrder.status}</Badge></p>
                  <p>Total: ₹{selectedOrder.total_amount}</p>
                  <p>Date: {new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Order Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.order_items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.products?.name || 'Unknown Product'}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>₹{item.price}</TableCell>
                        <TableCell>₹{(item.quantity * Number(item.price)).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {selectedOrder.shipping_address && (
                <div>
                  <h4 className="font-semibold mb-2">Shipping Address</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <p><strong>Name:</strong> {selectedOrder.shipping_address.fullName}</p>
                    <p><strong>Email:</strong> {selectedOrder.shipping_address.email}</p>
                    <p><strong>Phone:</strong> {selectedOrder.shipping_address.phone}</p>
                    <p><strong>Address:</strong> {selectedOrder.shipping_address.address}</p>
                    <p><strong>City:</strong> {selectedOrder.shipping_address.city}</p>
                    <p><strong>State:</strong> {selectedOrder.shipping_address.state}</p>
                    <p><strong>PIN Code:</strong> {selectedOrder.shipping_address.pinCode}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};