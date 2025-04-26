/**
 * @file useSidebarState.ts
 * @description Hook for accessing the sidebar state
 * @module src/shared/hooks/useSidebarState
 */

import { create } from "zustand";

interface SidebarState {
  /**
   * Whether the sidebar is collapsed
   */
  isCollapsed: boolean;
  /**
   * Toggle the sidebar state
   */
  toggleSidebar: () => void;
  /**
   * Set the sidebar state
   */
  setSidebarCollapsed: (isCollapsed: boolean) => void;
}

/**
 * Store for managing the sidebar state
 */
export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: true,
  toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setSidebarCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
}));

/**
 * Hook for accessing the sidebar state
 *
 * @returns The sidebar state and functions to manipulate it
 */
export function useSidebarState() {
  const { isCollapsed, toggleSidebar, setSidebarCollapsed } = useSidebarStore();

  // Calculate the margin based on the sidebar state
  const sidebarMargin = isCollapsed ? 64 : 240;

  return {
    isCollapsed,
    toggleSidebar,
    setSidebarCollapsed,
    sidebarMargin,
  };
}
