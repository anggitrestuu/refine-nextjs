/**
 * @file StandardLayoutSlot component for rendering a single slot in the layout
 * @module src/shared/ui/StandardLayout/StandardLayoutSlot
 */

import React from 'react'
import type { ParsedStandardSlot } from '../../lib/layout/standardParseLayout'
import type { StandardLayoutSlotProps } from './types'

/**
 * StandardLayoutSlot component for rendering a single slot in the layout
 */
export function StandardLayoutSlot({
  slot,
  componentRegistry,
}: StandardLayoutSlotProps) {
  const componentId = slot.component?.componentId
  const Component = componentId ? componentRegistry[componentId] : null

  return (
    <div
      className="flex flex-col h-full"
      style={{ width: slot.width }}
      data-slot-number={slot.slotNumber}
      data-depth={slot.depth}
    >
      {slot.headerComponent?.componentId && (
        <div className="flex-none border-b border-border-light dark:border-border-dark h-16 bg-surface-light/80 dark:bg-surface-mid/80 backdrop-blur-sm">
          {renderComponent(
            slot.headerComponent.componentId,
            componentRegistry,
            slot,
          )}
        </div>
      )}

      <div className="flex-1 overflow-auto">
        {Component ? <Component slot={slot} /> : null}
      </div>

      {slot.footerComponent?.componentId && (
        <div className="flex-none">
          {renderComponent(
            slot.footerComponent.componentId,
            componentRegistry,
            slot,
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Helper function to render a component from the registry
 */
export function renderComponent(
  componentId: string,
  componentRegistry: Record<string, React.ComponentType<any>>,
  slot: ParsedStandardSlot,
) {
  const Component = componentRegistry[componentId]
  return Component ? (
    <Component slot={slot} componentRegistry={componentRegistry} />
  ) : null
}
