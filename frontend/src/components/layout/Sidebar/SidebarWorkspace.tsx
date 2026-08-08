import { workspaces } from "../../../data/workspace"
import { SidebarWsItem } from "./SidebarWorkspaceItem"

export const SidebarWS = () => {
    return (
        <section>
            <div className="group flex items-center justify-between px-2 py-1.5 cursor-pointer">
                <h2>Workspaces</h2>

                <button className="
                    p-0.5
                    text-[var(--color-text-muted)]
                    opacity-0 
                    group-hover:opacity-100 
                    transition-opacity 
                    duration-200 
                    hover:text-[var(--color-text)]
                    hover:cursor-pointer
                  "
                >
                    +
                </button>
            </div>

            <ul className="mt-1">
                {workspaces.map((workspace) => (
                    <SidebarWsItem
                        key={workspace.id}
                        {...workspace}
                    />
                ))}
            </ul>
        </section>
    )
}