// React
import React from "react";
import ReactDOM from "react-dom/client";

// Router
import { RouterProvider } from "react-router-dom";

// Styles
import "./index.css";

// App
import { router } from "./app/router";
import { ThemeProvider } from "./app/theme/ThemeProvider";
import { AnimationsProvider } from "./components/decorations/effects/animations/AnimationsProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AnimationsProvider>
        <RouterProvider router={router} />
      </AnimationsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
