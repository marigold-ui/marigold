import { describe, expect, it } from 'vitest';
import { tmpFile } from '../test-support/tmp.js';
import { validateAccessibleName } from './accessible-name.js';

const findDialog = (file: string) =>
  validateAccessibleName(file).find(i => i.component === 'Dialog');

describe('validateAccessibleName', () => {
  it('flags a Dialog with content but no title or aria-label', () => {
    const file = tmpFile(
      'an-dialog-bare.tsx',
      `import { Dialog, Button } from '@marigold/components';
      const C = () => (
        <Dialog>
          <Button>Close</Button>
        </Dialog>
      );`
    );
    const issue = findDialog(file);
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
    expect(issue?.source).toBe('accessible-name');
    expect(issue?.message).toContain('no accessible name');
  });

  it('accepts a Dialog with a Dialog.Title child', () => {
    const file = tmpFile(
      'an-dialog-title.tsx',
      `import { Dialog } from '@marigold/components';
      const C = () => (
        <Dialog>
          <Dialog.Title>Edit user</Dialog.Title>
          <Dialog.Content>x</Dialog.Content>
        </Dialog>
      );`
    );
    expect(findDialog(file)).toBeUndefined();
  });

  it('accepts a Dialog with an aria-label', () => {
    const file = tmpFile(
      'an-dialog-aria.tsx',
      `import { Dialog } from '@marigold/components';
      const C = () => (
        <Dialog aria-label="delete event">
          <Dialog.Content>x</Dialog.Content>
        </Dialog>
      );`
    );
    expect(findDialog(file)).toBeUndefined();
  });

  it('does not flag a Dialog whose children are opaque (dynamic)', () => {
    const file = tmpFile(
      'an-dialog-dynamic.tsx',
      `import { Dialog } from '@marigold/components';
      const C = ({ children }: { children: React.ReactNode }) => (
        <Dialog>{children}</Dialog>
      );`
    );
    expect(findDialog(file)).toBeUndefined();
  });

  it('finds a Dialog.Title inside an inline render function', () => {
    const file = tmpFile(
      'an-dialog-renderfn.tsx',
      `import { Dialog } from '@marigold/components';
      const C = () => (
        <Dialog>
          {({ close }) => (
            <>
              <Dialog.Title>Hi</Dialog.Title>
              <Dialog.Content>c</Dialog.Content>
            </>
          )}
        </Dialog>
      );`
    );
    expect(findDialog(file)).toBeUndefined();
  });

  it('does not flag a self-closing Dialog (composition reports that)', () => {
    const file = tmpFile(
      'an-dialog-selfclosing.tsx',
      `import { Dialog } from '@marigold/components';
      const C = () => <Dialog />;`
    );
    expect(findDialog(file)).toBeUndefined();
  });

  it('flags a Drawer with no accessible name', () => {
    const file = tmpFile(
      'an-drawer-bare.tsx',
      `import { Drawer, Button } from '@marigold/components';
      const C = () => (
        <Drawer>
          <Button>x</Button>
        </Drawer>
      );`
    );
    const issue = validateAccessibleName(file).find(
      i => i.component === 'Drawer'
    );
    // Drawer.Title is documented optional, so this is inferred → warning.
    expect(issue?.severity).toBe('warning');
  });

  it('labels the inner overlay independently of the outer title', () => {
    const file = tmpFile(
      'an-dialog-nested.tsx',
      `import { Dialog } from '@marigold/components';
      const C = () => (
        <Dialog>
          <Dialog.Title>Outer</Dialog.Title>
          <Dialog.Content>
            <Dialog>
              <Dialog.Content>inner has no title</Dialog.Content>
            </Dialog>
          </Dialog.Content>
        </Dialog>
      );`
    );
    const issues = validateAccessibleName(file).filter(
      i => i.component === 'Dialog'
    );
    expect(issues.length).toBe(1);
  });

  it('does not flag a Dialog with spread props (aria-label may be inside)', () => {
    const file = tmpFile(
      'an-dialog-spread.tsx',
      `import { Dialog } from '@marigold/components';
      const C = (props: any) => (
        <Dialog {...props}>
          <Dialog.Content>x</Dialog.Content>
        </Dialog>
      );`
    );
    expect(findDialog(file)).toBeUndefined();
  });

  it('ignores non-overlay components', () => {
    const file = tmpFile(
      'an-card.tsx',
      `import { Card } from '@marigold/components';
      const C = () => <Card><p>hi</p></Card>;`
    );
    expect(validateAccessibleName(file)).toEqual([]);
  });
});
