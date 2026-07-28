import React from 'react'
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Drawer } from "antd";
import { useAccessibility } from "../../context/AccessibilityContext";
import "./AccessibilityWidget.css";

const toggleOptions = [
  { key: "textSpacing", label: "Text Spacing", badge: "A A" },
  { key: "lineHeight", label: "Line Height", badge: "LH" },
  { key: "dyslexiaFriendly", label: "Dyslexia Friendly", badge: "Df" },
  { key: "adhdMode", label: "ADHD Mode", badge: "AD" },
  { key: "highContrast", label: "High Contrast", badge: "HC" },
  { key: "saturation", label: "Saturation", badge: "SAT" },
  { key: "invertColors", label: "Invert Colors", badge: "INV" },
  { key: "highlightLinks", label: "Highlight Links", badge: "LINK" },
  { key: "textToSpeech", label: "Text To Speech", badge: "TTS" },
  { key: "cursor", label: "Cursor", badge: "CUR" },
  { key: "pauseAnimations", label: "Pause Animation", badge: "PAUSE" },
  { key: "hideImages", label: "Hide Images", badge: "IMG" },
];

function AccessibilityCard({
  badge,
  label,
  active = false,
  disabled = false,
  onClick,
  helperText,
}) {
  return (
    <button
      type="button"
      className={`a11y-option-card ${active ? "is-active" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
    >
      <span className="a11y-option-badge">{badge}</span>
      <span className="a11y-option-label">{label}</span>
      {helperText ? <span className="a11y-option-helper">{helperText}</span> : null}
      {active ? <span className="a11y-option-check">ON</span> : null}
    </button>
  );
}

const AccessibilityWidget = () => {
  const {
    settings,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    toggleSetting,
    increaseFontSize,
    decreaseFontSize,
    resetAllSettings,
  } = useAccessibility();

  useEffect(() => {
    const handleShortcut = (event) => {
      if (event.ctrlKey && event.key === "F2") {
        event.preventDefault();
        openDrawer();
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, [openDrawer]);

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        placement="left"
        closable={false}
        width={500}
        zIndex={3601}
        rootClassName="a11y-drawer-root"
      >
        <div className="a11y-widget-root">
          <div className="a11y-drawer-header">
            <div className="a11y-header-copy">
              <span className="a11y-section-kicker">Innovate Securities</span>
              <h3>Accessibility options</h3>
              <p>Adjust readability, contrast, motion, and visual comfort across the site.</p>
            </div>
            <div className="a11y-header-actions">
              <span className="a11y-shortcut-pill">Ctrl+F2</span>
              <button
                type="button"
                className="a11y-close-button"
                onClick={closeDrawer}
                aria-label="Close accessibility options"
              >
                X
              </button>
            </div>
          </div>

          <div className="a11y-panel-section a11y-font-section">
            <div className="a11y-section-head">
              <div>
                <span className="a11y-section-kicker">Typography</span>
                <h4>Font size</h4>
              </div>
              <div className="a11y-font-levels" aria-label="Current font size level">
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className={`a11y-font-level-dot ${
                      level <= settings.fontSizeLevel ? "is-active" : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="a11y-font-grid">
              <AccessibilityCard
                badge="T+"
                label="Bigger Text"
                active={settings.fontSizeLevel > 0}
                disabled={settings.fontSizeLevel >= 4}
                onClick={increaseFontSize}
                helperText={`Level ${settings.fontSizeLevel}/4`}
              />

              <AccessibilityCard
                badge="T-"
                label="Smaller Text"
                active={settings.fontSizeLevel > 0}
                disabled={settings.fontSizeLevel === 0}
                onClick={decreaseFontSize}
                helperText={settings.fontSizeLevel === 0 ? "Default" : "Step down"}
              />
            </div>
          </div>

          <div className="a11y-panel-section">
            <div className="a11y-section-head">
              <div>
                <span className="a11y-section-kicker">Site Tools</span>
                <h4>Accessibility controls</h4>
              </div>
            </div>

            <div className="a11y-options-grid">
              {toggleOptions.map((option) => (
                <AccessibilityCard
                  key={option.key}
                  badge={option.badge}
                  label={option.label}
                  active={settings[option.key]}
                  onClick={() => toggleSetting(option.key)}
                />
              ))}
            </div>
          </div>

          <div className="a11y-footer">
            <p>Your selections apply globally across all pages until reset.</p>

            <button
              type="button"
              className="a11y-reset-button"
              onClick={resetAllSettings}
            >
              Reset All Settings
            </button>
          </div>
        </div>
      </Drawer>

      {createPortal(
        <button
          type="button"
          className="a11y-floating-button a11y-exempt"
          onClick={openDrawer}
          aria-label="Open accessibility options"
        >
          <span className="a11y-floating-button-mark">Aa</span>
          <span className="a11y-floating-button-text">
            <strong>Accessibility</strong>
            <small>Ctrl+F2</small>
          </span>
        </button>,
        document.body,
      )}
    </>
  );
};

export default AccessibilityWidget;
