// import { useEffect } from "react";

import { DashboardStats } from "./DashboardStats/DashboardStats";

export const DashboardPage = () => {
  /*  useEffect(() => {
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
    }, []); */

  return (
    <section>
      <DashboardStats />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[2f_1fr] gap-4">
        <div
          className="
                    border 
                    border-dashed 
                    border-[var(--color-text-muted)] 
                    p-4 
                    rounded-lg
                  "
        >
          <span className="text-[var(--color-text-muted)] text-sm">
            Recent Projects Container
          </span>
        </div>

        <div
          className="
                    border 
                    border-dashed 
                    border-[var(--color-text-muted)] 
                    p-4 
                    rounded-lg
                  "
        >
          <span className="text-[var(--color-text-muted)] text-sm">
            Activity Container
          </span>
        </div>
      </div>
    </section>
  );
};
