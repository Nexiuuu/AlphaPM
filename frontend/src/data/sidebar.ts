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
    label: "Panel Główny",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Projekty",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Zadania",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Kalendarz",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Zespoły",
    href: "/teams",
    icon: Users,
  },
  {
    label: "Analityka",
    href: "/analytics",
    icon: ChartColumn,
  },
  {
    label: "Ustawienia",
    href: "/settings",
    icon: Settings,
  },
];
