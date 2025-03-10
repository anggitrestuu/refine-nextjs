import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export type ColorSchema =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// SETUP COLORS

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

const PRIMARY = {
  lighter: "#E3F2FD",
  light: "#90CAF9",
  main: "#2196F3",
  dark: "#1976D2",
  darker: "#0D47A1",
  contrastText: "#FFFFFF",
};

const SECONDARY = {
  lighter: "#FCE4EC",
  light: "#F48FB1",
  main: "#EC407A",
  dark: "#D81B60",
  darker: "#AD1457",
  contrastText: "#FFFFFF",
};

const INFO = {
  lighter: "#E8F4FD",
  light: "#64B5F6",
  main: "#2196F3",
  dark: "#1976D2",
  darker: "#0D47A1",
  contrastText: "#FFFFFF",
};

const SUCCESS = {
  lighter: "#E8F5E9",
  light: "#81C784",
  main: "#4CAF50",
  dark: "#388E3C",
  darker: "#1B5E20",
  contrastText: "#FFFFFF",
};

const WARNING = {
  lighter: "#FFF3E0",
  light: "#FFB74D",
  main: "#FF9800",
  dark: "#F57C00",
  darker: "#E65100",
  contrastText: GREY[800],
};

const ERROR = {
  lighter: "#FFEBEE",
  light: "#EF9A9A",
  main: "#F44336",
  dark: "#D32F2F",
  darker: "#B71C1C",
  contrastText: "#FFFFFF",
};

const COMMON = {
  common: { black: "#000000", white: "#FFFFFF" },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default function palette(themeMode: "light" | "dark") {
  const light = {
    ...COMMON,
    mode: "light",
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      paper: "#FFFFFF",
      default: "#F8F9FA",
      neutral: alpha(GREY[200], 0.8),
    },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  } as const;

  const dark = {
    ...COMMON,
    mode: "dark",
    text: {
      primary: "#FFFFFF",
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: "#1A2027",
      default: "#0A1929",
      neutral: alpha(GREY[500], 0.16),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  } as const;

  return themeMode === "light" ? light : dark;
}
