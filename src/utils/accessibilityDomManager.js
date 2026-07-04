const TEXT_ELEMENTS_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
  "a",
  "li",
  "button",
  "label",
  "input",
  "textarea",
  "select",
  "small",
  "strong",
  "em",
  "b",
  "td",
  "th",
  "blockquote",
  "figcaption",
].join(", ");

const READABLE_ELEMENTS_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "a",
  "button",
  "label",
  "li",
  "td",
  "th",
  "blockquote",
  "figcaption",
].join(", ");

const INTERACTIVE_ELEMENTS_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "[role='button']",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

const FONT_SCALE_MAP = [1, 1.08, 1.16, 1.24, 1.32];
const FOCUS_BAND_HALF_HEIGHT = 90;

const createDefaultSettings = () => ({
  fontSizeLevel: 0,
  textSpacing: false,
  lineHeight: false,
  dyslexiaFriendly: false,
  adhdMode: false,
  saturation: false,
  invertColors: false,
  highlightLinks: false,
  textToSpeech: false,
  cursor: false,
  pauseAnimations: false,
  hideImages: false,
});

class AccessibilityDomManager {
  constructor() {
    this.settings = createDefaultSettings();
    this.mutationObserver = null;
    this.speechHandler = null;
    this.pointerHandler = null;
    this.mouseDownHandler = null;
    this.mouseUpHandler = null;
    this.resizeHandler = null;
    this.cursorRing = null;
    this.cursorDot = null;
    this.adhdTopMask = null;
    this.adhdBottomMask = null;
    this.lastPointer = {
      x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
      y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
      interactive: false,
    };
  }

  get isReducedMotionEnabled() {
    return this.settings.pauseAnimations || this.settings.adhdMode;
  }

  get hasTypographyAdjustments() {
    return (
      this.settings.fontSizeLevel > 0 ||
      this.settings.textSpacing ||
      this.settings.lineHeight
    );
  }

  getAppRoot() {
    return document.querySelector(".a11y-app-shell") || document.body;
  }

  init() {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    this.ensureOverlayElements();
    this.ensurePointerTracking();
    this.ensureMutationObserver();
    this.cacheTextMetrics(this.getAppRoot());
  }

  ensureOverlayElements() {
    if (!document.body) {
      return;
    }

    if (!this.cursorRing) {
      this.cursorRing = document.createElement("div");
      this.cursorRing.className = "a11y-cursor-ring";
      document.body.appendChild(this.cursorRing);
    }

    if (!this.cursorDot) {
      this.cursorDot = document.createElement("div");
      this.cursorDot.className = "a11y-cursor-dot";
      document.body.appendChild(this.cursorDot);
    }

    if (!this.adhdTopMask) {
      this.adhdTopMask = document.createElement("div");
      this.adhdTopMask.className = "a11y-focus-mask a11y-focus-mask-top";
      document.body.appendChild(this.adhdTopMask);
    }

    if (!this.adhdBottomMask) {
      this.adhdBottomMask = document.createElement("div");
      this.adhdBottomMask.className = "a11y-focus-mask a11y-focus-mask-bottom";
      document.body.appendChild(this.adhdBottomMask);
    }
  }

  ensurePointerTracking() {
    if (this.pointerHandler) {
      return;
    }

    this.pointerHandler = (event) => {
      this.lastPointer = {
        x: event.clientX,
        y: event.clientY,
        interactive: Boolean(event.target?.closest(INTERACTIVE_ELEMENTS_SELECTOR)),
      };

      document.body.dataset.a11yCursorInteractive = this.lastPointer.interactive
        ? "true"
        : "false";

      document.documentElement.style.setProperty(
        "--a11y-cursor-x",
        `${this.lastPointer.x}px`,
      );
      document.documentElement.style.setProperty(
        "--a11y-cursor-y",
        `${this.lastPointer.y}px`,
      );

      this.updateAdhdMask();
    };

    this.mouseDownHandler = () => {
      document.body.dataset.a11yCursorPressed = "true";
    };

    this.mouseUpHandler = () => {
      document.body.dataset.a11yCursorPressed = "false";
    };

    this.resizeHandler = () => {
      this.refreshTextMetrics();
      this.updateAdhdMask();
    };

    window.addEventListener("mousemove", this.pointerHandler, { passive: true });
    window.addEventListener("mousedown", this.mouseDownHandler, { passive: true });
    window.addEventListener("mouseup", this.mouseUpHandler, { passive: true });
    window.addEventListener("resize", this.resizeHandler, { passive: true });
  }

  ensureMutationObserver() {
    const appRoot = this.getAppRoot();

    if (this.mutationObserver || !appRoot) {
      return;
    }

    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
          }

          this.cacheTextMetrics(node);

          if (this.hasTypographyAdjustments) {
            this.applyTextAdjustments(node);
          }
        });
      });

      this.syncMediaPlayback();
    });

    this.mutationObserver.observe(appRoot, {
      childList: true,
      subtree: true,
    });
  }

  getTextElements(root = this.getAppRoot()) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) {
      return [];
    }

    const elements = [];

    if (root.matches?.(TEXT_ELEMENTS_SELECTOR)) {
      elements.push(root);
    }

    return [...elements, ...root.querySelectorAll(TEXT_ELEMENTS_SELECTOR)];
  }

  cacheTextMetrics(root = this.getAppRoot()) {
    this.getTextElements(root).forEach((element) => {
      if (!element.dataset.a11yBaseFontSize) {
        const computedStyle = window.getComputedStyle(element);
        const fontSize = parseFloat(computedStyle.fontSize);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        const letterSpacing = parseFloat(computedStyle.letterSpacing);
        const wordSpacing = parseFloat(computedStyle.wordSpacing);

        element.dataset.a11yInlineFontSize = element.style.fontSize || "";
        element.dataset.a11yInlineLineHeight = element.style.lineHeight || "";
        element.dataset.a11yInlineLetterSpacing = element.style.letterSpacing || "";
        element.dataset.a11yInlineWordSpacing = element.style.wordSpacing || "";
        element.dataset.a11yBaseFontSize = Number.isFinite(fontSize)
          ? String(fontSize)
          : "16";
        element.dataset.a11yBaseLineHeight = Number.isFinite(lineHeight)
          ? String(lineHeight)
          : String((fontSize || 16) * 1.5);
        element.dataset.a11yBaseLetterSpacing = Number.isFinite(letterSpacing)
          ? String(letterSpacing)
          : "0";
        element.dataset.a11yBaseWordSpacing = Number.isFinite(wordSpacing)
          ? String(wordSpacing)
          : "0";
      }
    });
  }

  restoreOriginalInlineStyles(element) {
    const fontSize = element.dataset.a11yInlineFontSize || "";
    const lineHeight = element.dataset.a11yInlineLineHeight || "";
    const letterSpacing = element.dataset.a11yInlineLetterSpacing || "";
    const wordSpacing = element.dataset.a11yInlineWordSpacing || "";

    if (fontSize) {
      element.style.fontSize = fontSize;
    } else {
      element.style.removeProperty("font-size");
    }

    if (lineHeight) {
      element.style.lineHeight = lineHeight;
    } else {
      element.style.removeProperty("line-height");
    }

    if (letterSpacing) {
      element.style.letterSpacing = letterSpacing;
    } else {
      element.style.removeProperty("letter-spacing");
    }

    if (wordSpacing) {
      element.style.wordSpacing = wordSpacing;
    } else {
      element.style.removeProperty("word-spacing");
    }
  }

  updateTextElement(element) {
    const baseFontSize = parseFloat(element.dataset.a11yBaseFontSize || "16");
    const baseLineHeight = parseFloat(
      element.dataset.a11yBaseLineHeight || String(baseFontSize * 1.5),
    );
    const baseLetterSpacing = parseFloat(
      element.dataset.a11yBaseLetterSpacing || "0",
    );
    const baseWordSpacing = parseFloat(element.dataset.a11yBaseWordSpacing || "0");

    const fontScale = FONT_SCALE_MAP[this.settings.fontSizeLevel] || 1;
    const lineHeightScale = this.settings.lineHeight ? 1.2 : 1;
    const letterSpacingBoost = this.settings.textSpacing ? baseFontSize * 0.04 : 0;
    const wordSpacingBoost = this.settings.textSpacing ? baseFontSize * 0.12 : 0;

    element.style.fontSize = `${(baseFontSize * fontScale).toFixed(2)}px`;
    element.style.lineHeight = `${(baseLineHeight * lineHeightScale).toFixed(2)}px`;
    element.style.letterSpacing = `${(baseLetterSpacing + letterSpacingBoost).toFixed(2)}px`;
    element.style.wordSpacing = `${(baseWordSpacing + wordSpacingBoost).toFixed(2)}px`;
  }

  applyTextAdjustments(root = this.getAppRoot()) {
    this.getTextElements(root).forEach((element) => {
      this.updateTextElement(element);
    });
  }

  clearTextAdjustments(root = this.getAppRoot()) {
    this.getTextElements(root).forEach((element) => {
      this.restoreOriginalInlineStyles(element);
    });
  }

  refreshTextMetrics() {
    const appRoot = this.getAppRoot();

    if (!appRoot) {
      return;
    }

    const textElements = this.getTextElements(appRoot);

    textElements.forEach((element) => {
      this.restoreOriginalInlineStyles(element);
      delete element.dataset.a11yBaseFontSize;
      delete element.dataset.a11yBaseLineHeight;
      delete element.dataset.a11yBaseLetterSpacing;
      delete element.dataset.a11yBaseWordSpacing;
    });

    this.cacheTextMetrics(appRoot);

    if (this.hasTypographyAdjustments) {
      this.applyTextAdjustments(appRoot);
    }
  }

  applyBodyState() {
    const appRoot = this.getAppRoot();

    if (!document.body || !appRoot) {
      return;
    }

    const appState = {
      a11yDyslexia: this.settings.dyslexiaFriendly ? "true" : "false",
      a11yAdhdMode: this.settings.adhdMode ? "true" : "false",
      a11yHighlightLinks: this.settings.highlightLinks ? "true" : "false",
      a11yLargeCursor: this.settings.cursor ? "true" : "false",
      a11yPauseAnimations: this.settings.pauseAnimations ? "true" : "false",
      a11yHideImages: this.settings.hideImages ? "true" : "false",
    };

    Object.entries(appState).forEach(([key, value]) => {
      document.body.dataset[key] = value;
      appRoot.dataset[key] = value;
    });
  }

  applyVisualFilters() {
    const filters = [];

    if (this.settings.invertColors) {
      filters.push("invert(1)", "hue-rotate(180deg)");
    }

    if (this.settings.saturation) {
      filters.push("saturate(1.35)", "contrast(1.04)");
    }

    document.documentElement.style.setProperty(
      "--a11y-visual-filter",
      filters.length > 0 ? filters.join(" ") : "none",
    );
  }

  applySpeechMode() {
    if (this.settings.textToSpeech && !this.speechHandler) {
      this.speechHandler = (event) => {
        const target = event.target?.closest(READABLE_ELEMENTS_SELECTOR);

        if (!target || target.closest(".a11y-widget-root")) {
          return;
        }

        const text = (target.getAttribute("aria-label") || target.innerText || "")
          .replace(/\s+/g, " ")
          .trim();

        if (text.length < 2 || !window.speechSynthesis) {
          return;
        }

        const utterance = new SpeechSynthesisUtterance(text.slice(0, 260));
        utterance.rate = 1;
        utterance.pitch = 1;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      };

      document.addEventListener("click", this.speechHandler, true);
    }

    if (!this.settings.textToSpeech && this.speechHandler) {
      document.removeEventListener("click", this.speechHandler, true);
      this.speechHandler = null;
      window.speechSynthesis?.cancel();
    }
  }

  syncMediaPlayback() {
    const appRoot = this.getAppRoot();

    if (!appRoot) {
      return;
    }

    appRoot.querySelectorAll("video").forEach((video) => {
      if (this.isReducedMotionEnabled) {
        if (!video.paused) {
          video.dataset.a11yWasPlaying = "true";
          video.pause();
        }
        return;
      }

      if (video.dataset.a11yWasPlaying === "true") {
        const playPromise = video.play();

        if (playPromise?.catch) {
          playPromise.catch(() => {});
        }

        delete video.dataset.a11yWasPlaying;
      }
    });
  }

  updateAdhdMask() {
    if (!this.adhdTopMask || !this.adhdBottomMask) {
      return;
    }

    if (!this.settings.adhdMode) {
      this.adhdTopMask.style.height = "0px";
      this.adhdBottomMask.style.height = "0px";
      this.adhdBottomMask.style.top = "100vh";
      return;
    }

    const viewportHeight = window.innerHeight;
    const bandTop = Math.max(0, this.lastPointer.y - FOCUS_BAND_HALF_HEIGHT);
    const bandBottom = Math.min(
      viewportHeight,
      this.lastPointer.y + FOCUS_BAND_HALF_HEIGHT,
    );

    this.adhdTopMask.style.height = `${bandTop}px`;
    this.adhdBottomMask.style.top = `${bandBottom}px`;
    this.adhdBottomMask.style.height = `${Math.max(0, viewportHeight - bandBottom)}px`;
  }

  apply(settings = createDefaultSettings()) {
    this.settings = {
      ...createDefaultSettings(),
      ...settings,
    };

    this.init();
    this.applyBodyState();
    this.applyVisualFilters();

    if (this.hasTypographyAdjustments) {
      this.refreshTextMetrics();
    } else {
      this.clearTextAdjustments(this.getAppRoot());
    }

    this.applySpeechMode();
    this.syncMediaPlayback();
    this.updateAdhdMask();
  }

  destroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }

    if (this.pointerHandler) {
      window.removeEventListener("mousemove", this.pointerHandler);
      this.pointerHandler = null;
    }

    if (this.mouseDownHandler) {
      window.removeEventListener("mousedown", this.mouseDownHandler);
      this.mouseDownHandler = null;
    }

    if (this.mouseUpHandler) {
      window.removeEventListener("mouseup", this.mouseUpHandler);
      this.mouseUpHandler = null;
    }

    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
      this.resizeHandler = null;
    }

    if (this.speechHandler) {
      document.removeEventListener("click", this.speechHandler, true);
      this.speechHandler = null;
    }

    [this.cursorRing, this.cursorDot, this.adhdTopMask, this.adhdBottomMask].forEach(
      (element) => {
        if (element?.parentNode) {
          element.parentNode.removeChild(element);
        }
      },
    );

    this.cursorRing = null;
    this.cursorDot = null;
    this.adhdTopMask = null;
    this.adhdBottomMask = null;
  }
}

export const accessibilityDomManager = new AccessibilityDomManager();
export { createDefaultSettings, FONT_SCALE_MAP };
