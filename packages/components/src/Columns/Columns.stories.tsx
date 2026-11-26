import { ReactNode } from 'react';
import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import { Headline } from '../Headline/Headline';
import { NumberField } from '../NumberField/NumberField';
import { Stack } from '../Stack/Stack';
import { Switch } from '../Switch/Switch';
import { Text } from '../Text/Text';
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
const PriceTable = () => (
  <div className="max-w-md p-4">
    <Columns columns={[1, 1, 1]} space={2}>
      <Headline level="4">Name</Headline>
      <Headline level="4">Price</Headline>
      <Headline level="4">Fee</Headline>
    </Columns>
    <Columns columns={[1, 1, 1]} space={2}>
      <Stack space={2}>
        {data.map(({ name }) => (
          <TextField key={crypto.randomUUID()} defaultValue={name} />
        ))}
      </Stack>
      <Stack space={2}>
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
      <Stack space={2}>
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
);

export const TableLike = meta.story({
  render: () => <PriceTable />,
});

/**
 * The price table on a 320px phone screen: nothing scrolls sideways.
 */
export const SmallScreen = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { viewports: [320] } },
  globals: {
    viewport: { value: 'extraSmallScreen' },
  },
  render: () => <PriceTable />,
});

SmallScreen.test(
  'Does not overflow the screen',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async () => {
    const root = document.documentElement;

    expect(root.scrollWidth).toBeLessThanOrEqual(root.clientWidth);
  }
);

const Cell = ({ children }: { children: ReactNode }) => (
  <div className="flex h-10 items-center justify-center rounded bg-[#e9ecef] text-xs">
    {children}
  </div>
);

const Example = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <Stack space={2}>
    <Stack space={0.5}>
      <Headline level="5">{title}</Headline>
      <Text size="xs" variant="muted">
        {description}
      </Text>
    </Stack>
    {children}
  </Stack>
);

/**
 * Columns in a 240px wide side panel (the dashed frame). Each example says what
 * you should see. Before DST-1610, wide content broke the ratio, wrapped single
 * columns onto the next line and pushed the row out of the frame.
 */
export const NarrowContainer = meta.story({
  tags: ['component-test'],
  render: () => (
    <Stack space={2}>
      <Text size="sm" variant="muted">
        A side panel, 240px wide. Nothing sticks out of the dashed frame.
      </Text>
      <div className="w-60 rounded border border-dashed border-[#adb5bd] p-2">
        <Stack space={8}>
          <Example
            title="1. Rows line up"
            description="Three equal columns. Each field sits right below its heading, all in one row. Fields shrink to their column, so a long value such as “Standard” is cut off."
          >
            <Stack space={2}>
              <Columns
                role="region"
                aria-label="Price table headings"
                columns={[1, 1, 1]}
                space={2}
              >
                <Text size="sm" weight="bold">
                  Name
                </Text>
                <Text size="sm" weight="bold">
                  Price
                </Text>
                <Text size="sm" weight="bold">
                  Fee
                </Text>
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
          </Example>
          <Example
            title="2. Wide content scrolls inside its column"
            description="The left column holds a 600px strip, yet it keeps 2 parts and the right column 1 part. Scroll the strip sideways to reach cell 12."
          >
            <Columns
              role="region"
              aria-label="Wide content"
              columns={[2, 1]}
              space={2}
            >
              <div className="overflow-x-auto rounded">
                <div className="flex w-[600px]">
                  {Array.from({ length: 12 }, (_, idx) => (
                    <div
                      key={idx}
                      className="flex h-10 w-[50px] shrink-0 items-center justify-center bg-[#e9ecef] text-xs odd:bg-[#ced4da]"
                    >
                      {idx + 1}
                    </div>
                  ))}
                </div>
              </div>
              <Cell>1 part</Cell>
            </Columns>
          </Example>
          <Example
            title="3. A fit column keeps its content width"
            description="The button keeps its full width. The search field takes the rest of the row."
          >
            <Columns
              role="region"
              aria-label="Fit column"
              columns={[1, 'fit']}
              space={2}
            >
              <TextField aria-label="Search" />
              <Button>Search</Button>
            </Columns>
          </Example>
          <Example
            title="4. collapseAt stacks every column"
            description='The panel is narrower than collapseAt="40em", so both columns stack, each as wide as the panel.'
          >
            <Columns
              role="region"
              aria-label="Collapsed"
              columns={[1, 1]}
              space={2}
              collapseAt="40em"
            >
              <Cell>Column 1</Cell>
              <Cell>Column 2</Cell>
            </Columns>
          </Example>
          <Example
            title="5. A fit column wider than the row moves onto its own line"
            description="The 300px block is wider than the panel. It moves below the field and is capped at the panel's width."
          >
            <Columns
              role="region"
              aria-label="Wide fit column"
              columns={[1, 'fit']}
              space={2}
            >
              <TextField aria-label="Note" />
              <div className="h-10 w-[300px] bg-[#e9ecef]" />
            </Columns>
          </Example>
        </Stack>
      </div>
    </Stack>
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

NarrowContainer.test(
  'Caps a fit column at the row width',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const row = canvas.getByRole('region', { name: 'Wide fit column' });
    const fitColumn = row.lastElementChild!.getBoundingClientRect();

    expect(fitColumn.right).toBeLessThanOrEqual(
      row.getBoundingClientRect().right + 0.5
    );
  }
);
