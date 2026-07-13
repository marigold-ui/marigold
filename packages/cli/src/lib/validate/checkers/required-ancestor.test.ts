import { describe, expect, it } from 'vitest';
import { tmpFile } from '../test-support/tmp.js';
import { validateRequiredAncestor } from './required-ancestor.js';

describe('validateRequiredAncestor', () => {
  it('flags a dotted compound part with no root container in the file', () => {
    const file = tmpFile(
      'ra-menu-item-detached.tsx',
      `import { Menu } from '@marigold/components';
      const C = () => <Menu.Item id="a">A</Menu.Item>;`
    );
    const issue = validateRequiredAncestor(file).find(
      i => i.component === 'Menu.Item'
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
    expect(issue?.message).toContain('<Menu>');
  });

  it('stays silent when the root appears anywhere in the file', () => {
    // File-scoped on purpose: a <Menu> elsewhere means the Menu.Item is most
    // likely composed via a helper — flagging would be a false positive.
    const file = tmpFile(
      'ra-menu-item-composed.tsx',
      `import { Menu } from '@marigold/components';
      const Item = () => <Menu.Item id="a">A</Menu.Item>;
      const C = () => <Menu>{Item()}</Menu>;`
    );
    const issues = validateRequiredAncestor(file).filter(
      i => i.component === 'Menu.Item'
    );
    expect(issues).toEqual([]);
  });

  it('flags a bare Radio with no Radio.Group in the file', () => {
    const file = tmpFile(
      'ra-radio-bare.tsx',
      `import { Radio } from '@marigold/components';
      const C = () => <Radio value="a">A</Radio>;`
    );
    const issue = validateRequiredAncestor(file).find(
      i => i.component === 'Radio'
    );
    expect(issue?.severity).toBe('error');
    expect(issue?.message).toContain('Radio.Group');
  });

  it('accepts a Radio when a Radio.Group is present', () => {
    const file = tmpFile(
      'ra-radio-grouped.tsx',
      `import { Radio } from '@marigold/components';
      const C = () => (
        <Radio.Group label="pick">
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
        </Radio.Group>
      );`
    );
    expect(validateRequiredAncestor(file)).toEqual([]);
  });

  it('accepts a Radio inside the flat <RadioGroup> alias', () => {
    const file = tmpFile(
      'ra-radio-flatgroup.tsx',
      `import { Radio, RadioGroup } from '@marigold/components';
      const C = () => (
        <RadioGroup label="pick">
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
        </RadioGroup>
      );`
    );
    expect(validateRequiredAncestor(file)).toEqual([]);
  });

  it('accepts Menu.Item inside an ActionMenu host', () => {
    const file = tmpFile(
      'ra-actionmenu.tsx',
      `import { ActionMenu, Menu } from '@marigold/components';
      const C = () => (
        <ActionMenu>
          <Menu.Item id="view">View</Menu.Item>
          <Menu.Item id="edit">Edit</Menu.Item>
        </ActionMenu>
      );`
    );
    const issues = validateRequiredAncestor(file).filter(
      i => i.component === 'Menu.Item'
    );
    expect(issues).toEqual([]);
  });

  it('does not flag sub-components when a host renders the root internally', () => {
    const file = tmpFile(
      'ra-applayout-host.tsx',
      `import { AppLayout, Sidebar } from '@marigold/components';
      const C = () => (
        <AppLayout>
          <AppLayout.Sidebar>
            <Sidebar.Nav>
              <Sidebar.Item id="home">Home</Sidebar.Item>
            </Sidebar.Nav>
          </AppLayout.Sidebar>
        </AppLayout>
      );`
    );
    const sidebarIssues = validateRequiredAncestor(file).filter(i =>
      i.component.startsWith('Sidebar')
    );
    expect(sidebarIssues).toEqual([]);
  });

  it('does not flag provider sub-components', () => {
    const file = tmpFile(
      'ra-provider.tsx',
      `import { Sidebar } from '@marigold/components';
      const C = () => (
        <Sidebar.Provider>
          <div>app</div>
        </Sidebar.Provider>
      );`
    );
    const issue = validateRequiredAncestor(file).find(
      i => i.component === 'Sidebar.Provider'
    );
    expect(issue).toBeUndefined();
  });

  it('ignores non-Marigold dotted tags', () => {
    const file = tmpFile(
      'ra-non-marigold.tsx',
      `import { motion } from 'framer-motion';
      const C = () => <motion.div>hi</motion.div>;`
    );
    expect(validateRequiredAncestor(file)).toEqual([]);
  });
});
