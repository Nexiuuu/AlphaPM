import { SidebarLogo } from "./SidebarLogo";
import { SidebarNav } from "./SidebarNavigation";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarWS } from "./SidebarWorkspace";

export const Sidebar = () => {
    return (
        <aside
            className="
                flex
                flex-col
                border-r
                border-[var(--color-border)]
                bg-[var(--color-surface)]
              "
        >
            <SidebarLogo />

            <SidebarNav />

            <SidebarWS />

            <SidebarProfile />
        </aside>
    );
};