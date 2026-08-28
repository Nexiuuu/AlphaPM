import { navigation } from "../../../data/sidebar";

import { SidebarNavItem } from "./SidebarNavigationItem";

export const SidebarNav = () => {
  return (
    <nav className="px-3 py-4">
      <ul className="space-y-1">
        {navigation.map((item) => (
          <SidebarNavItem key={item.href} {...item} />
        ))}
      </ul>
    </nav>
  );
};
