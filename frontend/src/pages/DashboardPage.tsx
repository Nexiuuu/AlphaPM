import { useEffect } from "react";
import { Button } from "../components/ui/Button/Button";

export const DashboardPage = () => {
    useEffect(() => {
        fetch("/api/public/settings")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                return response.json();
            })
            .then(data => {
                console.log("default settings:", data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <section>
            <h1>Dashboard</h1>

            <Button>
                Primary
            </Button>

            <Button variant="secondary">
                Secondary
            </Button>

            <Button variant="ghost">
                Ghost
            </Button>

            <Button disabled>
                Disabled
            </Button>
        </section>
    );
};