import React from "react";
import {
  useGetIdentity,
  useActiveAuthProvider,
  pickNotDeprecated,
} from "@refinedev/core";
import { HamburgerMenu } from "./hamburgerMenu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
  sticky,
}) => {
  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const prefferedSticky = pickNotDeprecated(sticky, isSticky) ?? true;

  return (
    <AppBar
      position={prefferedSticky ? "sticky" : "relative"}
      elevation={0}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "#ffffff"
            : theme.palette.background.default,
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "64px !important",
          display: "flex",
          alignItems: "center",
          px: { xs: 2, lg: 3 },
        }}
      >
        <HamburgerMenu />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "action.hover",
            borderRadius: "8px",
            px: 2,
            mx: 2,
            flex: { xs: 1, md: 0.4 },
            maxWidth: "400px",
          }}
        >
          <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
          <InputBase
            placeholder="Search..."
            sx={{
              py: 1,
              flex: 1,
              "& .MuiInputBase-input": {
                color: "text.primary",
              },
            }}
          />
        </Box>

        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          <IconButton
            size="large"
            sx={{
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "10px",
                  height: "16px",
                  minWidth: "16px",
                },
              }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            sx={{
              cursor: "pointer",
              "&:hover": {
                "& .MuiTypography-root": {
                  color: "primary.main",
                },
              },
            }}
          >
            {user?.name && (
              <Typography
                variant="subtitle2"
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: "text.secondary",
                  transition: "0.2s all",
                }}
              >
                {user?.name}
              </Typography>
            )}
            {user?.avatar && (
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid",
                  borderColor: "primary.main",
                }}
              />
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
