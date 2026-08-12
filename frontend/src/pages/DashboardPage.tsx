import { useEffect } from "react";

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
        </section>
    );
};