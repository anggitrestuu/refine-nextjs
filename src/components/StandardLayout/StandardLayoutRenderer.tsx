/**
 * @file StandardLayoutRenderer component for rendering layouts with the standard layout system
 * @module src/shared/ui/StandardLayout/StandardLayoutRenderer
 */

import React from 'react'
import { useSidebarState } from '../../hooks/useSidebarState'
import { useStandardLayoutManager } from '../../hooks/useStandardLayoutManager'
import { StandardLayoutContext } from './StandardLayoutContext'
import { StandardLayoutSlot } from './StandardLayoutSlot'
import type { StandardLayoutRendererProps } from './types'
import { Box } from '@mui/material'

/**
 * StandardLayoutRenderer component for rendering layouts with the standard layout system
 */
export function StandardLayoutRenderer({
  layoutFile,
  componentRegistry,
  className,
}: StandardLayoutRendererProps) {
  const {
    currentLayout,
    isTransitioning,
    switchToVariant,
    handleTransitionComplete,
  } = useStandardLayoutManager(layoutFile)

  // Get sidebar state
  const { sidebarMargin } = useSidebarState()

  return (
    <StandardLayoutContext.Provider
      value={{ switchToVariant, isTransitioning }}
    >
      <Box
        // className={`flex h-full w-full flex-1 ${className || ''}`}
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1, // Lower z-index to prevent overlapping with sidebar (z-index: 40)
        }}
        style={{
          marginLeft: sidebarMargin, // Respect the sidebar margin
          width: `calc(100% - ${sidebarMargin})`, // Adjust width to account for sidebar margin
        }}
      >
        {currentLayout.slots.map((slot) => (
          <StandardLayoutSlot
            key={slot.slotNumber}
            slot={slot}
            componentRegistry={componentRegistry}
          />
        ))}
      </Box>
    </StandardLayoutContext.Provider>
  )
}
