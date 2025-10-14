import type { Meta, StoryObj } from '@storybook/react';
import { PropsWithChildren } from 'react';
import { Card, Headline, Inline, Stack } from '@marigold/components';
import { Accessibility } from './Accessibility';
import { ArrowDownAZ } from './ArrowDownAZ';
import { ArrowUpZA } from './ArrowUpZA';
import { Asterisk } from './Asterisk';
import { Calendar } from './Calendar';
import { Check } from './Check';
import { ChevronDown } from './ChevronDown';
import { ChevronLeft } from './ChevronLeft';
import { ChevronRight } from './ChevronRight';
import { Circle } from './Circle';
import { CircleAlert } from './CircleAlert';
import { CircleCheck } from './CircleCheck';
import { CircleQuestionMark } from './CircleQuestionMark';
import { EllipsisVertical } from './EllipsisVertical';
import { Info } from './Info';
import {
  LegacyAccessibility,
  LegacyAsterisk,
  LegacyCalendar,
  LegacyCheck,
  LegacyChevronDown,
  LegacyChevronLeft,
  LegacyChevronRight,
  LegacyCircleAlert,
  LegacyCircleCheck,
  LegacyCircleQuestionMark,
  LegacyDot,
  LegacyEllipsisVertical,
  LegacyInfo,
  LegacyMinus,
  LegacyPlus,
  LegacySearch,
  LegacySortDown,
  LegacySortUp,
  LegacyTriangleAlert,
  LegacyX,
} from './LegacyIcons';
import { Minus } from './Minus';
import { Plus } from './Plus';
import { Search } from './Search';
import { TriangleAlert } from './TriangleAlert';
import { X } from './X';

const meta = {
  title: 'Components/Icons',
  argTypes: {
    size: {
      control: 'number',
      description: 'Size of the icon in both dimensions in pixels',
    },
  },
} satisfies Meta;

export default meta;

// TODO: Remove once we get rid of legacy icons for preview purposes
const BasicIconCard = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => (
  <Card>
    <Stack space={2}>
      <Headline level={3}>{title}</Headline>
      <Inline space={4} alignX={'center'}>
        {children}
      </Inline>
    </Stack>
  </Card>
);

// TODO: Remove once we get rid of legacy icons for preview purposes
export const LegacyComparison: StoryObj = {
  render: () => (
    <Inline space={4}>
      <BasicIconCard title={'Calendar'}>
        <Calendar />
        <LegacyCalendar />
      </BasicIconCard>
      <BasicIconCard title={'Accessibility'}>
        <Accessibility />
        <LegacyAccessibility />
      </BasicIconCard>
      <BasicIconCard title={'EllipsisVertical'}>
        <EllipsisVertical />
        <LegacyEllipsisVertical />
      </BasicIconCard>
      <BasicIconCard title={'Dot'}>
        <Circle isFilled size={6} />
        <LegacyDot />
      </BasicIconCard>
      <BasicIconCard title={'Search'}>
        <Search />
        <LegacySearch />
      </BasicIconCard>
      <BasicIconCard title={'X'}>
        <X size={20} />
        <LegacyX />
      </BasicIconCard>
      <BasicIconCard title={'Asterisk'}>
        <Asterisk size={16} />
        <LegacyAsterisk />
      </BasicIconCard>
      <BasicIconCard title={'Minus'}>
        <Minus size={16} />
        <LegacyMinus />
      </BasicIconCard>
      <BasicIconCard title={'Plus'}>
        <Plus size={16} />
        <LegacyPlus />
      </BasicIconCard>
      <BasicIconCard title={'Check'}>
        <Check size={12} />
        <LegacyCheck />
      </BasicIconCard>
      <BasicIconCard title={'SortUp'}>
        <ArrowUpZA />
        <LegacySortUp />
      </BasicIconCard>
      <BasicIconCard title={'SortDown'}>
        <ArrowDownAZ />
        <LegacySortDown />
      </BasicIconCard>
      <BasicIconCard title={'ChevronRight'}>
        <ChevronRight />
        <LegacyChevronRight />
      </BasicIconCard>
      <BasicIconCard title={'ChevronLeft'}>
        <ChevronLeft />
        <LegacyChevronLeft />
      </BasicIconCard>
      <BasicIconCard title={'ChevronDown'}>
        <ChevronDown />
        <LegacyChevronDown />
      </BasicIconCard>
      <BasicIconCard title={'CircleQuestionMark'}>
        <CircleQuestionMark />
        <LegacyCircleQuestionMark />
      </BasicIconCard>
      <BasicIconCard title={'Info'}>
        <Info />
        <LegacyInfo />
      </BasicIconCard>
      <BasicIconCard title={'CircleCheck'}>
        <CircleCheck />
        <LegacyCircleCheck />
      </BasicIconCard>
      <BasicIconCard title={'CircleAlert'}>
        <CircleAlert />
        <LegacyCircleAlert />
      </BasicIconCard>
      <BasicIconCard title={'TriangleAlert'}>
        <TriangleAlert />
        <LegacyTriangleAlert />
      </BasicIconCard>
    </Inline>
  ),
};

export const AccessibilityIcon: StoryObj<typeof Accessibility> = {
  render: args => <Accessibility {...args} />,
  args: {
    size: 24,
  },
};

export const ArrowDownAZIcon: StoryObj<typeof ArrowDownAZ> = {
  render: args => <ArrowDownAZ {...args} />,
  args: {
    size: 24,
  },
};

export const ArrowUpZAIcon: StoryObj<typeof ArrowUpZA> = {
  render: args => <ArrowUpZA {...args} />,
  args: {
    size: 24,
  },
};

export const AsteriskIcon: StoryObj<typeof Asterisk> = {
  render: args => <Asterisk {...args} />,
  args: {
    size: 24,
  },
};

export const CheckIcon: StoryObj<typeof Check> = {
  render: args => <Check {...args} />,
  args: {
    size: 24,
  },
};

export const ChevronDownIcon: StoryObj<typeof ChevronDown> = {
  render: args => <ChevronDown {...args} />,
  args: {
    size: 24,
  },
};

export const ChevronLeftIcon: StoryObj<typeof ChevronLeft> = {
  render: args => <ChevronLeft {...args} />,
  args: {
    size: 24,
  },
};

export const ChevronRightIcon: StoryObj<typeof ChevronRight> = {
  render: args => <ChevronRight {...args} />,
  args: {
    size: 24,
  },
};

export const CircleAlertIcon: StoryObj<typeof CircleAlert> = {
  render: args => <CircleAlert {...args} />,
  args: {
    size: 24,
  },
};

export const CircleCheckIcon: StoryObj<typeof CircleCheck> = {
  render: args => <CircleCheck {...args} />,
  args: {
    size: 24,
  },
};

export const CircleQuestionMarkIcon: StoryObj<typeof CircleQuestionMark> = {
  render: args => <CircleQuestionMark {...args} />,
  args: {
    size: 24,
  },
};

export const CircleIcon: StoryObj<typeof Circle> = {
  render: args => <Circle {...args} />,
  args: {
    size: 24,
  },
};

export const EllipsisVerticalIcon: StoryObj<typeof EllipsisVertical> = {
  render: args => <EllipsisVertical {...args} />,
  args: {
    size: 24,
  },
};

export const InfoIcon: StoryObj<typeof Info> = {
  render: args => <Info {...args} />,
  args: {
    size: 24,
  },
};

export const MinusIcon: StoryObj<typeof Minus> = {
  render: args => <Minus {...args} />,
  args: {
    size: 24,
  },
};

export const PlusIcon: StoryObj<typeof Plus> = {
  render: args => <Plus {...args} />,
  args: {
    size: 24,
  },
};

export const SearchIcon: StoryObj<typeof Search> = {
  render: args => <Search {...args} />,
  args: {
    size: 24,
  },
};

export const TriangleAlertIcon: StoryObj<typeof TriangleAlert> = {
  render: args => <TriangleAlert {...args} />,
  args: {
    size: 24,
  },
};

export const XIcon: StoryObj<typeof X> = {
  render: args => <X {...args} />,
  args: {
    size: 24,
  },
};
