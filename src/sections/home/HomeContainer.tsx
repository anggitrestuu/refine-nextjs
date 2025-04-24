"use client";

import { useLayoutTransition } from "@/hooks/useLayoutTransition";
import mainPageLayout from "./layout/mainPageLayout";
import { workspaceComponentRegistry } from "@/sections/home/componentRegistry";
import React from "react";

export function HomeContainer(): React.JSX.Element {
  // Use the layout transition hook
  const { LayoutRenderer } = useLayoutTransition({
    initialLayout: mainPageLayout,
    duration: 200,
    componentRegistry: workspaceComponentRegistry,
    className: "",
  });

  return <LayoutRenderer />;
}

HomeContainer.displayName = "HomeContainer";
