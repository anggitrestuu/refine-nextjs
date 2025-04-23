"use client";

/**
 * @file HomePageLayout.tsx
 * @description Component that manages layout transitions for the home page
 * @module src/widgets/layout/HomePageLayout
 */

import { useLayoutTransition } from "@/hooks/useLayoutTransition";
import { enhanceRegistryWithLayoutSwitching } from "@/lib/layout/enhanceRegistryWithLayoutSwitching";
import mainPageLayout from "./mainPageLayout";
import { workspaceComponentRegistry } from "@/sections/home/componentRegistry";
import React from "react";

/**
 * HomePageLayout component that manages layout transitions
 *
 * @returns {React.JSX.Element} The HomePageLayout component
 */
export function HomePageLayout(): React.JSX.Element {
  // Create a memoized enhanced registry
  const [enhancedRegistry, setEnhancedRegistry] = React.useState<
    Record<string, React.ComponentType<any>>
  >(workspaceComponentRegistry);

  // Use the layout transition hook
  const { switchToLayout, LayoutRenderer } = useLayoutTransition({
    initialLayout: mainPageLayout,
    duration: 200,
    componentRegistry: enhancedRegistry,
    className: "",
  });

  // // Enhance the registry with layout switching capabilities
  // React.useEffect(() => {
  //   // First enhance individual buttons
  //   const registryWithButtons = enhanceRegistryWithLayoutSwitching(
  //     workspaceComponentRegistry,
  //     switchToLayout,
  //     [
  //       {
  //         componentId: "back-button",
  //         targetLayout: mainPageLayout,
  //       },
  //     ]
  //   );



  //   setEnhancedRegistry(newRegistry);
  // }, [switchToLayout]);

  return <LayoutRenderer />;
}

HomePageLayout.displayName = "HomePageLayout";
