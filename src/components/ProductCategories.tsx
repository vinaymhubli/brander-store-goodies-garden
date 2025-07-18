
import { ChefHat, Gem, Utensils, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProductCategories = () => {
  const categories = [
    {
      icon: ChefHat,
      title: "Kitchen Essentials",
      description: "Premium cookware, bakeware, and kitchen tools for the modern chef",
      items: "200+ Products",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600"
    },
    {
      icon: Utensils,
      title: "Tableware",
      description: "Elegant dining sets, plates, bowls, and serving accessories",
      items: "150+ Products",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      icon: Gem,
      title: "Fine Jewelry",
      description: "Exquisite jewelry pieces crafted with attention to detail",
      items: "100+ Products",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    },
    {
      icon: Sparkles,
      title: "Accessories",
      description: "Beautiful accessories to complement your style and home",
      items: "80+ Products",
      color: "bg-pink-500",
      hoverColor: "hover:bg-pink-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed to elevate your lifestyle
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300"
            >
              <div className={`${category.color} ${category.hoverColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors`}>
                <category.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category.title}
              </h3>
              
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  {category.items}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="group-hover:bg-gray-100 transition-colors"
                >
                  Explore →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
