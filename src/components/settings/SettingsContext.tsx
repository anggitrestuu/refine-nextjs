import {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";
// utils
import localStorageAvailable from "../../utils/localStorageAvailable";
//
import { defaultSettings } from "./config-setting";
import { defaultPreset, getPresets, presetsOption } from "./presets";
import {
  ThemeModeValue,
  ThemeStretchValue,
  ThemeContrastValue,
  SettingsContextProps,
  ThemeColorPresetsValue,
  ThemeFontSizeValue,
} from "./types";

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
  ...defaultSettings,
  // Mode
  onToggleMode: () => {},
  onChangeMode: () => {},
  // Direction
  onToggleDirection: () => {},
  onChangeDirection: () => {},
  onChangeDirectionByLang: () => {},
  // Layout
  onToggleLayout: () => {},
  onChangeLayout: () => {},
  // Contrast
  onToggleContrast: () => {},
  onChangeContrast: () => {},
  // Color
  onChangeColorPresets: () => {},
  presetsColor: defaultPreset,
  presetsOption: [],
  // Font Size
  themeFontSize: defaultSettings.themeFontSize,
  onChangeFontSize: () => {},
  // Stretch
  onToggleStretch: () => {},
  // Reset
  onResetSetting: () => {},
};

// ----------------------------------------------------------------------

export const SettingsContext = createContext(initialState);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context)
    throw new Error("useSettingsContext must be use inside SettingsProvider");

  return context;
};

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: React.ReactNode;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [themeMode, setThemeMode] = useState(defaultSettings.themeMode);
  const [themeStretch, setThemeStretch] = useState(
    defaultSettings.themeStretch
  );
  const [themeContrast, setThemeContrast] = useState(
    defaultSettings.themeContrast
  );
  const [themeColorPresets, setThemeColorPresets] = useState(
    defaultSettings.themeColorPresets
  );

  const [themeFontSize, setThemeFontSize] = useState(
    defaultSettings.themeFontSize
  );

  const storageAvailable = localStorageAvailable();

  useEffect(() => {
    if (storageAvailable) {
      const mode = getCookie("themeMode") || defaultSettings.themeMode;
      const stretch = getCookie("themeStretch") || defaultSettings.themeStretch;
      const contrast =
        getCookie("themeContrast") || defaultSettings.themeContrast;

      const colorPresets =
        getCookie("themeColorPresets") || defaultSettings.themeColorPresets;

      const fontSize =
        Number(getCookie("themeFontSize")) || defaultSettings.themeFontSize;

      setThemeMode(mode as ThemeModeValue);
      setThemeFontSize(fontSize as ThemeFontSizeValue);
      setThemeStretch(stretch as ThemeStretchValue);
      setThemeContrast(contrast as ThemeContrastValue);
      setThemeColorPresets(colorPresets as ThemeColorPresetsValue);
    }
  }, [storageAvailable]);

  // Mode
  const onToggleMode = useCallback(() => {
    const value = themeMode === "light" ? "dark" : "light";
    setThemeMode(value);
    setCookie("themeMode", value);
  }, [themeMode]);

  const onChangeMode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeModeValue;
      setThemeMode(value);
      setCookie("themeMode", value);
    },
    []
  );

  // Contrast
  const onToggleContrast = useCallback(() => {
    const value = themeContrast === "default" ? "bold" : "default";
    setThemeContrast(value);
    setCookie("themeContrast", value);
  }, [themeContrast]);

  const onChangeContrast = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeContrastValue;
      setThemeContrast(value);
      setCookie("themeContrast", value);
    },
    []
  );

  // Color
  const onChangeColorPresets = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeColorPresetsValue;
      setThemeColorPresets(value);
      setCookie("themeColorPresets", value);
    },
    []
  );

  // Font Size
  const onChangeFontSize = useCallback((value: ThemeFontSizeValue) => {
    setThemeFontSize(value);
    setCookie("themeFontSize", String(value));
  }, []);

  // Stretch
  const onToggleStretch = useCallback(() => {
    const value = !themeStretch;
    setThemeStretch(value);
    setCookie("themeStretch", JSON.stringify(value));
  }, [themeStretch]);

  // Reset
  const onResetSetting = useCallback(() => {
    setThemeMode(defaultSettings.themeMode);
    setThemeStretch(defaultSettings.themeStretch);
    setThemeContrast(defaultSettings.themeContrast);
    setThemeColorPresets(defaultSettings.themeColorPresets);
    setThemeFontSize(defaultSettings.themeFontSize);
    removeCookie("themeMode");
    removeCookie("themeStretch");
    removeCookie("themeContrast");
    removeCookie("themeColorPresets");
    removeCookie("themeFontSize");
  }, []);

  const memoizedValue = useMemo(
    () => ({
      // Mode
      themeMode,
      onToggleMode,
      onChangeMode,
      // Direction
      onToggleDirection: () => {},
      onChangeDirection: () => {},
      onChangeDirectionByLang: () => {},
      // Layout
      onToggleLayout: () => {},
      onChangeLayout: () => {},
      // Contrast
      themeContrast,
      onChangeContrast,
      onToggleContrast,
      // Stretch
      themeStretch,
      onToggleStretch,
      // Color
      themeColorPresets,
      onChangeColorPresets,
      presetsOption,
      presetsColor: getPresets(themeColorPresets),
      // Font Size
      themeFontSize,
      onChangeFontSize,
      // Reset
      onResetSetting,
    }),
    [
      themeMode,
      onToggleMode,
      onChangeMode,
      themeColorPresets,
      onChangeColorPresets,
      onChangeContrast,
      themeContrast,
      onToggleContrast,
      themeStretch,
      onToggleStretch,
      themeFontSize,
      onChangeFontSize,
      onResetSetting,
    ]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}

// ----------------------------------------------------------------------

function getCookie(name: string) {
  if (typeof document === "undefined") {
    throw new Error(
      "getCookie() is not supported on the server. Fallback to a different value when rendering on the server."
    );
  }

  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts[1].split(";").shift();
  }

  return undefined;
}

function setCookie(name: string, value: string, exdays = 3) {
  const date = new Date();
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

function removeCookie(name: string) {
  document.cookie = `${name}=;path=/;max-age=0`;
}
