import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateDesignSystemUsage } from './design-system-usage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string): string =>
  path.join(__dirname, '..', '__fixtures__', name);

const tmpFile = (name: string, content: string): string => {
  const p = path.join(os.tmpdir(), name);
  fs.writeFileSync(p, content);
  return p;
};

describe('validateDesignSystemUsage — hallucinated components', () => {
  it('flags Box imported from @marigold/components as hallucinated', () => {
    const issues = validateDesignSystemUsage(
      fixture('hallucinated-components.tsx')
    );
    const boxIssue = issues.find(
      i => i.component === 'Box' && i.details?.hallucinated === true
    );
    expect(boxIssue).toBeDefined();
    expect(boxIssue?.message).toBe(
      '<Box> is not a Marigold component. It is not exported from @marigold/components.'
    );
    expect(boxIssue?.details?.importedFrom).toBe('@marigold/components');
  });

  it('flags Flex imported from @marigold/components as hallucinated', () => {
    const issues = validateDesignSystemUsage(
      fixture('hallucinated-components.tsx')
    );
    const flexIssue = issues.find(
      i => i.component === 'Flex' && i.details?.hallucinated === true
    );
    expect(flexIssue).toBeDefined();
    expect(flexIssue?.message).toBe(
      '<Flex> is not a Marigold component. It is not exported from @marigold/components.'
    );
  });

  it('tells user to search docs for non-existent component', () => {
    const issues = validateDesignSystemUsage(
      fixture('hallucinated-components.tsx')
    );
    const boxIssue = issues.find(i => i.component === 'Box');
    expect(boxIssue?.suggestion).toMatch(/does not exist/);
    expect(boxIssue?.suggestion).toMatch(/Search the Marigold docs/);
  });

  it('suggests dot notation for sub-component access pattern errors', () => {
    const file = tmpFile(
      'dsu-table-header.tsx',
      `import { TableHeader } from '@marigold/components';
const App = () => <TableHeader>Title</TableHeader>;
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const issue = issues.find(i => i.component === 'TableHeader');
    expect(issue).toBeDefined();
    expect(issue?.suggestion).toMatch(/Table\.Header/);
    expect(issue?.suggestion).toMatch(/dot notation/);
  });

  it('does not flag Button (valid Marigold component)', () => {
    const issues = validateDesignSystemUsage(fixture('valid-button.tsx'));
    const buttonIssue = issues.find(
      i => i.component === 'Button' && i.details?.hallucinated === true
    );
    expect(buttonIssue).toBeUndefined();
  });

  it('does not flag locally declared PascalCase components', () => {
    const issues = validateDesignSystemUsage(
      fixture('valid-local-components.tsx')
    );
    const myCardIssue = issues.find(i => i.component === 'MyCard');
    expect(myCardIssue).toBeUndefined();
  });

  it('does not flag components imported from other packages', () => {
    const file = tmpFile(
      'dsu-third-party.tsx',
      `import { SomeWidget } from 'some-library';
import { Button } from '@marigold/components';
const App = () => (
  <SomeWidget>
    <Button onPress={() => {}}>OK</Button>
  </SomeWidget>
);
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const widgetIssue = issues.find(i => i.component === 'SomeWidget');
    expect(widgetIssue).toBeUndefined();
  });

  it('marks hallucinated issues with details.hallucinated = true', () => {
    const issues = validateDesignSystemUsage(
      fixture('hallucinated-components.tsx')
    );
    const hallucinated = issues.filter(i => i.details?.hallucinated === true);
    expect(hallucinated.length).toBeGreaterThan(0);
    for (const issue of hallucinated) {
      expect(issue.details?.hallucinated).toBe(true);
    }
  });

  it("issues have severity 'error' not 'warning'", () => {
    const issues = validateDesignSystemUsage(
      fixture('hallucinated-components.tsx')
    );
    const hallucinated = issues.filter(i => i.details?.hallucinated === true);
    expect(hallucinated.length).toBeGreaterThan(0);
    for (const issue of hallucinated) {
      expect(issue.severity).toBe('error');
    }
  });

  it('flags undeclared PascalCase components not in any import', () => {
    const file = tmpFile(
      'dsu-undeclared.tsx',
      `import { Button } from '@marigold/components';
const App = () => (
  <MysteryComponent>
    <Button onPress={() => {}}>OK</Button>
  </MysteryComponent>
);
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const issue = issues.find(i => i.component === 'MysteryComponent');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
    expect(issue?.details?.hallucinated).toBe(true);
  });

  it('still flags raw HTML elements as warnings', () => {
    const file = tmpFile(
      'dsu-html.tsx',
      `const App = () => <div><span>hi</span></div>;
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const divIssue = issues.find(i => i.component === 'div');
    expect(divIssue).toBeDefined();
    expect(divIssue?.severity).toBe('warning');
  });

  it('does not flag <img> as raw HTML', () => {
    const file = tmpFile(
      'dsu-img.tsx',
      `const App = () => <img src="x" alt="y" />;
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const imgIssue = issues.find(i => i.component === 'img');
    expect(imgIssue).toBeUndefined();
  });

  it('does not flag SVG elements like <circle>, <path>, <rect>', () => {
    const file = tmpFile(
      'dsu-svg.tsx',
      `const App = () => (
  <svg viewBox="0 0 100 100">
    <circle cx="10" cy="10" r="5" />
    <path d="M0 0" />
    <rect x="0" y="0" width="10" height="10" />
  </svg>
);
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const svgChildIssues = issues.filter(
      i =>
        i.component === 'circle' ||
        i.component === 'path' ||
        i.component === 'rect'
    );
    expect(svgChildIssues).toEqual([]);
  });

  it('still flags <div> and <span> as raw HTML', () => {
    const file = tmpFile(
      'dsu-div-span.tsx',
      `const App = () => <div><span>text</span></div>;
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const divIssue = issues.find(i => i.component === 'div');
    const spanIssue = issues.find(i => i.component === 'span');
    expect(divIssue).toBeDefined();
    expect(divIssue?.severity).toBe('warning');
    expect(divIssue?.source).toBe('design-system-usage');
    expect(spanIssue).toBeDefined();
    expect(spanIssue?.severity).toBe('warning');
    expect(spanIssue?.source).toBe('design-system-usage');
  });
});
