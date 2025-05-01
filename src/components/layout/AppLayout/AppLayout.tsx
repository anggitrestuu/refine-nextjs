'use client'

import { useSidebarState } from "@/hooks/useSidebarState"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Divider,
  useTheme,
  alpha
} from "@mui/material"
import { MAIN_NAV_ITEMS, FOOTER_NAV_ITEMS } from './constants'
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import ChevronRight from "@mui/icons-material/ChevronRight"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps): React.JSX.Element {
  const { isCollapsed, toggleSidebar, sidebarMargin } = useSidebarState()
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar with Glassmorphism effect */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarMargin,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarMargin,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease-in-out',
            boxShadow: theme.customShadows.z8,
            background: theme.palette.mode === 'light'
              ? `linear-gradient(135deg, 
                  ${alpha(theme.palette.primary.lighter, 0.12)}, 
                  ${alpha(theme.palette.background.default, 0.95)})`
              : `linear-gradient(135deg, 
                  ${alpha(theme.palette.primary.darker, 0.12)}, 
                  ${alpha(theme.palette.background.default, 0.9)})`,
            backdropFilter: 'blur(10px)',
            borderRight: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backdropFilter: 'blur(10px)',
              pointerEvents: 'none',
            },
          },
        }}
      >
        {/* Logo or Brand */}
        <Box sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          position: 'relative',
          backdropFilter: 'blur(8px)',
          background: theme.palette.mode === 'light'
            ? `linear-gradient(135deg, 
                ${alpha(theme.palette.primary.lighter, 0.18)}, 
                ${alpha(theme.palette.background.default, 0.9)})`
            : `linear-gradient(135deg, 
                ${alpha(theme.palette.primary.darker, 0.18)}, 
                ${alpha(theme.palette.background.default, 0.85)})`,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        }}>
          {!isCollapsed && <Box component="span" sx={{ fontWeight: 'bold' }}>AppName</Box>}
          <IconButton
            onClick={toggleSidebar}
            sx={{
              borderRadius: '50%',
              backgroundColor: alpha(theme.palette.background.neutral, 0.8),
              backdropFilter: 'blur(4px)',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.lighter, 0.8),
              }
            }}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>

        <Divider sx={{ opacity: 0.6 }} />

        {/* Main navigation items */}
        <List sx={{ px: 1 }}>
          {MAIN_NAV_ITEMS.map((item) => (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                href={item.href}
                aria-label={item.ariaLabel}
                sx={{
                  minHeight: 48,
                  justifyContent: isCollapsed ? 'center' : 'initial',
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    backdropFilter: 'blur(4px)',
                  }
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: isCollapsed ? 0 : 2,
                  justifyContent: 'center',
                  color: theme.palette.primary.main
                }}>
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mt: 'auto', mb: 1, opacity: 0.6 }} />

        {/* Footer navigation items */}
        <List sx={{ px: 1, mb: 2 }}>
          {FOOTER_NAV_ITEMS.map((item) => (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                href={item.href}
                aria-label={item.ariaLabel}
                sx={{
                  minHeight: 48,
                  justifyContent: isCollapsed ? 'center' : 'initial',
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    backdropFilter: 'blur(4px)',
                  }
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: isCollapsed ? 0 : 2,
                  justifyContent: 'center',
                  color: theme.palette.text.secondary
                }}>
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{ color: 'text.secondary' }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${sidebarMargin}px)`,
          transition: 'width 0.3s ease-in-out, margin 0.3s ease-in-out',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

AppLayout.displayName = 'AppLayout'
