import type React from "react";
import { Chat } from "@/sections/chat";
import { Agent } from "@/sections/agent";
import { Canvas } from "@/sections/canvas";

export const workspaceComponentRegistry: Record<string, React.ComponentType> = {
  // Main components
  "chat-container": Chat,
  "agent-container": Agent,
  "canvas-container": Canvas,
  // Layout navigation components
  // Add other components here as needed
};

/**
 * Type guard to check if a key exists in the registry.
 * @param {string} key - The key to check.
 * @returns {boolean} True if the key exists in the registry, false otherwise.
 */
export function isValidWorkspaceComponentKey(
  key: string
): key is keyof typeof workspaceComponentRegistry {
  return key in workspaceComponentRegistry;
}
