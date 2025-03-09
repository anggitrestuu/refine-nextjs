"use client";

import { useState } from "react";
// @mui
import { alpha, useTheme } from "@mui/material/styles";
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// config
import { NAV } from "@config-global";
//
import Iconify from "@components/iconify";
import Scrollbar from "@components/scrollbar";
//
import { defaultSettings } from "../config-setting";
import { useSettingsContext } from "../SettingsContext";
import Block from "./Block";
import BadgeDot from "./BadgeDot";
import ToggleButton from "./ToggleButton";
import ModeOptions from "./ModeOptions";
import StretchOptions from "./StretchOptions";
import ContrastOptions from "./ContrastOptions";
import FullScreenOptions from "./FullScreenOptions";
import ColorPresetsOptions from "./ColorPresetsOptions";
import FontSizeOptions from "./FontSizeOptions";

// ----------------------------------------------------------------------

const SPACING = 2.5;

export default function SettingsDrawer() {
  const {
    themeMode,
    themeStretch,
    themeContrast,
    themeColorPresets,
    themeFontSize,
    onResetSetting,
  } = useSettingsContext();

  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const notDefault =
    themeMode !== defaultSettings.themeMode ||
    themeStretch !== defaultSettings.themeStretch ||
    themeContrast !== defaultSettings.themeContrast ||
    themeColorPresets !== defaultSettings.themeColorPresets ||
    themeFontSize !== defaultSettings.themeFontSize;

  return (
    <>
      {!open && (
        <ToggleButton
          open={open}
          notDefault={notDefault}
          onToggle={handleToggle}
        />
      )}

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        BackdropProps={{ invisible: true }}
        PaperProps={{
          sx: {
            ...bgBlur({
              color: theme.palette.background.default,
              opacity: 0.9,
            }),
            width: NAV.W_BASE,
            boxShadow: `-24px 12px 40px 0 ${alpha(
              theme.palette.mode === "light"
                ? theme.palette.grey[500]
                : theme.palette.common.black,
              0.16
            )}`,
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 2, pr: 1, pl: SPACING }}
        >
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Settings
          </Typography>

          <Tooltip title="Reset">
            <Box sx={{ position: "relative" }}>
              {notDefault && <BadgeDot />}
              <IconButton onClick={onResetSetting}>
                <Iconify icon="ic:round-refresh" />
              </IconButton>
            </Box>
          </Tooltip>

          <IconButton onClick={handleClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Scrollbar sx={{ p: SPACING, pb: 0 }}>
          <Block title="Mode">
            <ModeOptions />
          </Block>

          <Block title="Contrast">
            <ContrastOptions />
          </Block>

          <Block
            title="Stretch"
            tooltip="Only available at large resolutions > 1600px (xl)"
          >
            <StretchOptions />
          </Block>

          <Block title="Presets">
            <ColorPresetsOptions />
          </Block>

          <Block title="Font Size">
            <FontSizeOptions />
          </Block>
        </Scrollbar>

        <Box sx={{ p: SPACING, pt: 0 }}>
          <FullScreenOptions />
        </Box>
      </Drawer>
    </>
  );
}
