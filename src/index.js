import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import CustomErrorBoundary from "./ErrorBoundary/ErrorBoundary";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <CustomErrorBoundary>
      <App />
    </CustomErrorBoundary>
  </StrictMode>,
);
