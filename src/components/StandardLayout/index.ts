/**
 * @file StandardLayout components barrel file
 * @module src/shared/ui/StandardLayout
 */

export { StandardLayoutRenderer } from "./StandardLayoutRenderer";
export { StandardLayoutSlot, renderComponent } from "./StandardLayoutSlot";
export {
  StandardLayoutContext,
  useStandardLayoutContext,
} from "./StandardLayoutContext";

export type {
  StandardLayoutRendererProps,
  StandardLayoutSlotProps,
} from "./types";
