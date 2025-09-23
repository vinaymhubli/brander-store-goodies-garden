export const SEO_CONFIG = {
  site: {
    name: 'Brander Store',
    url: 'https://brander-store.com',
    description: 'Premium hair accessories and innovative kitchen appliances at Brander Store. Shop for elegant hairpins, clips, and modern kitchen gadgets with fast delivery and excellent customer service.',
    keywords: ['hair accessories', 'kitchen appliances', 'hairpins', 'hair clips', 'food warmer', 'premium quality', 'online shopping', 'beauty products'],
    image: '/lovable-uploads/60f61926-86cc-4be3-9cba-67af0112135b.png',
    logo: '/lovable-uploads/60f61926-86cc-4be3-9cba-67af0112135b.png',
    twitterHandle: '@branderstore',
    facebookAppId: '1751920828758608',
  },
  pages: {
    home: {
      title: 'Brander Store - Premium Hair Accessories & Kitchen Appliances',
      description: 'Discover premium hair accessories and innovative kitchen appliances at Brander Store. Shop for elegant hairpins, clips, and modern kitchen gadgets with fast delivery and excellent customer service.',
      keywords: ['hair accessories', 'kitchen appliances', 'hairpins', 'hair clips', 'food warmer', 'premium quality', 'online shopping', 'beauty products', 'home'],
    },
    shop: {
      title: 'Shop - Premium Hair Accessories & Kitchen Appliances | Brander Store',
      description: 'Browse our complete collection of premium hair accessories and kitchen appliances. Find the perfect hairpins, clips, and kitchen gadgets with fast delivery.',
      keywords: ['shop', 'hair accessories', 'kitchen appliances', 'hairpins', 'hair clips', 'food warmer', 'online shopping', 'beauty products'],
    },
    about: {
      title: 'About Us - Brander Store | Premium Hair Accessories & Kitchen Appliances',
      description: 'Learn about Brander Store, your trusted source for premium hair accessories and innovative kitchen appliances. Discover our commitment to quality and customer satisfaction.',
      keywords: ['about us', 'brander store', 'company', 'quality', 'customer service', 'hair accessories', 'kitchen appliances'],
    },
    contact: {
      title: 'Contact Us - Brander Store | Get in Touch',
      description: 'Contact Brander Store for customer support, product inquiries, or any questions about our premium hair accessories and kitchen appliances.',
      keywords: ['contact us', 'customer support', 'help', 'inquiries', 'brander store', 'hair accessories', 'kitchen appliances'],
    },
    login: {
      title: 'Login - Brander Store',
      description: 'Sign in to your Brander Store account to access your orders, wishlist, and personalized shopping experience.',
      keywords: ['login', 'sign in', 'account', 'brander store'],
    },
    signup: {
      title: 'Sign Up - Brander Store',
      description: 'Create your Brander Store account to enjoy personalized shopping, order tracking, and exclusive offers on hair accessories and kitchen appliances.',
      keywords: ['sign up', 'register', 'create account', 'brander store'],
    },
    cart: {
      title: 'Shopping Cart - Brander Store',
      description: 'Review your selected hair accessories and kitchen appliances in your shopping cart. Secure checkout with fast delivery.',
      keywords: ['shopping cart', 'cart', 'checkout', 'hair accessories', 'kitchen appliances'],
    },
    wishlist: {
      title: 'Wishlist - Brander Store',
      description: 'View your saved hair accessories and kitchen appliances in your wishlist. Add items to cart when ready to purchase.',
      keywords: ['wishlist', 'saved items', 'favorites', 'hair accessories', 'kitchen appliances'],
    },
    myOrders: {
      title: 'My Orders - Brander Store',
      description: 'Track your orders and view order history for your hair accessories and kitchen appliances purchases.',
      keywords: ['my orders', 'order history', 'track orders', 'hair accessories', 'kitchen appliances'],
    },
  },
  categories: {
    'hair-accessories': {
      title: 'Hair Accessories - Premium Hairpins & Clips | Brander Store',
      description: 'Shop our collection of premium hair accessories including elegant hairpins, clips, and hair styling tools. High-quality products for every occasion.',
      keywords: ['hair accessories', 'hairpins', 'hair clips', 'hair styling', 'beauty', 'premium quality'],
    },
    'kitchen-appliances': {
      title: 'Kitchen Appliances - Modern Kitchen Gadgets | Brander Store',
      description: 'Discover innovative kitchen appliances and modern cooking gadgets. From food warmers to essential kitchen tools for your home.',
      keywords: ['kitchen appliances', 'food warmer', 'kitchen gadgets', 'cooking tools', 'home appliances'],
    },
  },
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Brander Store',
      description: 'Premium hair accessories and kitchen appliances retailer',
      url: 'https://brander-store.com',
      logo: 'https://brander-store.com/lovable-uploads/60f61926-86cc-4be3-9cba-67af0112135b.png',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'IN',
        serviceType: 'Retail'
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN'
      },
      sameAs: [
        'https://twitter.com/branderstore',
        'https://facebook.com/branderstore'
      ]
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Brander Store',
      description: 'Premium hair accessories and kitchen appliances online store',
      url: 'https://brander-store.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://brander-store.com/shop?search={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    breadcrumbList: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: []
    }
  }
};

export const generateProductSchema = (product: {
  id: number;
  name: string;
  description: string;
  price: number;
  sellingPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image.startsWith('http') ? product.image : `${SEO_CONFIG.site.url}${product.image}`,
    url: `${SEO_CONFIG.site.url}/product/${product.id}`,
    sku: `BS-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Brander Store'
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.sellingPrice || product.price,
      priceCurrency: 'INR',
      availability: `https://schema.org/${product.inStock ? 'InStock' : 'OutOfStock'}`,
      seller: {
        '@type': 'Organization',
        name: 'Brander Store'
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 1,
      bestRating: 5,
      worstRating: 1
    } : undefined
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};
