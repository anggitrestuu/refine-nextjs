/**
 * @file useLayoutTransition.tsx
 * @description Hook for managing transitions between layout files
 * @module src/shared/hooks/useLayoutTransition
 */

import { SimpleLayoutTransition } from '@/components/SimpleLayoutTransition'
import { StandardLayoutRenderer } from '@/components/StandardLayout/StandardLayoutRenderer'
import { renderComponent } from '@/components/StandardLayout/StandardLayoutSlot'
import React, { useCallback } from 'react'
import { Box, Paper } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useLayoutStore } from './useLayoutStore'

/**
 * Options for the useLayoutTransition hook
 */
interface UseLayoutTransitionOptions {
  /**
   * Duration of the transition animation in milliseconds
   */
  duration?: number
  /**
   * Component registry for rendering components
   */
  componentRegistry: Record<string, React.ComponentType<any>>
  /**
   * Class name to apply to the transition container
   */
  className?: string
}

/**
 * Result of the useLayoutTransition hook
 */
interface UseLayoutTransitionResult {
  /**
   * Current layout being displayed
   */
  currentLayout: FlexboxLayoutDefinition
  /**
   * Whether a transition is currently in progress
   */
  isTransitioning: boolean
  /**
   * Function to switch to a new layout
   */
  switchToLayout: (newLayout: FlexboxLayoutDefinition) => void
  /**
   * React component to render the current layout with transitions
   */
  LayoutRenderer: React.FC
  /**
   * Enhanced component registry with layout switching functions
   */
  enhancedRegistry: Record<string, React.ComponentType<any>>
}

/**
 * Hook for managing transitions between layout files
 *
 * @param options - Options for the hook
 * @returns Functions and state for managing layout transitions
 */
export function useLayoutTransition({
  duration = 200,
  componentRegistry,
  className = '',
}: UseLayoutTransitionOptions): UseLayoutTransitionResult {
  const theme = useTheme();
  const {
    currentLayout,
    previousLayout,
    isTransitioning,
    switchToLayout,
    setIsTransitioning
  } = useLayoutStore();

  // Handle transition complete
  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, [setIsTransitioning]);

  // Create a component to render the current layout with transitions
  const LayoutRenderer = useCallback(() => {
    return (
      <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
        {/* When not transitioning, use the standard renderer */}
        {!isTransitioning && (
          <StandardLayoutRenderer
            layoutFile={currentLayout}
            componentRegistry={componentRegistry}
          />
        )}

        {/* When transitioning, use SimpleLayoutTransition for smooth animations */}
        {isTransitioning && previousLayout && (
          <SimpleLayoutTransition
            beforeLayout={previousLayout}
            afterLayout={currentLayout}
            onComplete={handleTransitionComplete}
            duration={duration}
            className={className}
            renderSlotComponent={({ slotDef, slotNumber }) => {
              const componentId = slotDef.component?.componentId
              if (!componentId || !componentRegistry[componentId]) return null

              const Component = componentRegistry[componentId]

              return (
                <Box sx={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Header component if available */}
                  {slotDef.headerComponent?.componentId && (
                    <Paper
                      elevation={0}
                      sx={{
                        flexShrink: 0,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        height: 64,
                        bgcolor: (theme) =>
                          theme.palette.mode === 'light'
                            ? alpha(theme.palette.background.default, 0.8)
                            : alpha(theme.palette.background.default, 0.8),
                        backdropFilter: 'blur(8px)'
                      }}
                    >
                      {renderComponent(
                        slotDef.headerComponent.componentId,
                        componentRegistry,
                        slotDef,
                      )}
                    </Paper>
                  )}

                  <Box sx={{
                    flexGrow: 1,
                    overflow: 'auto'
                  }}>
                    <Component slot={slotDef} />
                  </Box>

                  {/* Footer component if available */}
                  {slotDef.footerComponent?.componentId && (
                    <Box sx={{ flexShrink: 0 }}>
                      {renderComponent(
                        slotDef.footerComponent.componentId,
                        componentRegistry,
                        slotDef,
                      )}
                    </Box>
                  )}
                </Box>
              )
            }}
          />
        )}
      </Box>
    )
  }, [
    isTransitioning,
    currentLayout,
    previousLayout,
    componentRegistry,
    handleTransitionComplete,
    duration,
    className,
    theme,
  ])

  return {
    currentLayout,
    isTransitioning,
    switchToLayout,
    LayoutRenderer,
    enhancedRegistry: componentRegistry,
  }
}
