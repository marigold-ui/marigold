import type { LucideProps } from 'lucide-react';
import { Download, Save, Star } from 'lucide-react';
import preview from '.storybook/preview';
import {
  DesignTicket,
  Facebook,
  GiftCard,
  Google,
  Instagram,
  PDF,
  Resale,
  Scanner,
  Stadium,
  TicketInsurance,
  Turnstile,
  Twitter,
} from '@marigold/icons';
import { Button } from './Button/Button';
import { Inline } from './Inline/Inline';

const customIcons = [
  { name: 'DesignTicket', Icon: DesignTicket },
  { name: 'Facebook', Icon: Facebook },
  { name: 'GiftCard', Icon: GiftCard },
  { name: 'Google', Icon: Google },
  { name: 'Instagram', Icon: Instagram },
  { name: 'PDF', Icon: PDF },
  { name: 'Resale', Icon: Resale },
  { name: 'Scanner', Icon: Scanner },
  { name: 'Stadium', Icon: Stadium },
  { name: 'TicketInsurance', Icon: TicketInsurance },
  { name: 'Turnstile', Icon: Turnstile },
  { name: 'Twitter', Icon: Twitter },
] as const;

const meta = preview.meta({
  title: 'Icons/Icon',
  component: DesignTicket,
  parameters: {
    surface: false,
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 96, step: 2 },
      table: { defaultValue: { summary: '24' } },
    },
    color: {
      control: { type: 'color' },
      table: { defaultValue: { summary: 'currentColor' } },
    },
    strokeWidth: {
      control: { type: 'range', min: 0.5, max: 4, step: 0.25 },
      table: { defaultValue: { summary: '2' } },
    },
    fill: {
      control: { type: 'color' },
      description:
        'Fill color; set to make stroke-based icons filled. Defaults to none.',
      table: { defaultValue: { summary: 'none' } },
    },
    className: { control: false, table: { disable: true } },
    style: { control: false, table: { disable: true } },
  },
  args: {
    size: 32,
    strokeWidth: 2,
  },
});

export const CustomIcons = meta.story({
  name: 'All custom icons',
  render: (args: LucideProps) => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-4">
      {customIcons.map(({ name, Icon }) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 rounded-md border p-4"
        >
          <Icon {...args} />
          <span className="font-mono text-xs">{name}</span>
        </div>
      ))}
    </div>
  ),
});

export const ButtonWithIcon = meta.story({
  name: 'Button with leading icon',
  args: { size: 16 },
  render: (args: LucideProps) => (
    <Inline space={2}>
      <Button variant="primary">
        <Save {...args} />
        Save
      </Button>
      <Button variant="secondary">
        <Download {...args} />
        Download
      </Button>
    </Inline>
  ),
});

export const Rating = meta.story({
  name: '5-Star Rating',
  args: { size: 24 },
  render: ({ fill, ...args }: LucideProps) => {
    const rating = 3;
    const total = 5;
    return (
      <Inline
        space={1}
        role="img"
        aria-label={`Rated ${rating} out of ${total}`}
      >
        {Array.from({ length: total }, (_, i) => (
          <Star
            key={i}
            {...args}
            fill={i < rating ? (fill ?? 'currentColor') : 'none'}
            className="text-yellow-500"
          />
        ))}
      </Inline>
    );
  },
});

export const SocialLinks = meta.story({
  args: { size: 24 },
  render: (args: LucideProps) => (
    <Inline space={3}>
      <a href="#" aria-label="Facebook">
        <Facebook {...args} />
      </a>
      <a href="#" aria-label="Instagram">
        <Instagram {...args} />
      </a>
      <a href="#" aria-label="Twitter">
        <Twitter {...args} />
      </a>
    </Inline>
  ),
});
