import { TableProps as AriaTableProps } from '@react-aria/table';
import {
  Cell,
  Column,
  Row,
  TableBody as Body,
  TableHeader as Header,
  TableStateProps,
} from '@react-stately/table';
import { ThemeExtensionsWithParts } from '@marigold/system';
export interface TableThemeExtension
  extends ThemeExtensionsWithParts<
    'Table',
    ['table', 'header', 'row', 'cell']
  > {}
export interface TableProps
  extends Pick<
      AriaTableProps<object>,
      'focusMode' | 'onRowAction' | 'onCellAction'
    >,
    Omit<TableStateProps<object>, 'showSelectionCheckboxes'> {
  variant?: string;
  size?: string;
  stretch?: boolean;
}
export declare const Table: Table;
/**
 * Necessary since TypeScript can not infer the
 * types of the @react-stately components.
 */
interface Table {
  (props: TableProps): JSX.Element;
  Body: typeof Body;
  Cell: typeof Cell;
  Column: typeof Column;
  Header: typeof Header;
  Row: typeof Row;
}
export {};
//# sourceMappingURL=Table.d.ts.map
