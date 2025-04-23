/**
 * @file Standard layout parser for handling layout variants with decimal slot notation
 * @description Parses standard layout files with support for decimal slot notation and variants
 */

/**
 * Represents a parsed slot with additional hierarchical information
 */
export interface ParsedStandardSlot extends FlexboxSlotDefinition {
  /** Hierarchy depth (0 = top-level) */
  depth: number;
  /** Parent slot number (or null for top-level) */
  parentSlot: number | null;
  /** Position within parent */
  position: number;
}

/**
 * Represents a parsed layout with processed slot information
 */
export interface ParsedStandardLayout
  extends Omit<FlexboxLayoutDefinition, "slots" | "variants"> {
  /** Parsed slots with hierarchical information */
  slots: ParsedStandardSlot[];
  /** Animation configuration */
  animation?: {
    /** Animation duration in milliseconds */
    duration: number;
    /** Animation easing function */
    easing: string;
  };
}

/**
 * Parses a standard layout file and resolves a specific variant
 * @param layoutFile The complete layout definition
 * @param variantName The name of the variant to parse
 * @returns A parsed layout with resolved slots and metadata
 */
export function parseStandardLayout(
  layoutFile: FlexboxLayoutDefinition,
  variantName = "default"
): ParsedStandardLayout {
  // Create a deep copy of the base layout
  const layout: ParsedStandardLayout = {
    slots: layoutFile.slots.map(processSlot),
    id: layoutFile.id,
    name: layoutFile.name,
    description: layoutFile.description,
    animation: layoutFile.animation
      ? {
          duration:
            typeof layoutFile.animation.duration === "number"
              ? layoutFile.animation.duration
              : 300,
          easing:
            typeof layoutFile.animation.easing === "string"
              ? layoutFile.animation.easing
              : "ease",
        }
      : { duration: 300, easing: "ease" },
  };

  // If a variant is specified and exists, merge its properties
  if (
    variantName !== "default" &&
    layoutFile.variants &&
    layoutFile.variants[variantName]
  ) {
    const variant = layoutFile.variants[variantName];

    // Override slots if variant specifies them
    if (variant.slots) {
      layout.slots = variant.slots.map(processSlot);
    }
  }

  return layout;
}

/**
 * Process a slot to add hierarchical metadata
 * @param slot The original layout slot
 * @returns A parsed layout slot with additional metadata
 */
function processSlot(slot: FlexboxSlotDefinition): ParsedStandardSlot {
  const slotParts = String(slot.slotNumber).split(".");

  return {
    ...slot,
    depth: slotParts.length - 1, // Hierarchy depth
    parentSlot:
      slotParts.length > 1 ? Number(slotParts.slice(0, -1).join(".")) : null, // Parent slot number
    position: Number(slotParts[slotParts.length - 1]), // Position within parent
  };
}
