import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpFile } from '../test-support/tmp.js';
import { validateDesignSystemUsage } from './design-system-usage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

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

  it('does not flag an aliased import of a real Marigold component', () => {
    // Regression: `{ Button as Btn }` used to be treated as hallucinated
    // because the bare-name registry lookup doesn't know the local alias.
    const file = tmpFile(
      'dsu-alias-button.tsx',
      `import { Button as Btn } from '@marigold/components';
const App = () => <Btn onPress={() => {}}>OK</Btn>;
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const btnIssue = issues.find(i => i.component === 'Btn');
    expect(btnIssue).toBeUndefined();
  });

  it('does not flag a valid sub-component accessed through an aliased parent', () => {
    // Regression: `<S.Option>` (aliased `{ Select as S }`) used to be flagged
    // as a hallucinated sub-component because the registry lookup used the
    // local alias "S" instead of the resolved name "Select".
    const file = tmpFile(
      'dsu-alias-select-option.tsx',
      `import { Select as S } from '@marigold/components';
const App = () => (
  <S label="pick">
    <S.Option id="a">A</S.Option>
  </S>
);
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const issue = issues.find(
      i => i.component === 'S.Option' && i.details?.hallucinated === true
    );
    expect(issue).toBeUndefined();
  });

  it('still flags a genuinely hallucinated sub-component on an aliased parent', () => {
    const file = tmpFile(
      'dsu-alias-select-bogus.tsx',
      `import { Select as S } from '@marigold/components';
const App = () => (
  <S label="pick">
    <S.Bogus id="a">A</S.Bogus>
  </S>
);
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const issue = issues.find(i => i.component === 'S.Bogus');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
    expect(issue?.details?.hallucinated).toBe(true);
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

  // Finding #4: documented escape hatches must not be flagged.
  it('does not flag <form> as raw HTML', () => {
    const issues = validateDesignSystemUsage(fixture('complex-form.tsx'));
    const formIssue = issues.find(i => i.component === 'form');
    expect(formIssue).toBeUndefined();
  });

  it('does not flag <br>', () => {
    const file = tmpFile(
      'dsu-br.tsx',
      `const App = () => <p>a<br />b</p>;
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const brIssue = issues.find(i => i.component === 'br');
    expect(brIssue).toBeUndefined();
  });

  it('does not flag <label htmlFor> as raw HTML', () => {
    const file = tmpFile(
      'dsu-label-for.tsx',
      `const App = () => <label htmlFor="x">Name</label>;
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const labelIssue = issues.find(i => i.component === 'label');
    expect(labelIssue).toBeUndefined();
  });

  it('does not flag <a href> as raw HTML', () => {
    const file = tmpFile(
      'dsu-a-href.tsx',
      `const App = () => <a href="/x">link</a>;
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const anchorIssue = issues.find(i => i.component === 'a');
    expect(anchorIssue).toBeUndefined();
  });

  it('still flags <label> without htmlFor', () => {
    const file = tmpFile(
      'dsu-label-bare.tsx',
      `const App = () => <label>Name</label>;
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const labelIssue = issues.find(i => i.component === 'label');
    expect(labelIssue).toBeDefined();
    expect(labelIssue?.severity).toBe('warning');
  });

  it('still flags <a> without href', () => {
    const file = tmpFile(
      'dsu-a-bare.tsx',
      `const App = () => <a onClick={() => {}}>x</a>;
export default App;`
    );
    const issues = validateDesignSystemUsage(file);
    const anchorIssue = issues.find(i => i.component === 'a');
    expect(anchorIssue).toBeDefined();
    expect(anchorIssue?.severity).toBe('warning');
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

describe('validateDesignSystemUsage — className on Marigold components (W2)', () => {
  it('flags className on a Marigold component', () => {
    const file = tmpFile(
      'dsu-cn-button.tsx',
      `import { Button } from '@marigold/components';
      const C = () => <Button variant="primary" className="mt-4">Save</Button>;`
    );
    const issue = validateDesignSystemUsage(file).find(
      i => i.details?.prop === 'className' && i.component === 'Button'
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
  });

  it('flags className on a Marigold sub-component', () => {
    const file = tmpFile(
      'dsu-cn-sub.tsx',
      `import { Table } from '@marigold/components';
      const C = () => <Table.Cell className="x">a</Table.Cell>;`
    );
    const issue = validateDesignSystemUsage(file).find(
      i => i.details?.prop === 'className'
    );
    expect(issue).toBeDefined();
    expect(issue?.component).toBe('Table.Cell');
  });

  it('does NOT flag className on a native element', () => {
    const file = tmpFile(
      'dsu-cn-div.tsx',
      `const C = () => <div className="grid gap-4"><span>x</span></div>;`
    );
    const cnIssue = validateDesignSystemUsage(file).find(
      i => i.details?.prop === 'className'
    );
    expect(cnIssue).toBeUndefined();
  });
});

describe('validateDesignSystemUsage — raw list elements (W5)', () => {
  it('suggests a Marigold collection for a raw <ul> (collection-specific message)', () => {
    const file = tmpFile(
      'dsu-ul.tsx',
      `const C = () => <ul><li>one</li><li>two</li></ul>;`
    );
    const issue = validateDesignSystemUsage(file).find(
      i => i.component === 'ul'
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
    // must be the collection branch, not the generic raw-HTML fallback
    expect(issue?.suggestion).toMatch(
      /keyboard navigation|empty-state|List, Table/
    );
  });

  it('flags raw <ol> and <li> as collection misuse', () => {
    const file = tmpFile(
      'dsu-ol.tsx',
      `const C = () => <ol><li>one</li></ol>;`
    );
    const issues = validateDesignSystemUsage(file);
    expect(issues.find(i => i.component === 'ol')).toBeDefined();
    expect(issues.find(i => i.component === 'li')).toBeDefined();
  });
});
