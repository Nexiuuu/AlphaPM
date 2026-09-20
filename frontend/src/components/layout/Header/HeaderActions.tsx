import { HeaderNewProject } from "./HeaderNewProject";
import { HeaderNotification } from "./HeaderNotification";
import { HeaderSearch } from "./HeaderSearch";

export const HeaderActions = () => {
    return (
        <div className="flex shrink-0 items-center gap-2 sm:gap-5">
            <HeaderSearch />

            <HeaderNotification />

            <HeaderNewProject />
        </div>
    );
};
