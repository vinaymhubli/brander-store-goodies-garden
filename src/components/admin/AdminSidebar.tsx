import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  Users,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: Package,
  },
  {
    title: 'Categories',
    url: '/admin/categories',
    icon: FolderOpen,
  },
  {
    title: 'Orders',
    url: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: Users,
  },
];

export const AdminSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className={isCollapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    end={item.url === "/admin"}
                    className={({ isActive: navIsActive }) => {
                      const isItemActive = navIsActive || isActive(item.url);
                      return `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
                        isItemActive
                          ? "!bg-sidebar-primary !text-sidebar-primary-foreground font-medium shadow-sm"
                          : "!text-gray-700 dark:!text-gray-200 hover:!bg-sidebar-accent hover:!text-sidebar-accent-foreground"
                      } ${isCollapsed && "justify-center"}`;
                    }}
                    style={({ isActive: navIsActive }) => ({
                      color:
                        navIsActive || isActive(item.url)
                          ? "hsl(var(--sidebar-primary-foreground))"
                          : "hsl(var(--sidebar-foreground))",
                    })}
                  >
                    <item.icon className="h-4 w-4 min-w-4" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};