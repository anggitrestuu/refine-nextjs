// @mui
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
// components
import { useSettingsContext } from "../SettingsContext";

// ----------------------------------------------------------------------

export default function FontSizeOptions() {
  const { themeFontSize, onChangeFontSize } = useSettingsContext();

  return (
    <RadioGroup
      name="themeFontSize"
      value={themeFontSize}
      onChange={onChangeFontSize}
    >
      <FormControlLabel value="small" label="Small" control={<Radio />} />
      <FormControlLabel value="medium" label="Medium" control={<Radio />} />
      <FormControlLabel value="large" label="Large" control={<Radio />} />
    </RadioGroup>
  );
}
