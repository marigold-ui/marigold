import { Pencil, Trash2 } from 'lucide-react';
import { Provider } from 'react-aria-components/slots';
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

export const Basic: any = meta.story();

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
