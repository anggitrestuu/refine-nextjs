/**
 * @file Type definitions for StandardLayout components
 * @module src/shared/ui/StandardLayout/types
 */

import type { ParsedStandardSlot } from '../../lib/layout/standardParseLayout'
import type { StandardLayoutDefinition } from '../../types/standardLayout'

/**
 * Props for the StandardLayoutRenderer component
 */
export interface StandardLayoutRendererProps {
  /** The layout file to render */
  layoutFile: StandardLayoutDefinition
  /** Registry of components to render in slots */
  componentRegistry: Record<string, React.ComponentType<any>>
  /** Optional className for the container */
  className?: string
}

/**
 * Props for the StandardLayoutSlot component
 */
export interface StandardLayoutSlotProps {
  /** The slot to render */
  slot: ParsedStandardSlot
  /** Registry of components to render in slots */
  componentRegistry: Record<string, React.ComponentType<any>>
}
