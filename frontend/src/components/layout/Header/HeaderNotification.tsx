import { Bell, X } from "lucide-react";
import { useRef, useState } from "react";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { HeaderNotificationPanel } from "./HeaderNotificationPanel";

export const HeaderNotification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    useClickOutside(notificationRef, () => setIsOpen(false));

    return (
        <div ref={notificationRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                aria-label={isOpen ? "Zamknij powiadomienia" : "Otwórz powiadomienia"}
                aria-expanded={isOpen}
                aria-controls="notifications-panel"
                className="
          relative
          flex
          h-10
          w-10
          cursor-pointer
          items-center
          justify-center
          overflow-hidden
          rounded-full
          text-neutral-400
          hover:bg-neutral-800
          hover:text-neutral-200
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--color-primary)]
        "
            >
                <span
                    className={`
            absolute
            inset-0
            flex
            items-center
            justify-center
            transition-all
            duration-300
            ease-in-out
            ${isOpen ? "scale-75 rotate-90 opacity-0" : "rotate-0 scale-100 opacity-100"}
          `}
                >
                    <Bell size={18} />
                </span>

                <span
                    className={`
            absolute
            inset-0
            flex
            items-center
            justify-center
            transition-all
            duration-300
            ease-in-out
            ${isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"}
          `}
                >
                    <X size={18} />
                </span>
            </button>

            {isOpen ?
                <HeaderNotificationPanel notifications={0} />
                :
                null
            }
        </div>
    );
};
