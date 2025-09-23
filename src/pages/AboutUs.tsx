
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Users, Award, Heart, Globe } from "lucide-react";

const AboutUs = () => {
  useSEO({
    title: 'About Us - Brander Store | Premium Hair Accessories & Kitchen Appliances',
    description: 'Learn about Brander Store, your trusted source for premium hair accessories and innovative kitchen appliances. Discover our commitment to quality and customer satisfaction.',
    keywords: ['about us', 'brander store', 'company', 'quality', 'customer service', 'hair accessories', 'kitchen appliances'],
    type: 'website',
  });
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              About <span className="text-purple-600">Brandter</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Crafting exceptional experiences through premium products and innovative design. 
              We believe in quality, sustainability, and bringing joy to everyday life.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Our Story
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-600 text-sm sm:text-base">
                <p>
                  Founded in 2020, Brandter began as a vision to create a marketplace where 
                  quality meets affordability. We started with a simple belief that everyone 
                  deserves access to premium products that enhance their lifestyle.
                </p>
                <p>
                  What started as a small team of passionate individuals has grown into a 
                  trusted brand serving thousands of customers worldwide. Our commitment to 
                  excellence drives everything we do.
                </p>
                <p>
                  Today, we continue to innovate and expand our product range while maintaining 
                  our core values of quality, sustainability, and customer satisfaction.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Our team working together"
                  className="rounded-lg shadow-2xl w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Values
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              The principles that guide us in everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-4">
              <div className="bg-purple-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Quality First</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We never compromise on quality. Every product is carefully selected and tested 
                to meet our high standards.
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-pink-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Customer Love</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our customers are at the heart of everything we do. We strive to exceed 
                expectations in every interaction.
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-green-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We're committed to protecting our planet through sustainable practices and 
                eco-friendly products.
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-blue-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We believe in building strong communities and supporting local artisans and 
                businesses worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Experience Brandter?
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of satisfied customers who have made Brandter their preferred choice 
            for premium products and exceptional service.
          </p>
          <button className="bg-white text-purple-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base">
            Start Shopping
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
