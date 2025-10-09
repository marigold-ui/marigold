import type { Meta, StoryObj } from '@storybook/react';
import { Accessible } from 'packages/components/src/icons/Accessible';
import { Asterisk } from 'packages/components/src/icons/Asterisk';
import { Calendar } from 'packages/components/src/icons/Calendar';
import { CheckMark } from 'packages/components/src/icons/CheckMark';
import { ChevronDown } from 'packages/components/src/icons/ChevronDown';
import { ChevronLeft } from 'packages/components/src/icons/ChevronLeft';
import { ChevronRight } from 'packages/components/src/icons/ChevronRight';
import { Close } from 'packages/components/src/icons/Close';
import { CloseSearch } from 'packages/components/src/icons/CloseSearch';
import { Dot } from 'packages/components/src/icons/Dot';
import { Ellipsis } from 'packages/components/src/icons/Ellipsis';
import { ErrorFilled } from 'packages/components/src/icons/ErrorFilled';
import { Help } from 'packages/components/src/icons/Help';
import { HelpTextError } from 'packages/components/src/icons/HelpTextError';
import { IndeterminateMark } from 'packages/components/src/icons/IndeterminateMark';
import { Info } from 'packages/components/src/icons/Info';
import { InfoFilled } from 'packages/components/src/icons/InfoFilled';
import { Minus } from 'packages/components/src/icons/Minus';
import { Plus } from 'packages/components/src/icons/Plus';
import { Search } from 'packages/components/src/icons/Search';
import { SortDown } from 'packages/components/src/icons/SortDown';
import { SortUp } from 'packages/components/src/icons/SortUp';
import { SuccessFilled } from 'packages/components/src/icons/SuccessFilled';
import { TooltipChevron } from 'packages/components/src/icons/TooltipChevron';
import { WarningFilled } from 'packages/components/src/icons/WarningFilled';

const meta = {
  title: 'Components/Icons',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccessibleIcon: Story = {
  render: () => <Accessible />,
};

export const AsteriskIcon: Story = {
  render: () => <Asterisk />,
};

export const CalendarIcon: Story = {
  render: () => <Calendar />,
};

export const CheckMarkIcon: Story = {
  render: () => <CheckMark />,
};

export const ChevronDownIcon: Story = {
  render: () => <ChevronDown />,
};

export const ChevronLeftIcon: Story = {
  render: () => <ChevronLeft />,
};

export const ChevronRightIcon: Story = {
  render: () => <ChevronRight />,
};

export const CloseIcon: Story = {
  render: () => <Close />,
};

export const CloseSearchIcon: Story = {
  render: () => <CloseSearch />,
};

export const DotIcon: Story = {
  render: () => <Dot />,
};

export const EllipsisIcon: Story = {
  render: () => <Ellipsis />,
};

export const ErrorFilledIcon: Story = {
  render: () => <ErrorFilled />,
};

export const HelpIcon: Story = {
  render: () => <Help />,
};

export const HelpTextErrorIcon: Story = {
  render: () => <HelpTextError />,
};

export const IndeterminateMarkIcon: Story = {
  render: () => <IndeterminateMark />,
};

export const InfoIcon: Story = {
  render: () => <Info />,
};

export const InfoFilledIcon: Story = {
  render: () => <InfoFilled />,
};

export const MinusIcon: Story = {
  render: () => <Minus />,
};

export const PlusIcon: Story = {
  render: () => <Plus />,
};

export const SearchIcon: Story = {
  render: () => <Search />,
};

export const SortDownIcon: Story = {
  render: () => <SortDown />,
};

export const SortUpIcon: Story = {
  render: () => <SortUp />,
};

export const SuccessFilledIcon: Story = {
  render: () => <SuccessFilled />,
};

export const TooltipChevronIcon: Story = {
  render: () => <TooltipChevron />,
};

export const WarningFilledIcon: Story = {
  render: () => <WarningFilled />,
};
