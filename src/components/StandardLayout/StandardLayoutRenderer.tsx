import React from 'react'
import { useStandardLayoutManager } from '../../hooks/useStandardLayoutManager'
import { StandardLayoutContext } from './StandardLayoutContext'
import { StandardLayoutSlot } from './StandardLayoutSlot'
import type { StandardLayoutRendererProps } from './types'
import { Box } from '@mui/material'

export function StandardLayoutRenderer({
  layoutFile,
  componentRegistry,
}: StandardLayoutRendererProps) {
  const {
    currentLayout,
    isTransitioning,
    switchToVariant,
  } = useStandardLayoutManager(layoutFile)

  return (
    <StandardLayoutContext.Provider
      value={{ switchToVariant, isTransitioning }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
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
