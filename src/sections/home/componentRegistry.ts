import type React from "react";
import { ChatWindow as Chat } from "@sections/home/chat";
import { QuickOptions } from "./quick-options";
import { AgentGallery } from "./agent";

export const workspaceComponentRegistry: Record<string, React.ComponentType> = {
  // Main components
  "chat-container": Chat,
  "quick-options": QuickOptions,
  "agent-gallery": AgentGallery,
  // Layout navigation components
  // Add other components here as needed
};

export function isValidWorkspaceComponentKey(
  key: string
): key is keyof typeof workspaceComponentRegistry {
  return key in workspaceComponentRegistry;
}
