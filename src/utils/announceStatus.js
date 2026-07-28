/**
 * Announce status messages to assistive technology without moving focus.
 * WCAG 2.1 SC 4.1.3 Status Messages.
 */
export const announceStatus = (message, { assertive = false } = {}) => {
  if (typeof document === "undefined") {
    return;
  }

  const text = String(message || "").trim();

  if (!text) {
    return;
  }

  const regionId = assertive ? "a11y-status-assertive" : "a11y-status-polite";
  const region = document.getElementById(regionId);

  if (!region) {
    return;
  }

  // Clear then set so repeated identical messages are re-announced.
  region.textContent = "";

  window.requestAnimationFrame(() => {
    region.textContent = text;
  });
};

export const clearStatusAnnouncement = () => {
  if (typeof document === "undefined") {
    return;
  }

  const polite = document.getElementById("a11y-status-polite");
  const assertive = document.getElementById("a11y-status-assertive");

  if (polite) {
    polite.textContent = "";
  }

  if (assertive) {
    assertive.textContent = "";
  }
};
