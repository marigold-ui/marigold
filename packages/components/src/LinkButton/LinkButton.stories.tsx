import { Pencil, Trash2 } from 'lucide-react';
import { Provider } from 'react-aria-components/slots';
import preview from '.storybook/preview';
import { ActionButton } from '../ActionButton/ActionButton';
import { ActionButtonContext } from '../ActionButton/Context';
import { ActionGroup } from '../ActionGroup/ActionGroup';
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

export const InActionGroup = meta.story({
  args: {
    children: undefined,
    href: undefined,
  },
  render: () => (
    <ActionGroup aria-label="Row actions" size="small">
      <LinkButton href="/events/1/edit" aria-label="Edit">
        <Pencil />
      </LinkButton>
      <ActionButton variant="destructive-ghost" aria-label="Delete">
        <Trash2 />
      </ActionButton>
    </ActionGroup>
  ),
});

export const InActionButtonContext = meta.story({
  args: {
    children: undefined,
    href: undefined,
  },
  render: () => (
    <Provider
      values={[[ActionButtonContext, { variant: 'secondary', size: 'large' }]]}
    >
      <LinkButton href="/profile">Open profile</LinkButton>
    </Provider>
  ),
});
