import { ReactNode } from 'react';
import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import { Headline } from '../Headline/Headline';
import { NumberField } from '../NumberField/NumberField';
import { Stack } from '../Stack/Stack';
import { Switch } from '../Switch/Switch';
import { TextField } from '../TextField/TextField';
import { Columns } from './Columns';

const meta = preview.meta({
  title: 'Components/Columns',
  component: Columns,
  parameters: {
    surface: false,
  },
  argTypes: {
    columns: {
      control: {
        type: 'select',
      },
      options: [
        [4, 4, 4],
        [2, 8, 2],
        [2, 5, 5],
        [3, 6, 3],
        [8, 2, 2],
      ],
      description:
        'array of numbers to set width of every column. can be any value.',
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: '[2, 8, 2]' },
      },
    },
    space: {
      control: {
        type: 'text',
      },
      description:
        'Space between the single columns. For that we use tailwind tokens. ',
    },
    collapseAt: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '40em' },
      },
      description: 'The value at which the columns should be wrap down',
    },
    stretch: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'Let columns container fill height',
    },
  },
  args: {
    collapseAt: '40em',
    columns: [2, 8, 2],
    stretch: false,
  },
});

export const Basic = meta.story({
  render: args => (
    <Columns {...args}>
      <div className="h-[150px] border border-[#ced4da] bg-[#e9ecef]" />
      <div className="h-[150px] border border-[#ced4da] bg-[#e9ecef]" />
      <div className="h-[150px] border border-[#ced4da] bg-[#e9ecef]" />
    </Columns>
  ),
});

export const ComplexChildren = meta.story({
  render: args => (
    <Columns {...args}>
      <main className="h-[150px] border border-[#ced4da] bg-[#e9ecef]" />
      <>
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
      </>
      <aside className="h-[150px] border border-[#ced4da] bg-[#e9ecef]" />
    </Columns>
  ),
});

const Block = ({
  children,
  height,
}: {
  children: ReactNode;
  height?: number | string;
}) => (
  <div
    style={{ height }}
    className="h-(--height) rounded-xs border border-solid border-[#67686c] bg-[#858cab] p-3 text-[#edf2ff]"
  >
    {children}
  </div>
);

export const MultiRow = meta.story(() => (
  <Block>
    <Stack space={4}>
      <Block height={500}>
        <Columns columns={[4, 4, 4]} space={2} stretch>
          <Block height="100%">one</Block>
          <Block>two</Block>
          <Block height={200}>three</Block>
        </Columns>
      </Block>
      <Columns columns={[2, 1]} space={2}>
        <Block>four</Block>
        <Block>five</Block>
      </Columns>
    </Stack>
  </Block>
));

export const FullHeight = meta.story({
  render: args => (
    <div className="h-[300px] bg-[#adb5bd]">
      <Columns {...args}>
        <Block height="150px">one</Block>
        <Block height="150px">two</Block>
        <Block height="100%">
          I will grow, if you set <code>stretch</code> prop on the{' '}
          <code>Columns</code>!
        </Block>
      </Columns>
    </div>
  ),
});

export const WithTwoComponentsAndFixedItem = meta.story({
  render: () => (
    <div className="bg-muted flex flex-col gap-2 p-1">
      <span>fit is on the switch element</span>
      <Divider />
      <Columns columns={[1, 'fit']} space={2} stretch>
        <TextField label="Von" />
        <div className="flex items-center">
          <Switch />
        </div>
      </Columns>
    </div>
  ),
});

const data = [
  {
    name: 'Standard',
    price: 2.5,
    fee: 3.0,
  },
  {
    name: 'Advanced',
    price: 2.75,
    fee: 3.0,
  },
  {
    name: 'Express',
    price: 5.5,
    fee: 6.0,
  },
];
export const TableLike = meta.story({
  render: () => (
    <div className="max-w-md p-4">
      <Columns columns={[1, 1, 1]} space={2}>
        <Headline level="4">Name</Headline>
        <Headline level="4">Price</Headline>
        <Headline level="4">Fee</Headline>
      </Columns>
      <Columns columns={[1, 1, 1]} space={2}>
        <Stack>
          {data.map(({ name }) => (
            <TextField key={crypto.randomUUID()} defaultValue={name} />
          ))}
        </Stack>
        <Stack>
          {data.map(({ price }) => (
            <NumberField
              key={crypto.randomUUID()}
              defaultValue={price}
              hideStepper
              width={20}
              formatOptions={{ style: 'currency', currency: 'EUR' }}
            />
          ))}
        </Stack>
        <Stack>
          {data.map(({ fee }) => (
            <NumberField
              key={crypto.randomUUID()}
              defaultValue={fee}
              hideStepper
              width={20}
              formatOptions={{
                style: 'currency',
                currency: 'EUR',
              }}
            />
          ))}
        </Stack>
      </Columns>
    </div>
  ),
});

/**
 * A narrow container, such as a side panel. Columns keep their ratios however
 * wide their content is, so rows line up and nothing pushes the row past the
 * container. Stacking only happens through `collapseAt`.
 */
export const NarrowContainer = meta.story({
  tags: ['component-test'],
  render: () => (
    <div className="w-60">
      <Stack space={6}>
        <Stack space={2}>
          <Columns
            role="region"
            aria-label="Price table headings"
            columns={[1, 1, 1]}
            space={2}
          >
            <Headline level="4">Name</Headline>
            <Headline level="4">Price</Headline>
            <Headline level="4">Fee</Headline>
          </Columns>
          <Columns
            role="region"
            aria-label="Price table fields"
            columns={[1, 1, 1]}
            space={2}
          >
            <TextField aria-label="Name" defaultValue="Standard" />
            <NumberField
              aria-label="Price"
              defaultValue={2.5}
              hideStepper
              width={20}
              formatOptions={{ style: 'currency', currency: 'EUR' }}
            />
            <NumberField
              aria-label="Fee"
              defaultValue={3}
              hideStepper
              width={20}
              formatOptions={{ style: 'currency', currency: 'EUR' }}
            />
          </Columns>
        </Stack>
        <Columns
          role="region"
          aria-label="Wide content"
          columns={[2, 1]}
          space={2}
        >
          <div className="overflow-x-auto">
            <div className="h-10 w-[600px] bg-[#e9ecef]" />
          </div>
          <div className="h-10 bg-[#e9ecef]" />
        </Columns>
        <Columns
          role="region"
          aria-label="Fit column"
          columns={[1, 'fit']}
          space={2}
        >
          <TextField aria-label="Search" />
          <Button>Search</Button>
        </Columns>
        <Columns
          role="region"
          aria-label="Collapsed"
          columns={[1, 1]}
          space={2}
          collapseAt="40em"
        >
          <div className="h-10 bg-[#e9ecef]" />
          <div className="h-10 bg-[#e9ecef]" />
        </Columns>
      </Stack>
    </div>
  ),
});

const columnRects = (row: HTMLElement) =>
  Array.from(row.children, child => child.getBoundingClientRect());

NarrowContainer.test(
  'Lines up two rows whose content needs different widths',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const headings = columnRects(
      canvas.getByRole('region', { name: 'Price table headings' })
    );
    const fields = columnRects(
      canvas.getByRole('region', { name: 'Price table fields' })
    );

    headings.forEach((heading, idx) => {
      expect(fields[idx].left).toBeCloseTo(heading.left, 0);
      expect(fields[idx].width).toBeCloseTo(heading.width, 0);
      expect(fields[idx].top).toBeCloseTo(fields[0].top, 0);
    });
  }
);

NarrowContainer.test(
  'Keeps the ratio and the container width when content is wider',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const row = canvas.getByRole('region', { name: 'Wide content' });
    const [wide, narrow] = columnRects(row);

    expect(wide.width).toBeCloseTo(narrow.width * 2, 0);
    expect(wide.top).toBeCloseTo(narrow.top, 0);
    expect(narrow.right).toBeLessThanOrEqual(
      row.getBoundingClientRect().right + 0.5
    );
  }
);

NarrowContainer.test(
  'Sizes a fit column to its content',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const row = canvas.getByRole('region', { name: 'Fit column' });
    const fitColumn = row.lastElementChild!.getBoundingClientRect();
    const button = canvas
      .getByRole('button', { name: 'Search' })
      .getBoundingClientRect();

    expect(fitColumn.width).toBeCloseTo(button.width, 0);
    expect(fitColumn.top).toBeCloseTo(
      row.firstElementChild!.getBoundingClientRect().top,
      0
    );
  }
);

NarrowContainer.test(
  'Stacks every column below collapseAt',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const row = canvas.getByRole('region', { name: 'Collapsed' });
    const [first, second] = columnRects(row);
    const rowWidth = row.getBoundingClientRect().width;

    expect(first.width).toBeCloseTo(rowWidth, 0);
    expect(second.width).toBeCloseTo(rowWidth, 0);
    expect(second.top).toBeGreaterThan(first.bottom);
  }
);
