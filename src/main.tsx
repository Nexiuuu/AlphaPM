// React
import React from "react";
import ReactDOM from "react-dom/client";

// Router
import { RouterProvider } from "react-router-dom";

// Styles
import "./index.css";

// App
import { router } from "./app/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);