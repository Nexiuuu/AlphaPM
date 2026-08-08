import {
  ChartColumn,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  CalendarDays,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Team",
    href: "/team",
    icon: Users,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: ChartColumn,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];