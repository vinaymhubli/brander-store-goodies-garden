import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { MyOrders } from "./pages/MyOrders";
import OrderSuccess from "./pages/OrderSuccess";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminProducts } from "./pages/admin/AdminProducts";
import { AdminCategories } from "./pages/admin/AdminCategories";
import { AdminOrders } from "./pages/admin/AdminOrders";
import { AdminUsers } from "./pages/admin/AdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/shop"
              element={
                <>
                  <BreadcrumbNavigation />
                  <Shop />
                </>
              }
            />
            <Route
              path="/product/:id"
              element={
                <>
                  <ProductDetail />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <>
                  <BreadcrumbNavigation />
                  <Cart />
                </>
              }
            />
            <Route
              path="/checkout"
              element={
                <>
                  <BreadcrumbNavigation />
                  <Checkout />
                </>
              }
            />
            <Route
              path="/wishlist"
              element={
                <>
                  <BreadcrumbNavigation />
                  <Wishlist />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <BreadcrumbNavigation />
                  <AboutUs />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <BreadcrumbNavigation />
                  <ContactUs />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <BreadcrumbNavigation />
                  <Login />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <BreadcrumbNavigation />
                  <Signup />
                </>
              }
            />
            <Route
              path="/my-orders"
              element={
                <>
                  <BreadcrumbNavigation />
                  <MyOrders />
                </>
              }
            />
            <Route
              path="/order-success/:orderId"
              element={
                <>
                  <BreadcrumbNavigation />
                  <OrderSuccess />
                </>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/login"
              element={
                <>
                  <BreadcrumbNavigation />
                  <AdminLogin />
                </>
              }
            />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route
              path="*"
              element={
                <>
                  <BreadcrumbNavigation />
                  <NotFound />
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
