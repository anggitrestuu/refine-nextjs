'use client'

import { useSidebarState } from "@/hooks/useSidebarState"
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, IconButton } from "@mui/material"
import { MAIN_NAV_ITEMS, FOOTER_NAV_ITEMS } from './constants'
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import ChevronRight from "@mui/icons-material/ChevronRight"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps): React.JSX.Element {
  const { isCollapsed, toggleSidebar, sidebarMargin } = useSidebarState()

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarMargin,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarMargin,
            boxSizing: 'border-box',
            transition: 'width 0.2s ease-in-out',
          },
        }}
      >
        {/* Toggle button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={toggleSidebar}>
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>

        {/* Main navigation items */}
        <List>
          {MAIN_NAV_ITEMS.map((item) => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                href={item.href}
                sx={{
                  minHeight: 48,
                  justifyContent: isCollapsed ? 'center' : 'initial',
                  px: 2.5,
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: isCollapsed ? 0 : 2,
                  justifyContent: 'center',
                }}>
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: 1 }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Footer navigation items */}
        <List sx={{ marginTop: 'auto' }}>
          {FOOTER_NAV_ITEMS.map((item) => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                href={item.href}
                sx={{
                  minHeight: 48,
                  justifyContent: isCollapsed ? 'center' : 'initial',
                  px: 2.5,
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: isCollapsed ? 0 : 2,
                  justifyContent: 'center',
                }}>
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: 1 }}
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
          transition: 'width 0.2s ease-in-out, margin 0.2s ease-in-out',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

AppLayout.displayName = 'AppLayout'
