
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { ProductCategories } from "@/components/ProductCategories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: 'Brander Store - Premium Hair Accessories & Kitchen Appliances',
    description: 'Discover premium hair accessories and innovative kitchen appliances at Brander Store. Shop for elegant hairpins, clips, and modern kitchen gadgets with fast delivery and excellent customer service.',
    keywords: ['hair accessories', 'kitchen appliances', 'hairpins', 'hair clips', 'food warmer', 'premium quality', 'online shopping', 'beauty products'],
    type: 'website',
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="w-full overflow-x-hidden">
        <Hero />
        <ProductCategories />
        <FeaturedProducts />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
