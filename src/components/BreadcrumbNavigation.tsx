import { useLocation, Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { useEffect } from 'react';

interface BreadcrumbItem {
  name: string;
  url: string;
  isActive?: boolean;
}

export const BreadcrumbNavigation = () => {
  const location = useLocation();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      let name = segment;
      if (segment === 'shop') name = 'Shop';
      else if (segment === 'cart') name = 'Shopping Cart';
      else if (segment === 'checkout') name = 'Checkout';
      else if (segment === 'wishlist') name = 'Wishlist';
      else if (segment === 'about') name = 'About Us';
      else if (segment === 'contact') name = 'Contact Us';
      else if (segment === 'login') name = 'Login';
      else if (segment === 'signup') name = 'Sign Up';
      else if (segment === 'my-orders') name = 'My Orders';
      else if (segment === 'admin') name = 'Admin Panel';
      else if (segment === 'products') name = 'Products';
      else if (segment === 'categories') name = 'Categories';
      else if (segment === 'orders') name = 'Orders';
      else if (segment === 'users') name = 'Users';
      else if (segment === 'product') name = 'Product';
      else if (segment === 'order-success') name = 'Order Success';
      else {
        // Capitalize first letter and replace hyphens with spaces
        name = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }

      breadcrumbs.push({
        name,
        url: currentPath,
        isActive: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  useEffect(() => {
    // Generate structured data for breadcrumbs
    const breadcrumbItems = breadcrumbs.map(item => ({
      name: item.name,
      url: `${window.location.origin}${item.url}`
    }));
    
    generateBreadcrumbSchema(breadcrumbItems);
  }, [breadcrumbs]);

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="bg-gray-50 py-3 px-4 border-b" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          {breadcrumbs.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
              
              {index === 0 ? (
                <Link
                  to={item.url}
                  className="flex items-center hover:text-gray-900 transition-colors"
                >
                  <Home className="w-4 h-4 mr-1" />
                  {item.name}
                </Link>
              ) : item.isActive ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};
