
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { ProductCategories } from "@/components/ProductCategories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Index;
