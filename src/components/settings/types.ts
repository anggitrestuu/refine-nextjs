// ----------------------------------------------------------------------

type ColorVariants = {
  name: string;
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type ThemeModeValue = 'light' | 'dark';
export type ThemeContrastValue = 'default' | 'bold';
export type ThemeColorPresetsValue = 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red';
export type ThemeFontSizeValue = number;
export type ThemeStretchValue = boolean;

export type SettingsValueProps = {
  themeMode: ThemeModeValue;
  themeStretch: ThemeStretchValue;
  themeContrast: ThemeContrastValue;
  themeColorPresets: ThemeColorPresetsValue;
  themeFontSize: ThemeFontSizeValue;
};

export type SettingsContextProps = SettingsValueProps & {
  presetsColor: ColorVariants;
  presetsOption: {
    name: string;
    value: string;
  }[];

  // Mode
  onToggleMode: VoidFunction;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Direction
  onToggleDirection: VoidFunction;
  onChangeDirection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDirectionByLang: (lang: string) => void;

  // Layout
  onToggleLayout: VoidFunction;
  onChangeLayout: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Contrast
  onToggleContrast: VoidFunction;
  onChangeContrast: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Color
  onChangeColorPresets: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Font Size
  onChangeFontSize: (value: ThemeFontSizeValue) => void;

  // Stretch
  onToggleStretch: VoidFunction;

  // Reset
  onResetSetting: VoidFunction;
};
