/**
 * @file enhanceRegistryWithLayoutSwitching.ts
 * @description Utility function to enhance a component registry with layout switching capabilities
 * @module src/shared/lib/layout/enhanceRegistryWithLayoutSwitching
 */

import { withLayoutSwitching } from "@/lib/layout/withLayoutSwitching";
import type React from "react";

/**
 * Layout switching configuration for a component
 */
interface LayoutSwitchingConfig {
  /**
   * Component ID in the registry
   */
  componentId: string;
  /**
   * Target layout to switch to
   */
  targetLayout: FlexboxLayoutDefinition;
}

/**
 * Enhances a component registry with layout switching capabilities
 *
 * @param registry - The original component registry
 * @param switchToLayout - Function to switch to a new layout
 * @param configs - Array of layout switching configurations
 * @returns Enhanced component registry
 */
export function enhanceRegistryWithLayoutSwitching(
  registry: Record<string, React.ComponentType<any>>,
  switchToLayout: (layout: FlexboxLayoutDefinition) => void,
  configs: LayoutSwitchingConfig[]
): Record<string, React.ComponentType<any>> {
  const enhancedRegistry = { ...registry };

  for (const config of configs) {
    const { componentId, targetLayout } = config;
    const Component = registry[componentId];

    if (Component) {
      enhancedRegistry[componentId] = withLayoutSwitching(
        Component,
        targetLayout,
        switchToLayout
      );
    }
  }

  return enhancedRegistry;
}
