
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  accessibilityDomManager,
  createDefaultSettings,
  FONT_SCALE_MAP,
} from "../utils/accessibilityDomManager";

const ACCESSIBILITY_STORAGE_KEY = "innovate-accessibility-settings";
const MAX_FONT_SIZE_LEVEL = FONT_SCALE_MAP.length - 1;

const AccessibilityContext = createContext(null);

const loadStoredSettings = () => {
  if (typeof window === "undefined") {
    return createDefaultSettings();
  }

  try {
    const rawSettings = window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);

    if (!rawSettings) {
      return createDefaultSettings();
    }

    return {
      ...createDefaultSettings(),
      ...JSON.parse(rawSettings),
    };
  } catch {
    return createDefaultSettings();
  }
};

export function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState(loadStoredSettings);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    accessibilityDomManager.apply(settings);
  }, [settings]);

  useEffect(() => {
    return () => {
      accessibilityDomManager.destroy();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      ACCESSIBILITY_STORAGE_KEY,
      JSON.stringify(settings),
    );
  }, [settings]);

  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const toggleSetting = useCallback((settingKey) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [settingKey]: !currentSettings[settingKey],
    }));
  }, []);

  const increaseFontSize = useCallback(() => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      fontSizeLevel: Math.min(
        MAX_FONT_SIZE_LEVEL,
        currentSettings.fontSizeLevel + 1,
      ),
    }));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      fontSizeLevel: Math.max(0, currentSettings.fontSizeLevel - 1),
    }));
  }, []);

  const setFontSizeLevel = useCallback((level) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      fontSizeLevel: Math.min(MAX_FONT_SIZE_LEVEL, Math.max(0, level)),
    }));
  }, []);

  const resetAllSettings = useCallback(() => {
    setSettings(createDefaultSettings());
    setIsDrawerOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      settings,
      isDrawerOpen,
      isReducedMotionEnabled: settings.pauseAnimations || settings.adhdMode,
      openDrawer,
      closeDrawer,
      toggleSetting,
      increaseFontSize,
      decreaseFontSize,
      setFontSizeLevel,
      resetAllSettings,
    }),
    [
      closeDrawer,
      decreaseFontSize,
      increaseFontSize,
      isDrawerOpen,
      openDrawer,
      resetAllSettings,
      setFontSizeLevel,
      settings,
      toggleSetting,
    ],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }

  return context;
}
