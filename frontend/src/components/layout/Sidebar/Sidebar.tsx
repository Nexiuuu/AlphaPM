import { Menu, X } from "lucide-react";
import { useState } from "react";

import { SidebarLogo } from "./SidebarLogo";
import { SidebarNav } from "./Navigation/SidebarNavigation";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarWS } from "./Workspace/SidebarWorkspace";

interface SidebarProps {
  isCollapsed: boolean;
  onCollapseToggle: () => void;
  onExpand: () => void;
}

export const Sidebar = ({
  isCollapsed,
  onCollapseToggle,
  onExpand,
}: SidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuClass = isMobileMenuOpen
    ? "max-h-[900px] opacity-100"
    : "pointer-events-none max-h-0 opacity-0";

  return (
    <aside
      className="
        relative
        flex
        min-w-0
        flex-col
        border-r
        border-[var(--color-border)]
        bg-[var(--color-surface)]
      "
    >
      <SidebarLogo
        isCollapsed={isCollapsed}
        onCollapseToggle={onCollapseToggle}
      />

      <button
        type="button"
        className="absolute right-4 top-5 z-10 rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] md:hidden"
        aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((current) => !current)}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`${mobileMenuClass} order-1 overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:pointer-events-auto md:order-4 md:mt-auto md:max-h-none md:overflow-visible md:opacity-100`}
      >
        <SidebarProfile isCollapsed={isCollapsed} onExpand={onExpand} />
      </div>

      <div
        className={`${mobileMenuClass} order-2 overflow-hidden transition-[max-height,opacity] delay-75 duration-300 ease-out md:pointer-events-auto md:max-h-none md:opacity-100`}
      >
        <SidebarNav isCollapsed={isCollapsed} />
      </div>

      <div
        className={`${mobileMenuClass} order-3 overflow-hidden transition-[max-height,opacity] delay-100 duration-300 ease-out md:pointer-events-auto md:max-h-none md:opacity-100`}
      >
        <SidebarWS isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
};
