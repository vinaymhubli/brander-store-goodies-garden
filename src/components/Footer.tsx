import {
  Instagram,
  Mail,
  Phone,
  MapPin,
  Award,
  Shield,
  Truck,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust indicators */}
        <div className="border-b border-gray-800 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Secure Payment</h4>
                <p className="text-gray-400 text-sm">256-bit SSL encryption</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-gray-400 text-sm">On orders over $199</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">24/7 Support</h4>
                <p className="text-gray-400 text-sm">Expert assistance</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-full">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Premium Quality</h4>
                <p className="text-gray-400 text-sm">Lifetime warranty</p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand */}
            <div className="space-y-6">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                brandter<span className="text-white">.store</span>
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Your premier destination for luxury kitchenware and exquisite
                jewelry. We curate only the finest pieces that combine timeless
                craftsmanship with modern innovation.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-gray-400 hover:text-white transition-all duration-300 rounded-full"
                  asChild
                >
                  <a
                    href="https://www.instagram.com/brandterofficial?igsh=c3hrNjRpY3IxOWg3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Quick Links</h4>
              <div className="space-y-3">
                <Link
                  to="/shop"
                  className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300"
                >
                  Shop All Products
                </Link>
                <Link
                  to="/about"
                  className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300"
                >
                  Contact Us
                </Link>
                <Link
                  to="/wishlist"
                  className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300"
                >
                  My Wishlist
                </Link>
                <Link
                  to="/my-orders"
                  className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300"
                >
                  My Orders
                </Link>
              </div>
            </div>

            {/* Customer Service */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Support</h4>
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300"
                >
                  Contact Us
                </Link>
                <a
                  href="mailto:info@brandter.store"
                  className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300"
                >
                  Email Support
                </a>
                <a
                  href="tel:+919068007866"
                  className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300"
                >
                  Call Us: +91 9068007866
                </a>
               
              </div>
            </div>

          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Visit Our Store</p>
                <p className="text-gray-400 text-sm">
                  A 315 ERA GARDENIYA ESTATE
                </p>
                <p className="text-gray-400 text-sm">
                  NOOR NAGAR LISARI MEERUT
                </p>
                <p className="text-gray-400 text-sm">
                  250002 UTTAR PRADESH INDIA
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-full">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Customer Care</p>
                <p className="text-gray-400">+91 9068007866</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">General Questions</p>
                <p className="text-gray-400">info@brandter.store</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2024 brander.store. All rights reserved. | Crafted with excellence
            since 2020
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a
              href="mailto:info@brandter.store"
              className="text-gray-400 hover:text-white text-sm transition-colors hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="mailto:info@brandter.store"
              className="text-gray-400 hover:text-white text-sm transition-colors hover:underline"
            >
              Terms of Service
            </a>
            <a
              href="mailto:info@brandter.store"
              className="text-gray-400 hover:text-white text-sm transition-colors hover:underline"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
