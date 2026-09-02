import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "./utils/globalAnimationObserver";
import faviconIco from "./assets/favicon.ico";

const applyFavicons = () => {
  const faviconLinks = [
    { rel: "icon", type: "image/x-icon", href: faviconIco },
    { rel: "shortcut icon", type: "image/x-icon", href: faviconIco },
  ];

  faviconLinks.forEach(({ rel, type, href }) => {
    let link = document.head.querySelector(
      `link[rel="${rel}"][type="${type}"]`,
    );

    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      link.type = type;
      document.head.appendChild(link);
    }

    link.href = href;
  });
};

applyFavicons();

/** Redirect legacy HashRouter bookmarks (#/path) to clean BrowserRouter paths. */
function LegacyHashRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const { hash, search } = window.location;
    if (!hash.startsWith("#/")) return;

    navigate(`${hash.slice(1)}${search || ""}`, { replace: true });
  }, [navigate]);

  return null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LegacyHashRedirect />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
