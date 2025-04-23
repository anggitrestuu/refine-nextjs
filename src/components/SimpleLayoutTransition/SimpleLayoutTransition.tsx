'use client'

/**
 * @file SimpleLayoutTransition component
 * Implements a simple, smooth layout transition using Framer Motion
 */

import { useSidebarState } from '@hooks/useSidebarState'
import { motion } from 'framer-motion'
import React, { useCallback } from 'react'

/**
 * Props for the SimpleLayoutTransition component
 */
interface SimpleLayoutTransitionProps {
  /**
   * The layout before the transition
   */
  beforeLayout: FlexboxLayoutDefinition
  /**
   * The layout after the transition
   */
  afterLayout: FlexboxLayoutDefinition
  /**
   * Function to call when the transition is complete
   */
  onComplete?: () => void
  /**
   * Duration of the transition in milliseconds
   */
  duration?: number
  /**
   * Class name to apply to the container
   */
  className?: string
  /**
   * Function to render the content of a slot
   */
  renderSlotComponent?: (params: {
    slotDef: any
    slotNumber: number
  }) => React.ReactNode
}

/**
 * SimpleLayoutTransition component
 * Implements a simple, smooth layout transition using Framer Motion.
 *
 * @param {SimpleLayoutTransitionProps} props - The component props.
 * @returns {React.ReactElement} The rendered component.
 */
export function SimpleLayoutTransition({
  beforeLayout,
  afterLayout,
  onComplete,
  duration = 200,
  className = '',
  renderSlotComponent,
}: SimpleLayoutTransitionProps): React.ReactElement {
  // Handle animation complete
  const handleAnimationComplete = useCallback(() => {
    onComplete?.()
  }, [onComplete])

  // Get sidebar state
  const { sidebarMargin } = useSidebarState()

  // Combine classes
  const combinedClassName = `simple-layout-transition ${className}`.trim()

  // Get all unique slot numbers from both layouts
  const allSlotNumbers = React.useMemo(() => {
    const beforeSlotNumbers = beforeLayout.slots.map((slot) => slot.slotNumber)
    const afterSlotNumbers = afterLayout.slots.map((slot) => slot.slotNumber)
    return Array.from(
      new Set([...beforeSlotNumbers, ...afterSlotNumbers]),
    ).sort((a, b) => a - b)
  }, [beforeLayout, afterLayout])

  // Normalize widths to ensure they sum to 100%
  const normalizedWidths = React.useMemo(() => {
    // Normalize before layout widths
    const beforeWidths: Record<number, number> = {}
    let beforeTotal = 0
    for (const slot of beforeLayout.slots) {
      const width = Number.parseFloat(slot.width.toString().replace('%', ''))
      beforeWidths[slot.slotNumber] = width
      beforeTotal += width
    }

    // Apply normalization factor to before widths if needed
    const beforeFactor = beforeTotal > 0 ? 100 / beforeTotal : 1
    const normalizedBeforeWidths: Record<number, number> = {}
    for (const slotNumber in beforeWidths) {
      normalizedBeforeWidths[slotNumber] =
        beforeWidths[slotNumber] * beforeFactor
    }

    // Normalize after layout widths
    const afterWidths: Record<number, number> = {}
    let afterTotal = 0
    for (const slot of afterLayout.slots) {
      const width = Number.parseFloat(slot.width.toString().replace('%', ''))
      afterWidths[slot.slotNumber] = width
      afterTotal += width
    }

    // Apply normalization factor to after widths if needed
    const afterFactor = afterTotal > 0 ? 100 / afterTotal : 1
    const normalizedAfterWidths: Record<number, number> = {}
    for (const slotNumber in afterWidths) {
      normalizedAfterWidths[slotNumber] = afterWidths[slotNumber] * afterFactor
    }

    return { before: normalizedBeforeWidths, after: normalizedAfterWidths }
  }, [beforeLayout, afterLayout])

  // Track animation completions
  const [completedAnimations, setCompletedAnimations] = React.useState<
    Set<number>
  >(new Set())

  // Handle individual slot animation completion
  const handleSlotAnimationComplete = React.useCallback(
    (slotNumber: number) => {
      setCompletedAnimations((prev) => {
        const newSet = new Set(prev)
        newSet.add(slotNumber)

        // If all animations are complete, call the onComplete callback
        if (newSet.size === allSlotNumbers.length) {
          setTimeout(() => {
            onComplete?.()
          }, 0)
        }

        return newSet
      })
    },
    [allSlotNumbers, onComplete],
  )

  return (
    <div
      className={combinedClassName}
      style={{
        display: 'flex',
        width: `calc(100% - ${sidebarMargin})`, // Adjust width to account for sidebar margin
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1, // Lower z-index to prevent overlapping with sidebar (z-index: 40)
        marginLeft: sidebarMargin, // Respect the sidebar margin
      }}
    >
      {/* Render all slots from both layouts */}
      {allSlotNumbers.map((slotNumber) => {
        // Find the slot in both layouts
        const beforeSlot = beforeLayout.slots.find(
          (slot) => slot.slotNumber === slotNumber,
        )
        const afterSlot = afterLayout.slots.find(
          (slot) => slot.slotNumber === slotNumber,
        )

        // Determine if the slot is entering, exiting, or persisting
        const isEntering = !beforeSlot && afterSlot
        const isExiting = beforeSlot && !afterSlot
        const isPersisting = beforeSlot && afterSlot

        // Get the normalized width values
        const beforeWidthNum = beforeSlot
          ? normalizedWidths.before[slotNumber] || 0
          : 0
        const afterWidthNum = afterSlot
          ? normalizedWidths.after[slotNumber] || 0
          : 0

        // Skip slots that have zero width in both layouts
        if (beforeWidthNum === 0 && afterWidthNum === 0) return null

        // Use the appropriate slot definition
        const slotDef = afterSlot || beforeSlot
        if (!slotDef) return null

        return (
          <motion.div
            key={`slot-${slotNumber}`}
            initial={{ width: `${beforeWidthNum}%` }}
            animate={{ width: `${afterWidthNum}%` }}
            transition={{
              width: {
                duration: duration / 1000,
                ease: [0.25, 0.1, 0.25, 1.0], // Simple ease-in-out
              },
            }}
            onAnimationComplete={() => handleSlotAnimationComplete(slotNumber)}
            className="h-full"
            style={{
              overflow: 'hidden',
              height: '100%',
            }}
            data-slot-type={
              isEntering ? 'entering' : isExiting ? 'exiting' : 'persisting'
            }
          >
            {renderSlotComponent?.({ slotDef, slotNumber })}
          </motion.div>
        )
      })}
    </div>
  )
}

SimpleLayoutTransition.displayName = 'SimpleLayoutTransition'
