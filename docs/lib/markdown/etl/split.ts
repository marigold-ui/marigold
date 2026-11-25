/**
 * Size splitting for the RAG chunker. Kept apart from chunker.ts, which runs
 * on import, so the rules can be unit tested.
 */

export const MAX_CHARS = 10_000;

/** Split markdown at headings of a given level */
export function splitAt(
  text: string,
  level: number
): { heading: string; body: string }[] {
  const marker = '#'.repeat(level) + ' ';
  const result: { heading: string; body: string }[] = [];
  let h = '',
    lines: string[] = [],
    fence = false;

  const flush = () => {
    const body = lines.join('\n').trim();
    if (body || h) result.push({ heading: h, body });
    lines = [];
  };

  for (const line of text.split('\n')) {
    if (line.trimStart().startsWith('```')) fence = !fence;
    if (!fence && line.startsWith(marker) && line[level] !== '#') {
      flush();
      h = line.slice(marker.length).trim();
    } else {
      lines.push(line);
    }
  }
  flush();
  return result;
}

/** Recursively split until each chunk fits MAX_CHARS */
export function fit(
  heading: string,
  text: string,
  level = 3
): { heading: string; text: string }[] {
  if (text.length <= MAX_CHARS) return [{ heading, text }];

  if (level <= 3) {
    const parts = splitAt(text, level);
    if (parts.length > 1)
      return parts.flatMap(p =>
        fit(
          p.heading ? `${heading} > ${p.heading}` : heading,
          p.body,
          level + 1
        )
      );
    return fit(heading, text, level + 1);
  }

  // Paragraph fallback
  const out: { heading: string; text: string }[] = [];
  let acc = '',
    n = 1;
  for (const p of text.split(/\n{2,}/).flatMap(splitTable)) {
    if (acc && `${acc}\n\n${p}`.length > MAX_CHARS) {
      out.push({
        heading: n > 1 ? `${heading} [${n}]` : heading,
        text: acc,
      });
      acc = p;
      n++;
    } else {
      acc = acc ? `${acc}\n\n${p}` : p;
    }
  }
  if (acc.trim())
    out.push({
      heading: n > 1 ? `${heading} [${n}]` : heading,
      text: acc.trim(),
    });
  return out;
}

const isTableRow = (line: string): boolean => line.trimStart().startsWith('|');

/**
 * A markdown table is one paragraph, so the paragraph fallback in `fit` cannot
 * cut it. A generated props table can run to 20,000 characters, past MAX_CHARS and
 * close to the embedding model's input limit. Split it by rows instead, and
 * repeat the header and alignment rows so every piece is still a table.
 */
export function splitTable(paragraph: string): string[] {
  const lines = paragraph.split('\n');
  if (
    paragraph.length <= MAX_CHARS ||
    lines.length < 3 ||
    !lines.every(isTableRow)
  )
    return [paragraph];

  const head = lines.slice(0, 2).join('\n');
  const pieces: string[] = [];
  let rows: string[] = [];
  for (const row of lines.slice(2)) {
    if (rows.length && [head, ...rows, row].join('\n').length > MAX_CHARS) {
      pieces.push([head, ...rows].join('\n'));
      rows = [];
    }
    rows.push(row);
  }
  pieces.push([head, ...rows].join('\n'));
  return pieces;
}
