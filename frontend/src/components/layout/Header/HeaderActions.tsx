import { HeaderNewProject } from "./HeaderNewProject"
import { HeaderSearch } from "./HeaderSearch"

export const HeaderActions = () => {
    return (
        <div className="flex gap-5">
            <HeaderNewProject />

            <HeaderSearch />
        </div>
    )
}