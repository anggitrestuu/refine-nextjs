type SlotNumber = number;

interface FlexboxSlotDefinition {
  /** Slot number (can be integer or decimal) */
  slotNumber: SlotNumber;
  /** Width of the slot (percentage or CSS value) */
  width: string | number;
  /** Component to render in the slot */
  component?: {
    /** Component ID */
    componentId?: string;
    /** Component title */
    title?: string;
    /** Additional component props */
    [key: string]: any;
  };
  /** Header component */
  headerComponent?: {
    /** Component ID */
    componentId?: string;
    /** Component title */
    title?: string;
    /** Additional component props */
    [key: string]: any;
  };
  /** Footer component */
  footerComponent?: {
    /** Component ID */
    componentId?: string;
    /** Component title */
    title?: string;
    /** Additional component props */
    [key: string]: any;
  };
  /** Child components for recursive slots */
  children?: Array<{
    /** Child ID */
    childId: string;
    /** Hierarchy level */
    level?: number;
    /** Child title */
    title?: string;
    /** Component ID */
    componentId?: string;
  }>;
  /** Additional slot properties */
  [key: string]: any;
}

interface FlexboxLayoutDefinition {
  /** Slots in the layout */
  slots: FlexboxSlotDefinition[];
  /** Layout ID */
  id?: string;
  /** Layout name */
  name?: string;
  /** Layout description */
  description?: string;
  /** Layout variants */
  variants?: Record<string, { slots: FlexboxSlotDefinition[] }>;
  /** Additional layout properties */
  [key: string]: any;
}
