"use client";

import { useLayoutTransition } from "@/hooks/useLayoutTransition";
import { workspaceComponentRegistry } from "@/sections/home/componentRegistry";
import React from "react";

export function HomeContainer(): React.JSX.Element {
  const { LayoutRenderer } = useLayoutTransition({
    duration: 200,
    componentRegistry: workspaceComponentRegistry,
    className: "",
  });

  return <LayoutRenderer />;
}

HomeContainer.displayName = "HomeContainer";
