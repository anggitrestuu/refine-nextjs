import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
// components
import { useSettingsContext } from "../components/settings";
//
import palette from "./palette";
import typography from "./typography";
import shadows from "./shadows";
import componentsOverride from "./overrides";
import customShadows from "./customShadows";
import GlobalStyles from "./globalStyles";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { themeMode, themeFontSize } = useSettingsContext();

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: palette(themeMode),
      typography: typography(themeFontSize),
      shape: { borderRadius: 8 },
      shadows: shadows(themeMode),
      customShadows: customShadows(themeMode),
      components: {
        MuiDrawer: {
          styleOverrides: {
            paper: {
              transition: "all 0.3s ease-in-out",
            },
          },
        },
      },
    }),
    [themeMode, themeFontSize]
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MUIThemeProvider>
  );
}
