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
            LOGO

            <SidebarNav />

            <SidebarWS />

            <SidebarProfile />
        </aside>
    );
};