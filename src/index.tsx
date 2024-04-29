import React from "react";
import ReactDOM from "react-dom/client";
import './theme/bootstrap.scss'
import PublicoRoutes from "./router/PublicoRoutes";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { inject } from "@vercel/analytics";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";

inject();

Sentry.init({
  dsn: "https://9975d9646ca4c2e0a43c7dae8f11d2d0@o4507169705951232.ingest.de.sentry.io/4507169726988368",
  integrations: [
    Sentry.replayIntegration({
      // Remove below when in production with actual user data
      maskAllText: false,
      blockAllMedia: false
    }),
  ],
  // Session Replay
  replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PublicoRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
