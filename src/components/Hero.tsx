
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">Trusted by 10,000+ customers</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Premium Quality for
                <span className="text-blue-600 block">Every Kitchen</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-md">
                Discover our curated collection of premium kitchenware and elegant jewelry. 
                Quality craftsmanship meets modern design.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                Shop Kitchen Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Jewelry
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Customer Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">Free</div>
                <div className="text-sm text-gray-600">Shipping</div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Product */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <img 
                src="/lovable-uploads/b9939234-d571-4c99-9503-c34008224ce6.png" 
                alt="Premium Kitchen Tableware Collection" 
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-6 space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Multi-Compatible Cookware Set
                </h3>
                <p className="text-gray-600">
                  Compatible with all kitchen needs - Stainless steel, Enamelware, Ceramic & more
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">$299.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Best Seller
            </div>
            <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Free Shipping
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
