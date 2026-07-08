import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { LinkButton } from './LinkButton';

const meta = preview.meta({
  title: 'Components/LinkButton',
  component: LinkButton,
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
