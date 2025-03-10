import React, { type CSSProperties, useState } from "react";
import {
  CanAccess,
  type ITreeMenu,
  useIsExistAuthentication,
  useLogout,
  useTitle,
  useTranslate,
  useRouterContext,
  useRouterType,
  useLink,
  useMenu,
  useRefineContext,
  useActiveAuthProvider,
  pickNotDeprecated,
  useWarnAboutChange,
} from "@refinedev/core";
import {
  ThemedTitleV2 as DefaultTitle,
  useThemedLayoutContext,
} from "@refinedev/mui";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Dashboard from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListOutlined from "@mui/icons-material/ListOutlined";
import Logout from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import type { RefineThemedLayoutV2SiderProps } from "@refinedev/mui";
import { alpha, Divider, useTheme, Theme } from "@mui/material";

export const ThemedSiderV2: React.FC<RefineThemedLayoutV2SiderProps> = ({
  Title: TitleFromProps,
  render,
  meta,
  activeItemDisabled = false,
}) => {
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();

  const theme = useTheme();

  const drawerWidth = () => {
    if (siderCollapsed) return 64;
    return 260;
  };

  const menuItemStyles = {
    button: {
      py: 1.75,
      px: 3,
      mx: 2,
      my: 0.5,
      borderRadius: "16px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        transition: "opacity 0.3s ease",
        background: (theme: Theme) =>
          `radial-gradient(circle at center, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
      },
      "&:hover": {
        transform: "translateX(4px) scale(1.01)",
        "&::before": {
          opacity: 1,
        },
        "& .MuiListItemIcon-root": {
          transform: "scale(1.1) rotate(5deg)",
          color: "primary.main",
          filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.2))",
        },
        "& .MuiListItemText-primary": {
          background: (theme: Theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        },
      },
      "&.Mui-selected": {
        background: (theme: Theme) =>
          `linear-gradient(135deg, ${alpha(
            theme.palette.primary.light,
            0.15
          )}, ${alpha(theme.palette.primary.main, 0.15)})`,
        boxShadow: (theme: Theme) =>
          `0 0 20px ${alpha(
            theme.palette.primary.main,
            0.15
          )}, inset 0 0 8px ${alpha(theme.palette.primary.light, 0.2)}`,
        backdropFilter: "blur(20px)",
        "&::before": {
          opacity: 1,
          background: (theme: Theme) =>
            `radial-gradient(circle at center, ${alpha(
              theme.palette.primary.main,
              0.15
            )} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
        },
        "&:hover": {
          transform: "translateX(4px) scale(1.01)",
          background: (theme: Theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette.primary.light,
              0.2
            )}, ${alpha(theme.palette.primary.main, 0.2)})`,
          boxShadow: (theme: Theme) =>
            `0 0 25px ${alpha(
              theme.palette.primary.main,
              0.2
            )}, inset 0 0 12px ${alpha(theme.palette.primary.light, 0.3)}`,
        },
        "& .MuiListItemIcon-root": {
          color: "primary.main",
          transform: "scale(1.1)",
          filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.2))",
        },
        "& .MuiListItemText-primary": {
          fontWeight: 700,
          background: (theme: Theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    icon: {
      justifyContent: "center",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      minWidth: "28px",
      marginRight: "16px !important",
      color: (theme: Theme) => alpha(theme.palette.text.primary, 0.7),
      "& svg": {
        fontSize: "1.3rem",
        transition: "transform 0.3s ease",
      },
    },
    text: {
      fontWeight: 600,
      transition: "all 0.3s ease",
      letterSpacing: "0.015em",
    },
  };

  const t = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;
  const { hasDashboard } = useRefineContext();
  const translate = useTranslate();

  const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta });
  const isExistAuthentication = useIsExistAuthentication();
  const TitleFromContext = useTitle();
  const authProvider = useActiveAuthProvider();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const [open, setOpen] = useState<{ [k: string]: any }>({});

  React.useEffect(() => {
    setOpen((previous) => {
      const previousKeys: string[] = Object.keys(previous);
      const previousOpenKeys = previousKeys.filter((key) => previous[key]);

      const uniqueKeys = new Set([...previousOpenKeys, ...defaultOpenKeys]);
      const uniqueKeysRecord = Object.fromEntries(
        Array.from(uniqueKeys.values()).map((key) => [key, true])
      );
      return uniqueKeysRecord;
    });
  }, [defaultOpenKeys]);

  const RenderToTitle = TitleFromProps ?? TitleFromContext ?? DefaultTitle;

  const handleClick = (key: string) => {
    setOpen({ ...open, [key]: !open[key] });
  };

  const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName, meta, options } =
        item;
      const isOpen = open[item.key || ""] || false;

      const isSelected = item.key === selectedKey;
      const isNested = !(
        pickNotDeprecated(meta?.parent, options?.parent, parentName) ===
        undefined
      );

      if (children.length > 0) {
        return (
          <CanAccess
            key={item.key}
            resource={name}
            action="list"
            params={{
              resource: item,
            }}
          >
            <div key={item.key}>
              <Tooltip
                title={label ?? name}
                placement="right"
                disableHoverListener={!siderCollapsed}
                arrow
              >
                <ListItemButton
                  onClick={() => {
                    if (siderCollapsed) {
                      setSiderCollapsed(false);
                      if (!isOpen) {
                        handleClick(item.key || "");
                      }
                    } else {
                      handleClick(item.key || "");
                    }
                  }}
                  sx={{
                    ...menuItemStyles.button,
                    pl: isNested ? 4 : 2,
                    bgcolor: isOpen ? "action.hover" : "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ...menuItemStyles.icon,
                      marginRight: siderCollapsed
                        ? "0px !important"
                        : "16px !important",
                      color: isOpen
                        ? "primary.main"
                        : theme.palette.primary.main,
                    }}
                  >
                    {icon ?? <ListOutlined />}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      ...menuItemStyles.text,
                      noWrap: true,
                    }}
                  />
                  {isOpen ? (
                    <ExpandLess
                      sx={{
                        color: "primary.main",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  ) : (
                    <ExpandMore
                      sx={{
                        color: "grey.500",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
              {!siderCollapsed && (
                <Collapse
                  in={open[item.key || ""]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {renderTreeView(children, selectedKey)}
                  </List>
                </Collapse>
              )}
            </div>
          </CanAccess>
        );
      }

      const linkStyle: CSSProperties =
        activeItemDisabled && isSelected ? { pointerEvents: "none" } : {};

      return (
        <CanAccess
          key={item.key}
          resource={name}
          action="list"
          params={{ resource: item }}
        >
          <Tooltip
            title={label ?? name}
            placement="right"
            disableHoverListener={!siderCollapsed}
            arrow
          >
            <ListItemButton
              component={ActiveLink}
              to={route}
              selected={isSelected}
              style={linkStyle}
              onClick={() => {
                setMobileSiderOpen(false);
              }}
              sx={{
                ...menuItemStyles.button,
                pl: isNested ? 4 : 2,
              }}
            >
              <ListItemIcon
                sx={{
                  ...menuItemStyles.icon,
                  marginRight: siderCollapsed
                    ? "0px !important"
                    : "16px !important",
                  color: isSelected
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                }}
              >
                {icon ?? <ListOutlined />}
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  ...menuItemStyles.text,
                  noWrap: true,
                }}
              />
            </ListItemButton>
          </Tooltip>
        </CanAccess>
      );
    });
  };

  const dashboard = hasDashboard ? (
    <CanAccess resource="dashboard" action="list">
      <Tooltip
        title={translate("dashboard.title", "Dashboard")}
        placement="right"
        disableHoverListener={!siderCollapsed}
        arrow
      >
        <ListItemButton
          component={ActiveLink}
          to="/"
          selected={selectedKey === "/"}
          onClick={() => {
            setMobileSiderOpen(false);
          }}
          sx={{
            ...menuItemStyles.button,
            color: selectedKey === "/" ? "primary.main" : "text.primary",
          }}
        >
          <ListItemIcon
            sx={{
              ...menuItemStyles.icon,
              marginRight: siderCollapsed
                ? "0px !important"
                : "16px !important",
              color:
                selectedKey === "/"
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
            }}
          >
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            primary={translate("dashboard.title", "Dashboard")}
            primaryTypographyProps={{
              ...menuItemStyles.text,
              noWrap: true,
            }}
          />
        </ListItemButton>
      </Tooltip>
    </CanAccess>
  ) : null;

  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        t(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes."
        )
      );

      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  };

  const logout = isExistAuthentication && (
    <>
      <Divider
        sx={{
          my: 1,
          mx: 2,
          opacity: 0.3,
        }}
      />
      <Tooltip
        title={t("buttons.logout", "Logout")}
        placement="right"
        disableHoverListener={!siderCollapsed}
        arrow
      >
        <ListItemButton
          key="logout"
          onClick={() => handleLogout()}
          sx={{
            ...menuItemStyles.button,
            "&:hover": {
              background: (theme) =>
                `linear-gradient(135deg, ${alpha(
                  theme.palette.error.light,
                  0.1
                )}, ${alpha(theme.palette.error.main, 0.1)})`,
              "& .MuiListItemIcon-root": {
                transform: "scale(1.1) rotate(5deg)",
                color: "error.main",
                filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.2))",
              },
              "& .MuiListItemText-primary": {
                color: "error.main",
                fontWeight: 600,
              },
            },
            "& .MuiListItemIcon-root": {
              ...menuItemStyles.icon,
              marginRight: siderCollapsed
                ? "0px !important"
                : "16px !important",
              color: "error.main",
            },
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary={t("buttons.logout", "Logout")}
            primaryTypographyProps={{
              ...menuItemStyles.text,
              noWrap: true,
            }}
          />
        </ListItemButton>
      </Tooltip>
    </>
  );

  const items = renderTreeView(menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        logout,
        items,
        collapsed: siderCollapsed,
      });
    }
    return (
      <>
        {dashboard}
        {items}
        {logout}
      </>
    );
  };

  const drawer = (
    <List
      disablePadding
      sx={{
        flexGrow: 1,
        pt: 2,
      }}
    >
      {renderSider()}
    </List>
  );

  return (
    <>
      <Box
        sx={{
          width: { xs: drawerWidth() },
          display: {
            xs: "none",
            md: "block",
          },
          transition: "width 0.3s ease",
        }}
      />
      <Box
        component="nav"
        sx={{
          position: "fixed",
          zIndex: 1101,
          width: { sm: drawerWidth() },
          display: "flex",
        }}
      >
        <Drawer
          variant="temporary"
          elevation={2}
          open={mobileSiderOpen}
          onClose={() => setMobileSiderOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              sm: "block",
              md: "none",
            },
            "& .MuiDrawer-paper": {
              width: drawerWidth(),
              background: (theme) =>
                theme.palette.mode === "light"
                  ? `linear-gradient(135deg, 
                      ${alpha(theme.palette.primary.lighter, 0.12)}, 
                      ${alpha(theme.palette.background.default, 0.8)})`
                  : `linear-gradient(135deg, 
                      ${alpha(theme.palette.primary.darker, 0.12)}, 
                      ${alpha(theme.palette.background.default, 0.8)})`,
              backdropFilter: "blur(20px)",
              boxShadow: (theme) =>
                theme.palette.mode === "light"
                  ? "none"
                  : `0 0 2px ${alpha(theme.palette.common.white, 0.2)}`,
            },
          }}
        >
          <Box
            sx={{
              width: drawerWidth(),
            }}
          >
            <Box
              sx={{
                height: 64,
                display: "flex",
                alignItems: "center",
                paddingLeft: "16px",
                backdropFilter: "blur(20px)",
                background: (theme) =>
                  `linear-gradient(135deg, 
                    ${alpha(theme.palette.primary.lighter, 0.08)},
                    ${alpha(theme.palette.background.default, 0.95)})`,
              }}
            >
              <RenderToTitle collapsed={false} />
            </Box>
            {drawer}
          </Box>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth(),
              overflow: "hidden",
              transition: "width 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              background: (theme) =>
                theme.palette.mode === "light"
                  ? `linear-gradient(135deg, 
                      ${alpha(theme.palette.primary.lighter, 0.08)}, 
                      ${alpha(theme.palette.background.default, 0.9)})`
                  : `linear-gradient(135deg, 
                      ${alpha(theme.palette.primary.darker, 0.08)}, 
                      ${alpha(theme.palette.background.default, 0.8)})`,
              backdropFilter: "blur(20px)",
              boxShadow: (theme) =>
                theme.palette.mode === "light"
                  ? `4px 0 16px -4px ${alpha(theme.palette.primary.main, 0.04)}`
                  : `4px 0 16px -4px ${alpha(
                      theme.palette.common.black,
                      0.16
                    )}`,
              borderRight: (theme) =>
                `1px solid ${alpha(
                  theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.common.white,
                  0.08
                )}`,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backdropFilter: "blur(20px)",
                pointerEvents: "none",
              },
            },
          }}
          open
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              height: 64,
              display: "flex",
              flexShrink: 0,
              alignItems: "center",
              justifyContent: siderCollapsed ? "center" : "space-between",
              paddingLeft: siderCollapsed ? 0 : "16px",
              paddingRight: siderCollapsed ? 0 : "8px",
              borderRadius: 0,
              position: "relative",
              overflow: "hidden",
              background: (theme) =>
                `linear-gradient(135deg, 
                  ${alpha(theme.palette.primary.lighter, 0.12)}, 
                  ${alpha(theme.palette.background.default, 0.95)})`,
              backdropFilter: "blur(20px)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: (theme) =>
                  `linear-gradient(135deg, 
                    ${alpha(theme.palette.primary.lighter, 0.05)}, 
                    ${alpha(theme.palette.primary.main, 0.02)})`,
                opacity: 0.4,
                transition: "opacity 0.3s ease",
              },
              "&:hover::before": {
                opacity: 0.6,
              },
              boxShadow: (theme) =>
                `0 1px 2px ${alpha(theme.palette.primary.main, 0.08)}`,
              borderBottom: (theme) =>
                `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            }}
          >
            <RenderToTitle collapsed={siderCollapsed} />
            {!siderCollapsed && (
              <IconButton
                size="small"
                onClick={() => setSiderCollapsed(true)}
                sx={{
                  position: "relative",
                  transition: "all 0.2s ease",
                  background: (theme) =>
                    alpha(theme.palette.primary.main, 0.04),
                  backdropFilter: "blur(20px)",
                  "&:hover": {
                    background: (theme) =>
                      alpha(theme.palette.primary.main, 0.08),
                    transform: "scale(1.1) rotate(-4deg)",
                    "& svg": {
                      color: "primary.main",
                      transform: "rotate(4deg)",
                    },
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "50%",
                    boxShadow: (theme) =>
                      `0 0 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                    opacity: 0,
                    transition: "opacity 0.2s ease",
                  },
                  "&:hover::before": {
                    opacity: 1,
                  },
                }}
              >
                <ChevronLeft sx={{ transition: "transform 0.2s ease" }} />
              </IconButton>
            )}
          </Paper>
          <Box
            sx={{
              flexGrow: 1,
              overflowX: "hidden",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: (theme) =>
                  alpha(
                    theme.palette.primary.main,
                    theme.palette.mode === "light" ? 0.2 : 0.3
                  ),
                borderRadius: "6px",
                "&:hover": {
                  background: (theme) =>
                    alpha(
                      theme.palette.primary.main,
                      theme.palette.mode === "light" ? 0.3 : 0.4
                    ),
                },
              },
            }}
          >
            {drawer}
          </Box>
        </Drawer>
      </Box>
    </>
  );
};
