import { useEffect, type RefObject } from "react";

export const useClickOutside = (
    ref: RefObject<HTMLElement | null>,
    handler: () => void,
    listenEscape: boolean = true
) => {
    useEffect(() => {
        const handleClick = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler();
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (listenEscape && event.key === "Escape") {
                handler();
            }
        };

        document.addEventListener("mousedown", handleClick);
        document.addEventListener("touchstart", handleClick);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("touchstart", handleClick);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [ref, handler, listenEscape]);
};