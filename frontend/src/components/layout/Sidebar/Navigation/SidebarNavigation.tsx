import { navigation } from "../../../../data/sidebar";

import { SidebarNavItem } from "./SidebarNavigationItem";

interface SidebarNavProps {
  isCollapsed: boolean;
}

export const SidebarNav = ({ isCollapsed }: SidebarNavProps) => {
  return (
    <nav className="px-3 py-4">
      <ul className="space-y-1">
        {navigation.map((item) => (
          <SidebarNavItem key={item.href} {...item} isCollapsed={isCollapsed} />
        ))}
      </ul>
    </nav>
  );
};
