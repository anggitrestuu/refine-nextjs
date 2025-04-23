/**
 * @file Hook for managing standard layout variants with decimal slot notation
 */
import { useCallback, useMemo, useState } from "react";
import { parseStandardLayout } from "../lib/layout/standardParseLayout";
import type { ParsedStandardLayout } from "../lib/layout/standardParseLayout";

/**
 * Hook for managing standard layout variants with decimal slot notation
 *
 * @param layoutFile - The standard layout configuration file containing variants
 * @returns An object with layout management methods and state
 */
export function useStandardLayoutManager(layoutFile: FlexboxLayoutDefinition) {
  const [currentVariant, setCurrentVariant] = useState<string>("default");
  const [previousVariant, setPreviousVariant] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Parse the current layout variant
  const currentLayout = useMemo<ParsedStandardLayout>(() => {
    return parseStandardLayout(layoutFile, currentVariant);
  }, [layoutFile, currentVariant]);

  // Function to switch to a different variant
  const switchToVariant = useCallback(
    (variantName: string) => {
      if (!layoutFile.variants || !layoutFile.variants[variantName]) {
        console.warn(`Variant "${variantName}" does not exist`);
        return;
      }

      setPreviousVariant(currentVariant);
      setCurrentVariant(variantName);
      setIsTransitioning(true);
    },
    [layoutFile, currentVariant]
  );

  // Function to handle transition completion
  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return {
    currentLayout,
    currentVariant,
    previousVariant,
    isTransitioning,
    switchToVariant,
    handleTransitionComplete,
  };
}
