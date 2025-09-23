export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  siteName?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  price?: number;
  currency?: string;
  availability?: 'in stock' | 'out of stock' | 'preorder';
  brand?: string;
  sku?: string;
}

export const defaultSEO: SEOConfig = {
  title: 'Brander Store - Premium Hair Accessories & Kitchen Appliances',
  description: 'Discover premium hair accessories and innovative kitchen appliances at Brander Store. Shop for elegant hairpins, clips, and modern kitchen gadgets with fast delivery and excellent customer service.',
  keywords: ['hair accessories', 'kitchen appliances', 'hairpins', 'hair clips', 'food warmer', 'premium quality', 'online shopping'],
  image: '/lovable-uploads/60f61926-86cc-4be3-9cba-67af0112135b.png',
  url: 'https://brander-store.com',
  type: 'website',
  siteName: 'Brander Store',
  author: 'Brander Store',
  currency: 'INR',
};

export const updatePageSEO = (config: Partial<SEOConfig>) => {
  const seo = { ...defaultSEO, ...config };
  
  // Update document title
  document.title = seo.title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', seo.description);
  } else {
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = seo.description;
    document.head.appendChild(meta);
  }
  
  // Update keywords
  if (seo.keywords && seo.keywords.length > 0) {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seo.keywords.join(', '));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = seo.keywords.join(', ');
      document.head.appendChild(meta);
    }
  }
  
  // Update Open Graph tags
  updateOpenGraphTags(seo);
  
  // Update Twitter Card tags
  updateTwitterCardTags(seo);
  
  // Update canonical URL
  updateCanonicalURL(seo.url || '');
  
  // Update structured data
  updateStructuredData(seo);
};

const updateOpenGraphTags = (seo: SEOConfig) => {
  const ogTags = [
    { property: 'og:title', content: seo.title },
    { property: 'og:description', content: seo.description },
    { property: 'og:type', content: seo.type || 'website' },
    { property: 'og:image', content: seo.image || defaultSEO.image },
    { property: 'og:url', content: seo.url || defaultSEO.url },
    { property: 'og:site_name', content: seo.siteName || defaultSEO.siteName },
  ];
  
  ogTags.forEach(({ property, content }) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (meta) {
      meta.setAttribute('content', content);
    } else {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  });
  
  // Add product-specific Open Graph tags
  if (seo.type === 'product') {
    if (seo.price) {
      let meta = document.querySelector('meta[property="product:price:amount"]');
      if (meta) {
        meta.setAttribute('content', seo.price.toString());
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', 'product:price:amount');
        meta.setAttribute('content', seo.price.toString());
        document.head.appendChild(meta);
      }
      
      meta = document.querySelector('meta[property="product:price:currency"]');
      if (meta) {
        meta.setAttribute('content', seo.currency || defaultSEO.currency);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', 'product:price:currency');
        meta.setAttribute('content', seo.currency || defaultSEO.currency);
        document.head.appendChild(meta);
      }
    }
    
    if (seo.availability) {
      let meta = document.querySelector('meta[property="product:availability"]');
      if (meta) {
        meta.setAttribute('content', seo.availability);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', 'product:availability');
        meta.setAttribute('content', seo.availability);
        document.head.appendChild(meta);
      }
    }
  }
};

const updateTwitterCardTags = (seo: SEOConfig) => {
  const twitterTags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seo.title },
    { name: 'twitter:description', content: seo.description },
    { name: 'twitter:image', content: seo.image || defaultSEO.image },
  ];
  
  twitterTags.forEach(({ name, content }) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (meta) {
      meta.setAttribute('content', content);
    } else {
      meta = document.createElement('meta');
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
    }
  });
};

const updateCanonicalURL = (url: string) => {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', url);
  } else {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    document.head.appendChild(canonical);
  }
};

const updateStructuredData = (seo: SEOConfig) => {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  let structuredData: any = {};
  
  if (seo.type === 'product') {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: seo.title,
      description: seo.description,
      image: seo.image || defaultSEO.image,
      url: seo.url || defaultSEO.url,
      brand: {
        '@type': 'Brand',
        name: seo.brand || 'Brander Store'
      },
      offers: {
        '@type': 'Offer',
        price: seo.price,
        priceCurrency: seo.currency || defaultSEO.currency,
        availability: `https://schema.org/${seo.availability === 'in stock' ? 'InStock' : 'OutOfStock'}`,
        seller: {
          '@type': 'Organization',
          name: 'Brander Store'
        }
      }
    };
    
    if (seo.sku) {
      structuredData.sku = seo.sku;
    }
  } else {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: seo.siteName || defaultSEO.siteName,
      description: seo.description,
      url: seo.url || defaultSEO.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${seo.url || defaultSEO.url}/shop?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
    
    // Add Organization schema for homepage
    if (seo.url === defaultSEO.url || seo.url === `${defaultSEO.url}/`) {
      const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Brander Store',
        description: 'Premium hair accessories and kitchen appliances retailer',
        url: seo.url || defaultSEO.url,
        logo: seo.image || defaultSEO.image,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['English', 'Hindi']
        }
      };
      
      const orgScript = document.createElement('script');
      orgScript.type = 'application/ld+json';
      orgScript.textContent = JSON.stringify(organizationSchema);
      document.head.appendChild(orgScript);
    }
  }
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(breadcrumbSchema);
  document.head.appendChild(script);
};
