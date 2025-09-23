import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  placeholder?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  onError,
  onLoad,
  placeholder = '/placeholder.svg'
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // If loading is eager, load immediately
    if (loading === 'eager') {
      setImageSrc(src);
      return;
    }

    // Create intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the image comes into view
      }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [src, loading]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    setIsError(false);
    onLoad?.(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsError(true);
    setImageSrc(placeholder);
    onError?.(e);
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      width={width}
      height={height}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
      decoding="async"
      // Add structured data for images
      itemProp="image"
    />
  );
};

// Product Image Component with additional SEO attributes
interface ProductImageProps extends OptimizedImageProps {
  productName: string;
  productPrice?: number;
  productCategory?: string;
}

export const ProductImage = ({
  src,
  alt,
  productName,
  productPrice,
  productCategory,
  className = '',
  ...props
}: ProductImageProps) => {
  return (
    <OptimizedImage
      src={src}
      alt={`${alt} - ${productName}${productPrice ? ` for ₹${productPrice}` : ''}${productCategory ? ` in ${productCategory}` : ''}`}
      className={`${className} hover:scale-105 transition-transform duration-300`}
      {...props}
      // Additional structured data
      onLoad={(e) => {
        // Add microdata for product images
        const img = e.currentTarget;
        img.setAttribute('itemProp', 'image');
        if (productPrice) {
          img.setAttribute('data-price', productPrice.toString());
        }
        if (productCategory) {
          img.setAttribute('data-category', productCategory);
        }
        props.onLoad?.(e);
      }}
    />
  );
};

// Hero Image Component for main banners
interface HeroImageProps extends OptimizedImageProps {
  priority?: boolean;
}

export const HeroImage = ({
  src,
  alt,
  priority = false,
  className = '',
  ...props
}: HeroImageProps) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={`${className} w-full h-full object-cover`}
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  );
};
