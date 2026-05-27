import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateProps } from './props.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string): string =>
  path.join(__dirname, '..', '__fixtures__', name);

const tmpFile = (name: string, content: string): string => {
  const p = path.join(os.tmpdir(), name);
  fs.writeFileSync(p, content);
  return p;
};

describe('validateProps', () => {
  it('returns no issues for a valid Button', () => {
    const issues = validateProps(fixture('valid-button.tsx'));
    expect(issues).toEqual([]);
  });

  it('flags isLoading on Button and suggests loading', () => {
    const issues = validateProps(fixture('invalid-props.tsx'));
    const issue = issues.find(
      i => i.component === 'Button' && i.message.includes('isLoading')
    );
    expect(issue).toBeDefined();
    expect(issue?.suggestion).toMatch(/Replace "isLoading" with "loading"/);
    expect(issue?.severity).toBe('error');
    expect(issue?.location?.line).toBeGreaterThan(0);
  });

  it('flags isRequired on TextField and suggests required', () => {
    const issues = validateProps(fixture('invalid-props.tsx'));
    const issue = issues.find(
      i => i.component === 'TextField' && i.message.includes('isRequired')
    );
    expect(issue).toBeDefined();
    expect(issue?.suggestion).toMatch(/Replace "isRequired" with "required"/);
  });

  it('reports one issue per invalid prop', () => {
    const issues = validateProps(fixture('invalid-props.tsx'));
    expect(issues).toHaveLength(2);
  });

  it('flags an unknown variant value as a warning', () => {
    const issues = validateProps(fixture('invalid-variant.tsx'));
    const issue = issues.find(
      i => i.component === 'Button' && i.message.includes('"abc"')
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
    expect(issue?.suggestion).toMatch(/primary/);
    expect(issue?.details).toMatchObject({ used: 'abc' });
  });

  it('does not flag a valid variant value', () => {
    const issues = validateProps(fixture('valid-button.tsx'));
    expect(issues.filter(i => i.message.includes('variant'))).toHaveLength(0);
  });

  it('does not flag dynamic variant expressions', () => {
    const issues = validateProps(fixture('invalid-variant.tsx'));
    expect(issues.every(i => i.message.includes('"abc"'))).toBe(true);
  });

  it('does not flag native HTML elements', () => {
    const file = tmpFile(
      'mv-native.tsx',
      `const C = () => <div className="foo" data-x="bar">hello</div>;`
    );
    expect(validateProps(file)).toEqual([]);
  });

  it('does not flag compound components like Select.Option', () => {
    const file = tmpFile(
      'mv-compound.tsx',
      `import { Select } from '@marigold/components';
      const C = () => (
        <Select label="test">
          <Select.Option foobar="x">opt</Select.Option>
        </Select>
      );`
    );
    const issues = validateProps(file);
    expect(issues.every(i => i.component !== 'Option')).toBe(true);
  });

  it('does not flag onPress and other correct event handler props', () => {
    expect(validateProps(fixture('valid-button.tsx'))).toEqual([]);
  });

  it('flags onClick on Button and suggests onPress', () => {
    const issues = validateProps(fixture('event-handler-shadows.tsx'));
    const issue = issues.find(
      i => i.component === 'Button' && i.message.includes('onClick')
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
    expect(issue?.suggestion).toMatch(/onPress/);
  });

  it('flags onChange on Select and suggests onSelectionChange', () => {
    const issues = validateProps(fixture('event-handler-shadows.tsx'));
    const issue = issues.find(
      i => i.component === 'Select' && i.message.includes('onChange')
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
    expect(issue?.suggestion).toMatch(/onSelectionChange/);
  });

  it('does not flag onChange on TextField (no React Aria alternative)', () => {
    const issues = validateProps(fixture('event-handler-shadows.tsx'));
    const issue = issues.find(
      i => i.component === 'TextField' && i.message.includes('onChange')
    );
    expect(issue).toBeUndefined();
  });

  it('flags readOnly on RadioGroup and suggests isReadOnly', () => {
    const issues = validateProps(fixture('boolean-shadows.tsx'));
    const issue = issues.find(
      i => i.component === 'RadioGroup' && i.message.includes('readOnly')
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
    expect(issue?.suggestion).toMatch(/isReadOnly/);
  });

  it('does not flag className, style, id, data-testid, children', () => {
    const file = tmpFile(
      'mv-common-props.tsx',
      `import { Button } from '@marigold/components';
      const C = () => (
        <Button className="x" style={{}} id="btn" data-testid="btn">click</Button>
      );`
    );
    expect(validateProps(file)).toEqual([]);
  });

  it('suggests Remove when no similar prop name exists', () => {
    const file = tmpFile(
      'mv-no-suggestion.tsx',
      `import { Button } from '@marigold/components';
      const C = () => <Button foobar="x">click</Button>;`
    );
    const issues = validateProps(file);
    expect(issues).toHaveLength(1);
    expect(issues[0].suggestion).toMatch(/Remove the prop/);
  });

  it('reports multiple issues for multiple invalid props on one component', () => {
    const file = tmpFile(
      'mv-multi-invalid.tsx',
      `import { Button } from '@marigold/components';
      const C = () => <Button isLoading isRequired>click</Button>;`
    );
    const issues = validateProps(file);
    expect(issues.length).toBeGreaterThanOrEqual(2);
  });

  it('throws for a non-existent file', () => {
    expect(() => validateProps('/non/existent/file.tsx')).toThrow(
      'Could not read file'
    );
  });

  it('flags onChange handler with e.target.value pattern on Marigold component', () => {
    const issues = validateProps(fixture('onchange-event-pattern.tsx'));
    const issue = issues.find(
      i => i.component === 'TextField' && i.message.includes('onChange')
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
    expect(issue?.message).toMatch(/passes the value directly/);
    expect(issue?.suggestion).toMatch(/Use onChange=\{\(value\) => \.\.\.\}/);
    expect(issue?.details).toMatchObject({
      handler: 'onChange',
      pattern: 'event-target-access',
    });
  });

  it('does not flag onChange handler with direct value parameter', () => {
    const issues = validateProps(fixture('onchange-value-pattern.tsx'));
    const issue = issues.find(
      i =>
        i.component === 'TextField' && i.message.includes('event-target-access')
    );
    expect(issue).toBeUndefined();
  });

  it('flags e.target.checked pattern', () => {
    const file = tmpFile(
      'mv-checked-pattern.tsx',
      `import { Checkbox } from '@marigold/components';
      const C = () => (
        <Checkbox onChange={(e) => console.log(e.target.checked)}>Accept</Checkbox>
      );`
    );
    const issues = validateProps(file);
    const issue = issues.find(
      i =>
        i.component === 'Checkbox' &&
        i.message.includes('onChange') &&
        i.message.includes('passes the value directly')
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
  });

  it('does not flag event target pattern on non-Marigold components', () => {
    const file = tmpFile(
      'mv-native-onchange.tsx',
      `const C = () => (
        <input onChange={(e) => console.log(e.target.value)} />
      );`
    );
    const issues = validateProps(file);
    expect(issues).toEqual([]);
  });
});
