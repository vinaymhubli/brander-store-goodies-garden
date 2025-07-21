
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { ProductCategories } from "@/components/ProductCategories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation(0.1);
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation(0.2);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ProductCategories />
      <div 
        ref={featuredRef}
        className={`transition-all duration-1000 ${
          featuredVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <FeaturedProducts />
      </div>
      <div 
        ref={footerRef}
        className={`transition-all duration-1000 ${
          footerVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Index;
