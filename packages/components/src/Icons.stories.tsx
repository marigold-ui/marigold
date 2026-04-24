import type { LucideProps } from 'lucide-react';
import { Download, Save, Star } from 'lucide-react';
import preview from '.storybook/preview';
import {
  Auswertung,
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
  { name: 'Auswertung', Icon: Auswertung },
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
    className: { control: false, table: { disable: true } },
    style: { control: false, table: { disable: true } },
  },
  args: {
    size: 32,
    color: undefined,
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
  parameters: { controls: { disable: true } },
  render: () => (
    <Inline space={2}>
      <Button variant="primary">
        <Save size={16} />
        Save
      </Button>
      <Button variant="secondary">
        <Download size={16} />
        Download
      </Button>
    </Inline>
  ),
});

export const Rating = meta.story({
  name: '5-Star Rating',
  parameters: { controls: { disable: true } },
  render: () => {
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
            size={24}
            fill={i < rating ? 'currentColor' : 'none'}
            className="text-yellow-500"
          />
        ))}
      </Inline>
    );
  },
});

export const SocialLinks = meta.story({
  parameters: { controls: { disable: true } },
  render: () => (
    <Inline space={3} aria-label="Social media">
      <a href="#" aria-label="Facebook">
        <Facebook size={24} />
      </a>
      <a href="#" aria-label="Instagram">
        <Instagram size={24} />
      </a>
      <a href="#" aria-label="Twitter">
        <Twitter size={24} />
      </a>
    </Inline>
  ),
});
