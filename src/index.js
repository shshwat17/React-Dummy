import React, { Profiler, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import CustomErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { IndexedDBProvider } from "./Context/IndexedDBContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <CustomErrorBoundary>
      <IndexedDBProvider>
        <Profiler
          id="App"
          onRender={(id, phase, actualDuration) => {
            console.log({ id, phase, actualDuration });
            // You can send this data to your analytics or logging service
          }}
        >
          <App />
        </Profiler>
      </IndexedDBProvider>
    </CustomErrorBoundary>
  </StrictMode>
);
