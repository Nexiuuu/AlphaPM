import { HeaderNewProject } from "./HeaderNewProject"
import { HeaderSearch } from "./HeaderSearch"

export const HeaderActions = () => {
    return (
        <div className="flex shrink-0 gap-2 sm:gap-5">
            <HeaderSearch />

            <HeaderNewProject />
        </div>
    )
}
