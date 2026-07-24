import { Pencil, Trash2 } from 'lucide-react';
import { Provider } from 'react-aria-components/slots';
import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { ButtonContext } from '../Button/Context';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { LinkButton } from './LinkButton';

const meta = preview.meta({
  title: 'Components/LinkButton',
  component: LinkButton,
  parameters: {
    surface: false,
  },
  decorators: [
    Story => (
      <div className="self-start">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      description: 'Size of the button',
      options: ['default', 'small', 'large', 'icon'],
    },
    variant: {
      control: {
        type: 'radio',
      },
      options: ['primary', 'secondary', 'destructive', 'ghost', 'icon', 'text'],
      description: 'Variant of the button',
    },
  },
  args: {
    children: 'Link Button',
    href: 'https://marigold-ui.io',
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
});

Basic.test(
  'renders an anchor that is styled like a button',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    // Render a real Button next to the LinkButton with the same variant/size so
    // we can compare their styling directly instead of asserting brittle,
    // theme-specific class names.
    render: () => (
      <>
        <Button variant="primary">Button</Button>
        <LinkButton variant="primary" href="https://marigold-ui.io">
          Link Button
        </LinkButton>
      </>
    ),
  },
  async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Link Button' });
    const button = canvas.getByRole('button', { name: 'Button' });

    // It is semantically an anchor (renders <a href>), not a <button>.
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://marigold-ui.io');

    // ...but it carries the exact same styling as a real Button.
    expect(link.className).toBe(button.className);
  }
);

export const InButtonGroup = meta.story({
  args: {
    children: undefined,
    href: undefined,
  },
  render: () => (
    <ButtonGroup aria-label="Row actions" size="small">
      <LinkButton href="/events/1/edit" aria-label="Edit">
        <Pencil />
      </LinkButton>
      <Button variant="destructive-ghost" aria-label="Delete">
        <Trash2 />
      </Button>
    </ButtonGroup>
  ),
});

export const InButtonContext = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    children: undefined,
    href: undefined,
  },
  render: () => (
    <Provider
      values={[[ButtonContext, { variant: 'secondary', size: 'large' }]]}
    >
      <LinkButton href="/profile">Open profile</LinkButton>
    </Provider>
  ),
});
