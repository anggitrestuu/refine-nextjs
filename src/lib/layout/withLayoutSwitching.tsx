/**
 * @file withLayoutSwitching.tsx
 * @description Higher-order component for adding layout switching capabilities to components
 * @module src/shared/hoc/withLayoutSwitching
 */

import React from 'react'

/**
 * Props for components enhanced with layout switching capabilities
 */
export interface WithLayoutSwitchingProps {
  /**
   * Function to switch to a new layout
   */
  onSwitchLayout?: () => void
  /**
   * Original props passed to the component
   */
  [key: string]: any
}

/**
 * Higher-order component that adds layout switching capabilities to a component
 *
 * @param Component - The component to enhance
 * @param targetLayout - The layout to switch to when the component is triggered
 * @param switchToLayout - Function to switch to a new layout
 * @returns Enhanced component with layout switching capabilities
 */
export function withLayoutSwitching<P extends object>(
  Component: React.ComponentType<P>,
  targetLayout: FlexboxLayoutDefinition,
  switchToLayout: (layout: FlexboxLayoutDefinition) => void,
): React.FC<
  Omit<P, keyof WithLayoutSwitchingProps> & Partial<WithLayoutSwitchingProps>
> {
  const EnhancedComponent: React.FC<
    Omit<P, keyof WithLayoutSwitchingProps> & Partial<WithLayoutSwitchingProps>
  > = (props) => {
    const { onSwitchLayout, ...rest } = props

    const handleSwitchLayout = () => {
      if (onSwitchLayout) {
        onSwitchLayout()
      } else {
        switchToLayout(targetLayout)
      }
    }

    return <Component {...(rest as P)} onSwitchLayout={handleSwitchLayout} />
  }

  EnhancedComponent.displayName = `withLayoutSwitching(${Component.displayName || Component.name || 'Component'})`

  return EnhancedComponent
}
