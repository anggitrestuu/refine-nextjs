/**
 * @file StandardLayoutContext for managing layout variant transitions
 * @module src/shared/ui/StandardLayout/StandardLayoutContext
 */

import { createContext, useContext } from 'react'

/**
 * Context for layout management, allowing child components to switch variants
 */
export const StandardLayoutContext = createContext<{
  switchToVariant: (variantName: string) => void
  isTransitioning: boolean
}>({
  switchToVariant: () => { },
  isTransitioning: false,
})

/**
 * Hook to access the layout context
 */
export function useStandardLayoutContext() {
  return useContext(StandardLayoutContext)
}
