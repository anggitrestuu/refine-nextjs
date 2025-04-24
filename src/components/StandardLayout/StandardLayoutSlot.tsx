/**
 * @file StandardLayoutSlot component for rendering a single slot in the layout
 * @module src/shared/ui/StandardLayout/StandardLayoutSlot
 */

import React from 'react';
import { Box, Paper } from '@mui/material';
import type { ParsedStandardSlot } from '../../lib/layout/standardParseLayout';
import type { StandardLayoutSlotProps } from './types';

/**
 * StandardLayoutSlot component for rendering a single slot in the layout
 */
export function StandardLayoutSlot({
  slot,
  componentRegistry,
}: StandardLayoutSlotProps) {
  const componentId = slot.component?.componentId;
  const Component = componentId ? componentRegistry[componentId] : null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: slot.width,
      }}
      data-slot-number={slot.slotNumber}
      data-depth={slot.depth}
    >
      {slot.headerComponent?.componentId && (
        <Paper
          elevation={0}
          sx={{
            flexShrink: 0,
            height: 64, // equivalent to h-16
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: (theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(26, 32, 39, 0.8)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {renderComponent(
            slot.headerComponent.componentId,
            componentRegistry,
            slot,
          )}
        </Paper>
      )}

      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        {Component ? <Component slot={slot} /> : null}
      </Box>

      {slot.footerComponent?.componentId && (
        <Box sx={{ flexShrink: 0 }}>
          {renderComponent(
            slot.footerComponent.componentId,
            componentRegistry,
            slot,
          )}
        </Box>
      )}
    </Box>
  );
}

/**
 * Helper function to render a component from the registry
 */
export function renderComponent(
  componentId: string,
  componentRegistry: Record<string, React.ComponentType<any>>,
  slot: ParsedStandardSlot,
) {
  const Component = componentRegistry[componentId];
  return Component ? (
    <Component slot={slot} componentRegistry={componentRegistry} />
  ) : null;
}
