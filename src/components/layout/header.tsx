import React, { useState, useEffect } from "react";
import {
  useGetIdentity,
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
import { alpha } from "@mui/material";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
  sticky,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const { data: user } = useGetIdentity<IUser>();

  const prefferedSticky = pickNotDeprecated(sticky, isSticky) ?? true;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position={prefferedSticky ? "sticky" : "relative"}
      elevation={scrolled ? 2 : 0}
      sx={{
        background: (theme) => {
          const baseColor =
            theme.palette.mode === "light" ? "#ffffff" : "#1A2027";
          const gradientColor =
            theme.palette.mode === "light"
              ? alpha(theme.palette.primary.light, 0.08)
              : alpha(theme.palette.primary.dark, 0.16);
          return scrolled
            ? `linear-gradient(to right, ${baseColor}, ${gradientColor})`
            : "transparent";
        },
        backdropFilter: scrolled ? "blur(8px)" : "none",
        color: "text.primary",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.8),
            borderRadius: "12px",
            px: 2,
            mx: 2,
            flex: { xs: 1, md: 0.4 },
            maxWidth: "400px",
            boxShadow: (theme) =>
              `0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "background.paper",
              transform: "translateY(-1px)",
              boxShadow: (theme) =>
                `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`,
            },
          }}
        >
          <SearchIcon
            sx={{
              color: "primary.main",
              opacity: 0.7,
              mr: 1,
              transition: "opacity 0.2s ease",
              "&:hover": {
                opacity: 1,
              },
            }}
          />
          <InputBase
            placeholder="Search..."
            sx={{
              py: 1.5,
              flex: 1,
              "& .MuiInputBase-input": {
                color: "text.primary",
                "&::placeholder": {
                  color: "text.secondary",
                  opacity: 0.7,
                },
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
              background: (theme) => alpha(theme.palette.primary.main, 0.08),
              backdropFilter: "blur(8px)",
              borderRadius: "12px",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                background: (theme) => alpha(theme.palette.primary.main, 0.16),
                transform: "translateY(-1px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "10px",
                  height: "18px",
                  minWidth: "18px",
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
                  border: "2px solid",
                  borderColor: "background.paper",
                },
              }}
            >
              <NotificationsIcon color="primary" />
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
                  width: 42,
                  height: 42,
                  border: "2px solid",
                  borderColor: "primary.main",
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                  boxShadow: (theme) =>
                    `0 0 0 4px ${alpha(theme.palette.primary.main, 0.16)}`,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: (theme) =>
                      `0 0 0 4px ${alpha(theme.palette.primary.main, 0.24)}`,
                  },
                }}
              />
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
