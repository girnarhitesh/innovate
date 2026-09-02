
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.jsx";

/**
 * Server/prerender entry — renders App for a given URL into an HTML string.
 * @param {string} url Absolute path, e.g. "/" or "/privacy-policy"
 * @returns {string} HTML markup for #root
 */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App isPrerender />
    </StaticRouter>,
  );
}
