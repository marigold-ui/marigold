export interface Codemod {
  name: string;
  apply: (source: string) => CodemodOutcome;
}

export type CodemodOutcome =
  | { kind: 'edited'; output: string; changes: string[]; warnings: string[] }
  | { kind: 'unchanged'; warnings: string[] }
  | { kind: 'skipped'; reason: string };

export interface RestructureEntry {
  component: string;
  /** slot that receives the consumer's existing single-cva styles */
  primarySlot: string;
}

export interface ScaffoldEntry {
  name: string;
  /**
   * Components whose presence in the consumer theme makes this one required
   * at runtime (e.g. Checkbox renders BooleanField internally).
   */
  requiredBy: string[];
  /** shown in the report: why this component must exist in the theme */
  reason?: string;
  /**
   * Per-slot cva() argument source for slots whose classes are load-bearing
   * layout (2-space indented). Slots not listed are stubbed as `cva({})`.
   */
  loadBearing?: Record<string, string>;
}

export interface SwapEntry {
  component: string;
  slot: string;
  /**
   * Class-string literals of the old-baseline cva() argument, in source
   * order. The swap fires only when the consumer's literals equal these
   * byte-for-byte — proof the slot was never customized.
   */
  oldClasses: string[];
  /** Replacement source for the whole cva() argument (2-space indented). */
  newSource: string;
}

export interface StructureWarning {
  component: string;
  text: string;
}

export interface JsxRenameEntry {
  component: string;
  from: string;
  to: string;
  /** additionally wrap the prop value in an array (e.g. acceptedFileTypes) */
  wrapInArray?: boolean;
}

export interface JsxMemberRenameEntry {
  /** the compound root, e.g. 'Tabs' for Tabs.TabPanel */
  object: string;
  from: string;
  to: string;
}

export interface JsxRemovalEntry {
  component: string;
  prop: string;
  /** appended to the change message, e.g. what replaces the prop */
  note?: string;
}

export interface JsxImportRenameEntry {
  /** package the export moved in, e.g. '@marigold/icons' */
  package: string;
  from: string;
  to: string;
  /** appended to the change message, e.g. provenance of the mapping */
  note?: string;
}

export interface JsxUsageWarning {
  component: string;
  /** without `prop`, warns when the component is imported at all */
  prop?: string;
  /** with `value`, warns only when the prop has this literal value (or one
   *  that cannot be verified statically) */
  value?: string;
  text: string;
}

/**
 * Safe application-code transforms: lexically decidable prop renames and
 * removals on components verifiably imported from @marigold/components.
 * Anything requiring structural JSX moves or a design decision belongs in
 * `warnings`, never here.
 */
export interface JsxChanges {
  renames: JsxRenameEntry[];
  memberRenames: JsxMemberRenameEntry[];
  removals: JsxRemovalEntry[];
  /**
   * Renamed exports (e.g. the v18 icon migration). Applied via the
   * release-notes-blessed alias strategy: `import { Store as Pickup }` keeps
   * every call site untouched and cannot collide or shadow.
   */
  importRenames: JsxImportRenameEntry[];
  warnings: JsxUsageWarning[];
}

export interface MigrationManifest {
  schemaVersion: 1;
  version: string;
  /**
   * Slot sets of the target version, keyed by component. `null` marks a
   * single style function (no slots). Source of truth: the `Theme` type in
   * @marigold/system — codegen will derive this; the v18 file is hand-written.
   */
  slots: Record<string, readonly string[] | null>;
  restructures: RestructureEntry[];
  scaffolds: ScaffoldEntry[];
  /** Formerly valid component keys that no longer exist. */
  removedComponents: string[];
  swaps: SwapEntry[];
  structureWarnings: StructureWarning[];
  jsx: JsxChanges;
  /**
   * Pinned base URL of the default theme's component style sources
   * (`<url>/<Component>.styles.ts`), used in reports as the reference for
   * what a slot's styles look like in the target version.
   */
  stylesReferenceUrl?: string;
}
