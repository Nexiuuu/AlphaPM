import { useMatches } from "react-router-dom";

interface RouteHandle {
    title?: string;
}

export const usePageTitle = (): string => {
    const matches = useMatches();

    // We retrieve the last (most nested) matching route
    const currentMatch = matches[matches.length - 1];

    // safely cast the handle to our interface
    const handle = currentMatch?.handle as RouteHandle | undefined;

    // returns the title; if the requested title is not found, it returns the Dashboard
    return handle?.title ?? "404 debug";
}