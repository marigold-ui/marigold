import type { Node } from 'unist';
import { MdxJsxElement, extractText, findJsxElements } from './shared';

export function convertTableToMarkdown(tableNode: MdxJsxElement): Node | null {
  const children = tableNode.children || [];
  const headers = findJsxElements(children, 'Table.Header');
  const headerCells =
    headers.length > 0
      ? findJsxElements(headers[0].children || [], 'Table.Column').map(
          extractText
        )
      : [];

  const bodies = findJsxElements(children, 'Table.Body');
  const rows: string[][] = [];

  if (bodies.length > 0) {
    const rowElements = findJsxElements(bodies[0].children || [], 'Table.Row');
    for (const row of rowElements) {
      const cells = findJsxElements(row.children || [], 'Table.Cell').map(
        extractText
      );
      if (cells.length > 0) rows.push(cells);
    }
  }

  if (headerCells.length === 0 && rows.length === 0) return null;

  const tableRows: Node[] = [];

  if (headerCells.length > 0) {
    tableRows.push({
      type: 'tableRow',
      children: headerCells.map(cell => ({
        type: 'tableCell',
        children: [{ type: 'text', value: cell }],
      })),
    } as Node);
  }

  for (const cells of rows) {
    tableRows.push({
      type: 'tableRow',
      children: cells.map(cell => ({
        type: 'tableCell',
        children: [{ type: 'text', value: cell }],
      })),
    } as Node);
  }

  return tableRows.length > 0
    ? ({
        type: 'table',
        align: headerCells.map(() => 'left'),
        children: tableRows,
      } as Node)
    : null;
}

export function convertHtmlTableToMarkdown(
  tableNode: MdxJsxElement
): Node | null {
  const children = tableNode.children || [];

  const thead = findJsxElements(children, 'thead');
  const tbody = findJsxElements(children, 'tbody');

  let headerCells: string[] = [];
  if (thead.length > 0) {
    const headerRows = findJsxElements(thead[0].children || [], 'tr');
    if (headerRows.length > 0) {
      headerCells = findJsxElements(headerRows[0].children || [], 'th').map(
        extractText
      );
    }
  }

  const rows: string[][] = [];
  if (tbody.length > 0) {
    const bodyRows = findJsxElements(tbody[0].children || [], 'tr');
    for (const row of bodyRows) {
      const cells = findJsxElements(row.children || [], 'td').map(extractText);
      if (cells.length > 0) rows.push(cells);
    }
  }

  if (headerCells.length === 0 && rows.length === 0) {
    const directRows = findJsxElements(children, 'tr');
    for (let i = 0; i < directRows.length; i++) {
      const row = directRows[i];
      const thCells = findJsxElements(row.children || [], 'th').map(
        extractText
      );
      const tdCells = findJsxElements(row.children || [], 'td').map(
        extractText
      );

      if (thCells.length > 0 && headerCells.length === 0) {
        headerCells = thCells;
      } else if (tdCells.length > 0) {
        rows.push(tdCells);
      }
    }
  }

  if (headerCells.length === 0 && rows.length === 0) return null;

  const tableRows: Node[] = [];

  if (headerCells.length > 0) {
    tableRows.push({
      type: 'tableRow',
      children: headerCells.map(cell => ({
        type: 'tableCell',
        children: [{ type: 'text', value: cell }],
      })),
    } as Node);
  }

  for (const cells of rows) {
    tableRows.push({
      type: 'tableRow',
      children: cells.map(cell => ({
        type: 'tableCell',
        children: [{ type: 'text', value: cell }],
      })),
    } as Node);
  }

  const colCount = Math.max(
    headerCells.length,
    rows.length > 0 ? rows[0].length : 0
  );

  return tableRows.length > 0
    ? ({
        type: 'table',
        align: Array(colCount).fill('left'),
        children: tableRows,
      } as Node)
    : null;
}
