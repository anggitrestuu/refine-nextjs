// @mui
import { Slider, Typography, Box } from "@mui/material";
// components
import { useSettingsContext } from "../SettingsContext";
import { StyledCard } from "../styles";

// ----------------------------------------------------------------------

const marks = [
  { value: 12, label: "" },
  { value: 13, label: "" },
  { value: 14, label: "" },
  { value: 15, label: "" },
  { value: 16, label: "" },
  { value: 17, label: "" },
  { value: 18, label: "" },
  { value: 19, label: "" },
  { value: 20, label: "" },
];

export default function FontSizeOptions() {
  const { themeFontSize, onChangeFontSize } = useSettingsContext();

  return (
    <Slider
      size="medium"
      value={themeFontSize}
      onChange={(_, value) => {
        onChangeFontSize(value as number);
      }}
      step={1}
      min={12}
      max={20}
      marks={marks}
      valueLabelDisplay="on"
      valueLabelFormat={(value) => `${value}px`}
      sx={{
        ".MuiSlider-valueLabel": {
          fontSize: 12,
        },
      }}
    />
  );
}
