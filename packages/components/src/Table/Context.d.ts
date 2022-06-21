/// <reference types="react" />
import { TableState } from '@react-stately/table';
import { ComponentStyleParts } from '@marigold/system';
export interface TableContextProps {
  state: TableState<object>;
  styles: ComponentStyleParts<['table', 'header', 'row', 'cell']>;
}
export declare const TableContext: import('react').Context<TableContextProps>;
export declare const useTableContext: () => TableContextProps;
//# sourceMappingURL=Context.d.ts.map
