import { create } from "zustand";
import mainPageLayout from "@/sections/home/layout/mainPageLayout";
import aiGalleryLayout from "@sections/home/layout/aiGalleryLayout";

interface LayoutState {
  currentLayout: FlexboxLayoutDefinition;
  previousLayout: FlexboxLayoutDefinition | null;
  isTransitioning: boolean;
  switchToLayout: (newLayout: FlexboxLayoutDefinition) => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
  setPreviousLayout: (layout: FlexboxLayoutDefinition | null) => void;
}

export const useLayoutStore = create<LayoutState>((set, get) => ({
  currentLayout: mainPageLayout,
  previousLayout: null,
  isTransitioning: false,
  switchToLayout: (newLayout: FlexboxLayoutDefinition) => {
    const { isTransitioning, currentLayout } = get();
    if (isTransitioning) return;

    set({
      previousLayout: currentLayout,
      isTransitioning: true,
      currentLayout: newLayout,
    });
  },
  setIsTransitioning: (isTransitioning: boolean) => set({ isTransitioning }),
  setPreviousLayout: (layout: FlexboxLayoutDefinition | null) =>
    set({ previousLayout: layout }),
}));
