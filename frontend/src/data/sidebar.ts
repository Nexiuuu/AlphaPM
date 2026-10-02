import type { ParseKeys } from "i18next";
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
  label: ParseKeys<"sidebar">;
  href: string;
  icon: LucideIcon;
}

export const navigation: NavigationItem[] = [
  {
    label: "dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "teams",
    href: "/teams",
    icon: Users,
  },
  {
    label: "analytics",
    href: "/analytics",
    icon: ChartColumn,
  },
  {
    label: "settings",
    href: "/settings",
    icon: Settings,
  },
];
