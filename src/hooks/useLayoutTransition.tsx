/**
 * @file useLayoutTransition.tsx
 * @description Hook for managing transitions between layout files
 * @module src/shared/hooks/useLayoutTransition
 */

import { SimpleLayoutTransition } from '@/components/SimpleLayoutTransition'
import { StandardLayoutRenderer } from '@/components/StandardLayout/StandardLayoutRenderer'
import { renderComponent } from '@/components/StandardLayout/StandardLayoutSlot'
import React, { useState, useCallback } from 'react'

/**
 * Options for the useLayoutTransition hook
 */
interface UseLayoutTransitionOptions {
  /**
   * Initial layout to display
   */
  initialLayout: FlexboxLayoutDefinition
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
  initialLayout,
  duration = 200,
  componentRegistry,
  className = '',
}: UseLayoutTransitionOptions): UseLayoutTransitionResult {
  // Current layout state
  const [currentLayout, setCurrentLayout] = useState(initialLayout)
  const [previousLayout, setPreviousLayout] =
    useState<FlexboxLayoutDefinition | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentVisualState, setCurrentVisualState] = useState<
    Record<number, { left: number; width: number }>
  >({})

  // Function to switch to a new layout
  const switchToLayout = useCallback(
    (newLayout: FlexboxLayoutDefinition) => {
      if (isTransitioning) return

      setPreviousLayout(currentLayout)
      setIsTransitioning(true)
      setCurrentLayout(newLayout)
    },
    [currentLayout, isTransitioning],
  )

  // Handle transition complete
  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false)

    // Update current visual state based on the current layout
    const newVisualState: Record<number, { left: number; width: number }> = {}

    // Calculate the positions based on the current layout
    let currentLeft = 0
    for (const slot of currentLayout.slots) {
      const widthPercent = Number.parseFloat(String(slot.width)) / 100
      const width = widthPercent * 100 // Convert to percentage units

      newVisualState[slot.slotNumber] = {
        left: currentLeft,
        width,
      }

      currentLeft += width
    }

    setCurrentVisualState(newVisualState)
  }, [currentLayout])

  // Create a component to render the current layout with transitions
  const LayoutRenderer = useCallback(() => {
    return (
      <div className="h-full w-full relative">
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
              // Render the actual component from the registry
              const componentId = slotDef.component?.componentId
              if (!componentId || !componentRegistry[componentId]) return null

              const Component = componentRegistry[componentId]

              return (
                <div className="h-full w-full flex flex-col">
                  {/* Header component if available */}
                  {slotDef.headerComponent?.componentId && (
                    <div className="flex-none border-b border-border-light dark:border-border-dark h-16 bg-surface-light/80 dark:bg-surface-mid/80 backdrop-blur-sm">
                      {renderComponent(
                        slotDef.headerComponent.componentId,
                        componentRegistry,
                        slotDef,
                      )}
                    </div>
                  )}

                  <div className="flex-1 overflow-auto">
                    <Component slot={slotDef} />
                  </div>

                  {/* Footer component if available */}
                  {slotDef.footerComponent?.componentId && (
                    <div className="flex-none">
                      {renderComponent(
                        slotDef.footerComponent.componentId,
                        componentRegistry,
                        slotDef,
                      )}
                    </div>
                  )}
                </div>
              )
            }}
          />
        )}
      </div>
    )
  }, [
    isTransitioning,
    currentLayout,
    previousLayout,
    componentRegistry,
    handleTransitionComplete,
    duration,
    className,
  ])

  // Create an enhanced registry that can be used to pass layout switching functions
  const enhancedRegistry = componentRegistry

  return {
    currentLayout,
    isTransitioning,
    switchToLayout,
    LayoutRenderer,
    enhancedRegistry,
  }
}
