import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePageSEO, SEOConfig } from '@/lib/seo';

export const useSEO = (config: Partial<SEOConfig>) => {
  const location = useLocation();
  
  useEffect(() => {
    // Update SEO when component mounts or config changes
    updatePageSEO({
      ...config,
      url: `${window.location.origin}${location.pathname}`,
    });
  }, [config, location.pathname]);
};

export const useProductSEO = (product: {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
} | null) => {
  const location = useLocation();
  
  useEffect(() => {
    if (!product) return;
    
    updatePageSEO({
      title: `${product.name} - Brander Store`,
      description: `${product.description} Shop now for ₹${product.price}. Rated ${product.rating}/5 by ${product.reviews} customers. Free delivery available.`,
      keywords: [
        product.name.toLowerCase(),
        product.category.toLowerCase(),
        'hair accessories',
        'kitchen appliances',
        'online shopping',
        'premium quality',
        'brander store'
      ],
      image: product.image.startsWith('http') ? product.image : `${window.location.origin}${product.image}`,
      url: `${window.location.origin}${location.pathname}`,
      type: 'product',
      price: product.price,
      currency: 'INR',
      availability: 'in stock',
      brand: 'Brander Store',
      sku: `BS-${product.id}`,
    });
  }, [product, location.pathname]);
};

export const useCategorySEO = (categoryName: string, categoryDescription: string) => {
  const location = useLocation();
  
  useEffect(() => {
    updatePageSEO({
      title: `${categoryName} - Brander Store`,
      description: `${categoryDescription} Browse our collection of premium ${categoryName.toLowerCase()} at Brander Store. High-quality products with fast delivery.`,
      keywords: [
        categoryName.toLowerCase(),
        'hair accessories',
        'kitchen appliances',
        'online shopping',
        'premium quality',
        'brander store'
      ],
      url: `${window.location.origin}${location.pathname}`,
      type: 'website',
    });
  }, [categoryName, categoryDescription, location.pathname]);
};
