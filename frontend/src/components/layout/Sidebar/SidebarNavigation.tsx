import { SidebarNavItem } from "./SidebarNavigationItem";
import { LayoutDashboard } from "lucide-react";


const navigation = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: LayoutDashboard,
  },
];

export const SidebarNav = () => {
  return (
    <nav>
      <ul>
        {navigation.map((item) => (
          <SidebarNavItem
            key={item.href}
            label={item.label}
            href={item.href}
          />
        ))}
      </ul>
    </nav>
  );
};