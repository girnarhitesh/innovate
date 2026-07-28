import React from "react";

/**
 * Always-mounted live regions for status / alert announcements.
 * Visually hidden; content is set via announceStatus().
 */
const StatusLiveRegions = () => (
  <>
    <div
      id="a11y-status-polite"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
    <div
      id="a11y-status-assertive"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className="sr-only"
    />
  </>
);

export default StatusLiveRegions;
