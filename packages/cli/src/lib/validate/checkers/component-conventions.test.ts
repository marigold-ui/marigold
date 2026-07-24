import { describe, expect, it } from 'vitest';
import { tmpFile } from '../test-support/tmp.js';
import { validateComponentConventions } from './component-conventions.js';

describe('validateComponentConventions — untyped props (W4)', () => {
  it('flags a component with an untyped props parameter', () => {
    const file = tmpFile(
      'cc-untyped.tsx',
      `const Card = ({ title }) => <div>{title}</div>;`
    );
    const issue = validateComponentConventions(file).find(
      i => i.component === 'Card' && i.details?.untypedProps === true
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
  });

  it('accepts a component with a typed props parameter', () => {
    const file = tmpFile(
      'cc-typed.tsx',
      `type CardProps = { title: string };
       const Card = (props: CardProps) => <div>{props.title}</div>;`
    );
    expect(
      validateComponentConventions(file).filter(i => i.details?.untypedProps)
    ).toEqual([]);
  });

  it('does not flag a props-less component', () => {
    const file = tmpFile(
      'cc-propsless.tsx',
      `const Page = () => <div>x</div>;`
    );
    expect(
      validateComponentConventions(file).filter(i => i.details?.untypedProps)
    ).toEqual([]);
  });

  it('does not flag a PascalCase function that returns no JSX', () => {
    // isolates the returnsJsx guard: PascalCase + untyped param but not a component
    const file = tmpFile('cc-helper.tsx', `const Compute = (x) => x * 2;`);
    expect(
      validateComponentConventions(file).filter(i => i.details?.untypedProps)
    ).toEqual([]);
  });

  it('does not flag a component with an inline-typed props parameter', () => {
    const file = tmpFile(
      'cc-inline.tsx',
      `const Card = (props: { title: string }) => <div>{props.title}</div>;`
    );
    expect(
      validateComponentConventions(file).filter(i => i.details?.untypedProps)
    ).toEqual([]);
  });
});

describe('validateComponentConventions — one primary per Form (W7)', () => {
  it('flags a Form with two primary buttons', () => {
    const file = tmpFile(
      'cc-two-primary.tsx',
      `import { Form, Button } from '@marigold/components';
      const C = () => (
        <Form>
          <Button variant="primary">Save</Button>
          <Button variant="primary">Save and add another</Button>
        </Form>
      );`
    );
    const issue = validateComponentConventions(file).find(
      i => i.component === 'Form' && i.details?.primaryCount === 2
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
  });

  it('accepts a Form with one primary and others secondary', () => {
    const file = tmpFile(
      'cc-one-primary.tsx',
      `import { Form, Button } from '@marigold/components';
      const C = () => (
        <Form>
          <Button variant="primary">Save</Button>
          <Button variant="secondary">Cancel</Button>
        </Form>
      );`
    );
    expect(
      validateComponentConventions(file).filter(i => i.component === 'Form')
    ).toEqual([]);
  });

  it('does not flag two primary buttons outside any Form', () => {
    const file = tmpFile(
      'cc-no-form.tsx',
      `import { Stack, Button } from '@marigold/components';
      const C = () => (
        <Stack space="regular">
          <Button variant="primary">A</Button>
          <Button variant="primary">B</Button>
        </Stack>
      );`
    );
    expect(
      validateComponentConventions(file).filter(i => i.component === 'Form')
    ).toEqual([]);
  });
});

describe('validateComponentConventions — manual loading-label (W10)', () => {
  it('W10: flags a manual loading-label swap on a Button', () => {
    const file = tmpFile(
      'cc-loadlabel.tsx',
      `import { Button } from '@marigold/components';
      const C = ({ saving }: { saving: boolean }) => (
        <Button>{saving ? 'Saving…' : 'Save'}</Button>
      );`
    );
    const issue = validateComponentConventions(file).find(
      i => i.details?.manualLoadingLabel === true
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
  });

  it('W10: accepts a Button using the loading prop', () => {
    const file = tmpFile(
      'cc-loadprop.tsx',
      `import { Button } from '@marigold/components';
      const C = ({ saving }: { saving: boolean }) => (
        <Button loading={saving}>Save</Button>
      );`
    );
    expect(
      validateComponentConventions(file).filter(
        i => i.details?.manualLoadingLabel
      )
    ).toEqual([]);
  });

  it('W10: flags a German manual loading-label swap ("wird gespeichert")', () => {
    const file = tmpFile(
      'cc-loadlabel-de.tsx',
      `import { Button } from '@marigold/components';
      const C = ({ saving }: { saving: boolean }) => (
        <Button>{saving ? 'Wird gespeichert…' : 'Speichern'}</Button>
      );`
    );
    const issue = validateComponentConventions(file).find(
      i => i.details?.manualLoadingLabel === true
    );
    expect(issue).toBeDefined();
  });

  it('W10: does not flag an ordinary label that merely contains the "sende" stem', () => {
    // "Absenden" (German for "Submit") contains "senden", which contains
    // "sende" as a substring — the unanchored regex used to false-positive on
    // this, a regular non-loading label.
    const file = tmpFile(
      'cc-loadlabel-substring.tsx',
      `import { Button } from '@marigold/components';
      const C = ({ saving }: { saving: boolean }) => (
        <Button>{saving ? 'Absenden' : 'Save'}</Button>
      );`
    );
    expect(
      validateComponentConventions(file).filter(
        i => i.details?.manualLoadingLabel
      )
    ).toEqual([]);
  });

  it('W10: does not flag an ordinary "Send"/"Sent" confirmation toggle', () => {
    // Regression: "Send" (English imperative) and "Senden" (German
    // infinitive) are both extremely common resting-state button labels, not
    // exclusively loading indicators. This ternary toggles between a
    // confirmation state and the resting label — unrelated to a loading
    // state — and used to false-positive on the "Send" branch.
    const file = tmpFile(
      'cc-loadlabel-send-resting.tsx',
      `import { Button } from '@marigold/components';
      const C = ({ sent }: { sent: boolean }) => (
        <Button>{sent ? 'Sent' : 'Send'}</Button>
      );`
    );
    expect(
      validateComponentConventions(file).filter(
        i => i.details?.manualLoadingLabel
      )
    ).toEqual([]);
  });

  it('W10: does not flag an ordinary German "Senden"/"Gesendet" confirmation toggle', () => {
    const file = tmpFile(
      'cc-loadlabel-senden-resting.tsx',
      `import { Button } from '@marigold/components';
      const C = ({ sent }: { sent: boolean }) => (
        <Button>{sent ? 'Gesendet' : 'Senden'}</Button>
      );`
    );
    expect(
      validateComponentConventions(file).filter(
        i => i.details?.manualLoadingLabel
      )
    ).toEqual([]);
  });
});

describe('validateComponentConventions — origin resolution (W7/W10)', () => {
  it('W7: does not flag a Form imported from a local module', () => {
    // A project's own <Form> that merely shares Marigold's name must not be
    // held to the one-primary-button convention (Marigold-origin only).
    const file = tmpFile(
      'cc-local-form.tsx',
      `import { Form } from './ui/Form';
      import { Button } from '@marigold/components';
      const C = () => (
        <Form>
          <Button variant="primary">Save</Button>
          <Button variant="primary">Save and add another</Button>
        </Form>
      );`
    );
    expect(
      validateComponentConventions(file).filter(i => i.component === 'Form')
    ).toEqual([]);
  });

  it('W10: does not flag a Button imported from a local module', () => {
    const file = tmpFile(
      'cc-local-button.tsx',
      `import { Button } from './ui/Button';
      const C = ({ saving }: { saving: boolean }) => (
        <Button>{saving ? 'Saving…' : 'Save'}</Button>
      );`
    );
    expect(
      validateComponentConventions(file).filter(
        i => i.details?.manualLoadingLabel
      )
    ).toEqual([]);
  });

  it('W7/W10: still fire on aliased Marigold imports', () => {
    // `{ Form as MyForm, Button as Btn }` from @marigold/components resolves to
    // the real components, so both conventions must apply to the aliases.
    const file = tmpFile(
      'cc-aliased.tsx',
      `import { Form as MyForm, Button as Btn } from '@marigold/components';
      const C = ({ saving }: { saving: boolean }) => (
        <MyForm>
          <Btn variant="primary">Save</Btn>
          <Btn variant="primary">{saving ? 'Saving…' : 'Save again'}</Btn>
        </MyForm>
      );`
    );
    const issues = validateComponentConventions(file);
    expect(
      issues.find(i => i.component === 'Form' && i.details?.primaryCount === 2)
    ).toBeDefined();
    expect(
      issues.find(i => i.details?.manualLoadingLabel === true)
    ).toBeDefined();
  });
});
