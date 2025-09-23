
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Fashion Designer",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The quality of products is exceptional. Every piece I've purchased has exceeded my expectations. The attention to detail and craftsmanship is remarkable.",
      product: "Elegance Pearl Hairclip"
    },
    {
      id: 2,
      name: "Arjun Patel",
      role: "Chef & Restaurant Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As a professional chef, I demand the best tools. These kitchen essentials have transformed my culinary experience. Absolutely worth every penny.",
      product: "Heat Mat Pro - Food Heating Pad"
    },
    {
      id: 3,
      name: "Ananya Reddy",
      role: "Beauty Influencer",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The hair accessories are simply stunning! They hold my hair perfectly while adding such elegant charm to my look. I get compliments everywhere I go.",
      product: "Twist & Shine Hairpin"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 rounded-full px-6 py-3 mb-6 border border-blue-200">
            <Quote className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            What Our
            <span className="block text-blue-600">
              Customers Say
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover why thousands of satisfied customers choose us for their premium product needs. 
            Real stories from real people who've experienced our exceptional quality and service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
            >
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Quote className="h-4 w-4 text-white" />
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="w-16 h-16 border-2 border-gray-200">
                  <AvatarImage
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-100 text-gray-600 text-lg font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-500 fill-current"
                  />
                ))}
              </div>

              <blockquote className="text-gray-700 leading-relaxed mb-4 italic">
                "{testimonial.text}"
              </blockquote>

              <div className="text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                Purchased: {testimonial.product}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">Join thousands of satisfied customers</p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&h=50&fit=crop&crop=face" alt="" />
                  <AvatarFallback className="bg-gray-100 text-xs">PS</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" alt="" />
                  <AvatarFallback className="bg-gray-100 text-xs">AP</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face" alt="" />
                  <AvatarFallback className="bg-gray-100 text-xs">AR</AvatarFallback>
                </Avatar>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-semibold">
                  +2K
                </div>
              </div>
              <span>Happy Customers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <span>4.9/5 Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
