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
const EXEMPT_SELECTOR = ".a11y-exempt";
const SPEECH_CHUNK_SIZE = 420;
const NESTED_READABLE_SELECTOR = "p, h1, h2, h3, h4, h5, h6, li, td, th, blockquote, figcaption, label, button, a";

const ONES = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const TENS = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

const numberUnder100ToWords = (value) => {
  if (value < 20) {
    return ONES[value];
  }

  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return ones ? `${TENS[tens]} ${ONES[ones]}` : TENS[tens];
};

const yearToSpeechWords = (yearText) => {
  const year = Number(yearText);

  if (!Number.isFinite(year) || year < 1000 || year > 9999) {
    return yearText;
  }

  if (year % 1000 === 0) {
    return `${ONES[Math.floor(year / 1000)]} thousand`;
  }

  const century = Math.floor(year / 100);
  const remainder = year % 100;

  if (remainder === 0) {
    return `${numberUnder100ToWords(century)} hundred`;
  }

  if (remainder < 10) {
    return `${numberUnder100ToWords(century)} oh ${ONES[remainder]}`;
  }

  return `${numberUnder100ToWords(century)} ${numberUnder100ToWords(remainder)}`;
};

const protectAbbreviations = (text) =>
  text
    .replace(/\bPvt\./gi, "Private")
    .replace(/\bLtd\./gi, "Limited")
    .replace(/\bInc\./gi, "Incorporated")
    .replace(/\bCo\./gi, "Company")
    .replace(/\bMr\./gi, "Mister")
    .replace(/\bMrs\./gi, "Missus")
    .replace(/\bMs\./gi, "Miss")
    .replace(/\bDr\./gi, "Doctor")
    .replace(/\bNo\./gi, "Number")
    .replace(/\betc\./gi, "etcetera")
    .replace(/\be\.g\./gi, "for example")
    .replace(/\bi\.e\./gi, "that is")
    .replace(/\bISPL\b/g, "I S P L")
    .replace(/\bAMPI\b/g, "A M P I");

const prepareSpeechText = (rawText) => {
  let text = normalizeSpeechText(rawText);

  if (!text) {
    return "";
  }

  text = protectAbbreviations(text);

  // Prefer English year pronunciation: 1993 -> "nineteen ninety three"
  text = text.replace(/\b(19|20)\d{2}\b/g, (year) => yearToSpeechWords(year));

  text = text
    .replace(/&/g, " and ")
    .replace(/\//g, " slash ")
    .replace(/[_*#~`|]+/g, " ")
    .replace(/\s*([,;:])\s*/g, "$1 ")
    .replace(/\s+/g, " ")
    .trim();

  return text;
};

const normalizeSpeechText = (text) => (text || "").replace(/\s+/g, " ").trim();

const getElementSpeechText = (element) => {
  const ariaLabel = element.getAttribute("aria-label")?.trim();

  if (ariaLabel) {
    return prepareSpeechText(ariaLabel);
  }

  // Prefer visible text, then fall back to full text content.
  const visibleText = normalizeSpeechText(element.innerText || "");
  const fullText = normalizeSpeechText(element.textContent || "");
  const chosenText =
    visibleText.length >= 2 && visibleText.length >= fullText.length * 0.6
      ? visibleText
      : fullText || visibleText;

  return prepareSpeechText(chosenText);
};

const isInteractiveSpeechTarget = (element) =>
  Boolean(
    element?.closest?.(
      "a, button, input, textarea, select, summary, [role='button'], [role='link'], [role='menuitem'], [contenteditable='true']",
    ),
  );

const findSpeechTarget = (element) => {
  if (!element?.closest) {
    return null;
  }

  if (element.closest(EXEMPT_SELECTOR)) {
    return null;
  }

  // Keep native control/link behavior for screen readers — do not speak them.
  if (isInteractiveSpeechTarget(element)) {
    return null;
  }

  // Prefer the nearest semantic structure element so SR-style reading stays predictable.
  const structuralTarget = element.closest(
    "h1, h2, h3, h4, h5, h6, p, li, td, th, blockquote, figcaption, label, article, section",
  );

  if (structuralTarget && !structuralTarget.closest(EXEMPT_SELECTOR)) {
    return structuralTarget;
  }

  const readableTarget = element.closest(READABLE_ELEMENTS_SELECTOR);

  if (readableTarget && !isInteractiveSpeechTarget(readableTarget)) {
    return readableTarget;
  }

  return null;
};

const splitIntoSpeechSentences = (text) => {
  const sentences = [];
  let current = "";

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    current += char;

    const isTerminator = char === "." || char === "!" || char === "?";
    const nextChar = text[index + 1] || "";
    const endsSentence =
      isTerminator && (!nextChar || /\s/.test(nextChar)) && current.trim().length > 1;

    if (endsSentence) {
      sentences.push(current.trim());
      current = "";
    }
  }

  if (current.trim()) {
    sentences.push(current.trim());
  }

  return sentences.length > 0 ? sentences : [text];
};

const chunkTextForSpeech = (text, maxChunkSize = SPEECH_CHUNK_SIZE) => {
  const preparedText = prepareSpeechText(text);

  if (!preparedText) {
    return [];
  }

  if (preparedText.length <= maxChunkSize) {
    return [preparedText];
  }

  const chunks = [];
  const sentences = splitIntoSpeechSentences(preparedText);
  let currentChunk = "";

  const pushCurrentChunk = () => {
    if (currentChunk) {
      chunks.push(currentChunk);
      currentChunk = "";
    }
  };

  const splitLongSegment = (segment) => {
    const words = segment.split(" ");
    let segmentChunk = "";

    words.forEach((word) => {
      const candidate = segmentChunk ? `${segmentChunk} ${word}` : word;

      if (candidate.length <= maxChunkSize) {
        segmentChunk = candidate;
        return;
      }

      if (segmentChunk) {
        chunks.push(segmentChunk);
      }

      segmentChunk = word;
    });

    if (segmentChunk) {
      chunks.push(segmentChunk);
    }
  };

  sentences.forEach((sentence) => {
    const trimmedSentence = sentence.trim();

    if (!trimmedSentence) {
      return;
    }

    const candidate = currentChunk
      ? `${currentChunk} ${trimmedSentence}`
      : trimmedSentence;

    if (candidate.length <= maxChunkSize) {
      currentChunk = candidate;
      return;
    }

    pushCurrentChunk();

    if (trimmedSentence.length <= maxChunkSize) {
      currentChunk = trimmedSentence;
      return;
    }

    splitLongSegment(trimmedSentence);
  });

  pushCurrentChunk();

  return chunks.length > 0 ? chunks : [preparedText];
};

const INDIAN_ENGLISH_FEMALE_VOICE_NAMES = [
  "neerja",
  "heera",
  "raveena",
  "aditi",
  "kajal",
  "sonia",
];

const HINDI_VOICE_NAMES = [
  "veena",
  "lekha",
  "हिन्दी",
  "hindi",
];

const MALE_VOICE_NAMES = [
  "ravi",
  "prabhat",
  "hemant",
  "daniel",
  "david",
  "mark",
  "fred",
  "alex",
  "tom",
  "james",
  "george",
  "thomas",
  "oliver",
  "aaron",
  "arthur",
  "bruce",
  "albert",
  "reed",
  "steffan",
  "guy",
  "male",
];

const ENGLISH_FEMALE_FALLBACK_NAMES = [
  "google uk english female",
  "microsoft zira",
  "zira",
  "susan",
  "samantha",
  "karen",
  "moira",
  "tessa",
  "fiona",
  "victoria",
  "serena",
  "catherine",
  "hazel",
  "martha",
  "jenny",
  "aria",
  "emma",
  "mia",
  "ava",
  "female",
];

const normalizeVoiceName = (name = "") => name.toLowerCase().trim();

const isMaleVoice = (name = "") => {
  const normalized = normalizeVoiceName(name);

  if (normalized.includes("female") || normalized.includes("woman")) {
    return false;
  }

  return MALE_VOICE_NAMES.some((maleName) => normalized.includes(maleName));
};

const isHindiVoice = (voice) => {
  const name = normalizeVoiceName(voice.name);
  const lang = (voice.lang || "").toLowerCase();

  return (
    lang.startsWith("hi") ||
    HINDI_VOICE_NAMES.some((hindiName) => name.includes(hindiName))
  );
};

const isIndianEnglishVoice = (voice) => {
  const name = normalizeVoiceName(voice.name);
  const lang = (voice.lang || "").toLowerCase();

  return (
    lang.startsWith("en-in") ||
    (lang.startsWith("en") && name.includes("india"))
  );
};

const isExplicitFemaleVoice = (name = "") => {
  const normalized = normalizeVoiceName(name);

  return (
    normalized.includes("female") ||
    normalized.includes("woman") ||
    INDIAN_ENGLISH_FEMALE_VOICE_NAMES.some((femaleName) =>
      normalized.includes(femaleName),
    ) ||
    ENGLISH_FEMALE_FALLBACK_NAMES.some((femaleName) =>
      normalized.includes(femaleName),
    )
  );
};

const scorePreferredSpeechVoice = (voice) => {
  const name = normalizeVoiceName(voice.name);
  const lang = (voice.lang || "").toLowerCase();

  if (isHindiVoice(voice) || isMaleVoice(name)) {
    return 0;
  }

  // Only accept clearly female voices — never anonymous en-IN defaults (often male).
  if (!isExplicitFemaleVoice(name)) {
    return 0;
  }

  if (
    INDIAN_ENGLISH_FEMALE_VOICE_NAMES.some((femaleName) =>
      name.includes(femaleName),
    )
  ) {
    return isIndianEnglishVoice(voice) ? 300 : 180;
  }

  if (isIndianEnglishVoice(voice)) {
    return 250;
  }

  if (name.includes("google uk english female")) {
    return 120;
  }

  if (lang.startsWith("en-gb")) {
    return 90;
  }

  if (lang.startsWith("en-us") || lang.startsWith("en-au") || lang.startsWith("en")) {
    return 70;
  }

  return 0;
};

const pickPreferredSpeechVoice = (voices = []) => {
  if (!voices.length) {
    return null;
  }

  return [...voices]
    .map((voice) => ({
      voice,
      score: scorePreferredSpeechVoice(voice),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.voice || null;
};

const createDefaultSettings = () => ({
  fontSizeLevel: 0,
  textSpacing: false,
  lineHeight: false,
  dyslexiaFriendly: false,
  adhdMode: false,
  saturation: false,
  invertColors: false,
  highContrast: false,
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
    this.speechChunks = [];
    this.speechChunkIndex = 0;
    this.speechSessionId = 0;
    this.speechKeepAliveTimer = null;
    this.speechStartTimer = null;
    this.preferredSpeechVoice = null;
    this.voicesChangedHandler = null;
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
    return document.body;
  }

  isExcludedFromAdjustments(element) {
    return Boolean(element?.closest(EXEMPT_SELECTOR));
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
      this.cursorRing.setAttribute("aria-hidden", "true");
      this.cursorRing.setAttribute("role", "presentation");
      document.body.appendChild(this.cursorRing);
    }

    if (!this.cursorDot) {
      this.cursorDot = document.createElement("div");
      this.cursorDot.className = "a11y-cursor-dot";
      this.cursorDot.setAttribute("aria-hidden", "true");
      this.cursorDot.setAttribute("role", "presentation");
      document.body.appendChild(this.cursorDot);
    }

    if (!this.adhdTopMask) {
      this.adhdTopMask = document.createElement("div");
      this.adhdTopMask.className = "a11y-focus-mask a11y-focus-mask-top";
      this.adhdTopMask.setAttribute("aria-hidden", "true");
      this.adhdTopMask.setAttribute("role", "presentation");
      document.body.appendChild(this.adhdTopMask);
    }

    if (!this.adhdBottomMask) {
      this.adhdBottomMask = document.createElement("div");
      this.adhdBottomMask.className = "a11y-focus-mask a11y-focus-mask-bottom";
      this.adhdBottomMask.setAttribute("aria-hidden", "true");
      this.adhdBottomMask.setAttribute("role", "presentation");
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

    if (root.matches?.(TEXT_ELEMENTS_SELECTOR) && !this.isExcludedFromAdjustments(root)) {
      elements.push(root);
    }

    root.querySelectorAll(TEXT_ELEMENTS_SELECTOR).forEach((element) => {
      if (!this.isExcludedFromAdjustments(element)) {
        elements.push(element);
      }
    });

    return elements;
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
    if (!document.body) {
      return;
    }

    const appState = {
      a11yDyslexia: this.settings.dyslexiaFriendly ? "true" : "false",
      a11yAdhdMode: this.settings.adhdMode ? "true" : "false",
      a11yHighlightLinks: this.settings.highlightLinks ? "true" : "false",
      a11yHighContrast: this.settings.highContrast ? "true" : "false",
      a11yLargeCursor: this.settings.cursor ? "true" : "false",
      a11yPauseAnimations: this.settings.pauseAnimations ? "true" : "false",
      a11yHideImages: this.settings.hideImages ? "true" : "false",
    };

    Object.entries(appState).forEach(([key, value]) => {
      document.body.dataset[key] = value;
    });
  }

  applyVisualFilters() {
    const filters = [];

    if (this.settings.invertColors) {
      filters.push("invert(1)", "hue-rotate(180deg)");
    }

    if (this.settings.saturation) {
      filters.push("saturate(1.35)", "contrast(1.12)");
    }

    if (this.settings.highContrast && !this.settings.invertColors) {
      filters.push("contrast(1.15)");
    }

    document.documentElement.style.setProperty(
      "--a11y-visual-filter",
      filters.length > 0 ? filters.join(" ") : "none",
    );
  }

  applySpeechMode() {
    if (this.settings.textToSpeech && !this.speechHandler) {
      this.ensureSpeechVoices();

      this.speechHandler = (event) => {
        // Ignore non-primary clicks and modified clicks used by assistive tech/browsers.
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey) {
          return;
        }

        // Prefer not interrupting keyboard / screen-reader activation paths.
        if (event.detail === 0) {
          return;
        }

        const target = findSpeechTarget(event.target);

        if (!target) {
          return;
        }

        const text = getElementSpeechText(target);

        if (text.length < 2 || !window.speechSynthesis) {
          return;
        }

        this.speakText(text);
      };

      document.addEventListener("click", this.speechHandler, true);
    }

    if (!this.settings.textToSpeech && this.speechHandler) {
      document.removeEventListener("click", this.speechHandler, true);
      this.speechHandler = null;
      this.stopSpeech();
    }
  }

  ensureSpeechVoices() {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    const refreshPreferredVoice = () => {
      this.preferredSpeechVoice = pickPreferredSpeechVoice(
        window.speechSynthesis.getVoices(),
      );
    };

    refreshPreferredVoice();

    if (!this.voicesChangedHandler) {
      this.voicesChangedHandler = () => {
        refreshPreferredVoice();
      };

      window.speechSynthesis.addEventListener(
        "voiceschanged",
        this.voicesChangedHandler,
      );
    }

    // Some browsers load voices asynchronously on first getVoices() call.
    window.speechSynthesis.getVoices();
  }

  getSpeechVoice() {
    this.ensureSpeechVoices();
    return this.preferredSpeechVoice;
  }

  stopSpeech() {
    this.speechSessionId += 1;
    this.speechChunks = [];
    this.speechChunkIndex = 0;

    if (this.speechKeepAliveTimer) {
      window.clearInterval(this.speechKeepAliveTimer);
      this.speechKeepAliveTimer = null;
    }

    if (this.speechStartTimer) {
      window.clearTimeout(this.speechStartTimer);
      this.speechStartTimer = null;
    }

    window.speechSynthesis?.cancel();
  }

  startSpeechKeepAlive() {
    if (this.speechKeepAliveTimer || !window.speechSynthesis) {
      return;
    }

    // Only nudge OUR active TTS session — never disturb screen-reader speech.
    this.speechKeepAliveTimer = window.setInterval(() => {
      if (
        !this.settings.textToSpeech ||
        !this.speechChunks.length ||
        this.speechChunkIndex >= this.speechChunks.length ||
        !window.speechSynthesis.speaking
      ) {
        return;
      }

      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }, 10000);
  }

  speakNextChunk(sessionId) {
    if (
      sessionId !== this.speechSessionId ||
      !this.settings.textToSpeech ||
      !window.speechSynthesis ||
      this.speechChunkIndex >= this.speechChunks.length
    ) {
      if (sessionId === this.speechSessionId && this.speechKeepAliveTimer) {
        window.clearInterval(this.speechKeepAliveTimer);
        this.speechKeepAliveTimer = null;
      }
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      this.speechChunks[this.speechChunkIndex],
    );
    const preferredVoice = this.getSpeechVoice();

    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    if (preferredVoice) {
      utterance.voice = preferredVoice;
      utterance.lang = isIndianEnglishVoice(preferredVoice)
        ? "en-IN"
        : preferredVoice.lang || "en-GB";
    } else {
      utterance.lang = "en-GB";
    }

    utterance.onend = () => {
      if (sessionId !== this.speechSessionId) {
        return;
      }

      this.speechChunkIndex += 1;
      this.speakNextChunk(sessionId);
    };

    utterance.onerror = (event) => {
      if (sessionId !== this.speechSessionId) {
        return;
      }

      // Ignore intentional cancels when starting a new click.
      if (event.error === "interrupted" || event.error === "canceled") {
        return;
      }

      this.speechChunkIndex += 1;
      this.speakNextChunk(sessionId);
    };

    this.startSpeechKeepAlive();
    window.speechSynthesis.speak(utterance);

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }

  speakText(text) {
    if (!window.speechSynthesis) {
      return;
    }

    this.ensureSpeechVoices();
    this.stopSpeech();

    const chunks = chunkTextForSpeech(text);

    if (!chunks.length) {
      return;
    }

    const sessionId = this.speechSessionId;
    this.speechChunks = chunks;
    this.speechChunkIndex = 0;

    // Avoid Chrome cancel()+speak() race that drops voice / first words.
    this.speechStartTimer = window.setTimeout(() => {
      this.speechStartTimer = null;

      if (sessionId !== this.speechSessionId) {
        return;
      }

      this.speakNextChunk(sessionId);
    }, 60);
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

    if (this.voicesChangedHandler && window.speechSynthesis) {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        this.voicesChangedHandler,
      );
      this.voicesChangedHandler = null;
    }

    this.stopSpeech();
    this.preferredSpeechVoice = null;

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
