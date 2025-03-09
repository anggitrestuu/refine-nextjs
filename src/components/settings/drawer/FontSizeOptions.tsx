// @mui
import { RadioGroup } from "@mui/material";
import { alpha } from "@mui/material/styles";
// components
import { useSettingsContext } from "../SettingsContext";
import { StyledCard, StyledWrap, MaskControl } from "../styles";

// ----------------------------------------------------------------------

const FONT_OPTIONS = [
  { name: "small", label: "Small" },
  { name: "medium", label: "Normal" },
  { name: "large", label: "Large" },
];

export default function FontSizeOptions() {
  const { themeFontSize, onChangeFontSize } = useSettingsContext();

  return (
    <RadioGroup
      name="themeFontSize"
      value={themeFontSize}
      onChange={onChangeFontSize}
    >
      <StyledWrap sx={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {FONT_OPTIONS.map((option) => {
          const { name, label } = option;
          const selected = themeFontSize === name;

          return (
            <StyledCard
              key={name}
              selected={selected}
              sx={{
                height: 48,
                ...(selected && {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  borderColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.24),
                }),
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  fontWeight: selected ? 600 : 400,
                }}
              >
                {label}
              </div>
              <MaskControl value={name} />
            </StyledCard>
          );
        })}
      </StyledWrap>
    </RadioGroup>
  );
}
