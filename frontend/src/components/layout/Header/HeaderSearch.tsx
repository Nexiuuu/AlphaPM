import { Search, X } from "lucide-react";
import { useState, useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";

export const HeaderSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useClickOutside(searchRef, () => setIsOpen(false));

    return (
        <div className="flex items-center justify-end relative">
            <div
                ref={searchRef}
                className={`
                    flex items-center h-10 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${isOpen ? "w-80 px-4" : "w-10 px-0 border-transparent bg-transparent"}
                `}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    autoFocus={isOpen}
                    className={`
                        w-full bg-transparent text-neutral-200 placeholder-neutral-500 focus:outline-none text-sm
                        transition-opacity duration-200
                        ${isOpen ? "opacity-100 delay-100" : "opacity-0 pointer-events-none"}
                    `}
                />

                {isOpen ? (
                    <button
                        onClick={() => setIsOpen(false)}
                        className="cursor-pointer text-neutral-400 hover:text-neutral-200 ml-2 shrink-0"
                        aria-label="Close Search"
                    >
                        <X size={18} />
                    </button>
                ) : (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer text-neutral-400 hover:text-[var(--color-text)] p-2 rounded-full hover:bg-neutral-800 shrink-0 absolute right-0"
                        aria-label="Open Search"
                    >
                        <Search size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};