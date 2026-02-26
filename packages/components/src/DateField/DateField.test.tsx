import { CalendarDate } from '@internationalized/date';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Basic } from './DateField.stories';

let onBlurSpy = vi.fn();
let onFocusChangeSpy = vi.fn();
let onFocusSpy = vi.fn();
let onKeyDownSpy = vi.fn();
let onKeyUpSpy = vi.fn();

afterEach(() => {
  onBlurSpy.mockClear();
  onFocusChangeSpy.mockClear();
  onFocusSpy.mockClear();
  onKeyDownSpy.mockClear();
  onKeyUpSpy.mockClear();
});

test('renders correctly', () => {
  render(
    <Basic.Component
      data-testid="dateField"
      defaultValue={new CalendarDate(2026, 1, 1)}
    />
  );

  const dateField = screen.getByTestId('dateField');

  expect(dateField).toMatchInlineSnapshot(`
    <div
      class="group/field flex min-w-0 flex-col w-(--container-width)"
      data-rac=""
      data-testid="dateField"
      style="--container-width: 100%; --field-width: 100%;"
    >
      <span
        class="items-center gap-1 text-sm font-medium leading-none text-foreground group-disabled/field:cursor-not-allowed group-disabled/field:text-disabled-foreground group-required/field:after:content-["*"] group-required/field:after:-ml-1 group-required/field:after:text-destructive inline-flex in-field:mb-1.5"
        id="react-aria-_r_1_"
      >
        My Label
      </span>
      <div
        aria-describedby="react-aria-description-0 react-aria-_r_3_"
        aria-labelledby="react-aria-_r_1_"
        class="ui-surface shadow-elevation-border h-input flex items-center disabled:ui-state-disabled group-read-only/field:ui-state-readonly has-focus:ui-state-focus has-invalid:ui-state-error has-focus:has-invalid:ring-destructive/20 w-(--field-width) max-w-full min-w-0 overflow-hidden"
        data-rac=""
        data-react-aria-pressable="true"
        id="react-aria-_r_0_"
        role="group"
        style="unicode-bidi: isolate;"
      >
        <div
          aria-describedby="react-aria-description-0 react-aria-_r_3_"
          aria-labelledby="react-aria-_r_1_"
          class="flex flex-1 items-center ui-input cursor-text"
          data-rac=""
          data-react-aria-pressable="true"
          id="react-aria-_r_0_"
          role="group"
          style="unicode-bidi: isolate;"
        >
          <span
            aria-describedby="react-aria-description-0 react-aria-_r_3_"
            aria-label="Tag, "
            aria-labelledby="react-aria-_r_5_ react-aria-_r_1_"
            aria-valuemax="31"
            aria-valuemin="1"
            aria-valuenow="1"
            aria-valuetext="1"
            autocorrect="off"
            class="inline p-0.5 caret-transparent type-literal:px-0 data-focused:data-placeholder:text-foreground type-literal:text-placeholder disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:bg-disabled data-placeholder:disabled:text-disabled-foreground invalid:data-focused:bg-destructive invalid:data-focused:data-placeholder:text-destructive-foreground invalid:data-focused:text-destructive-foreground invalid:placeholder:text-destructive invalid:text-destructive group/segment outline-0 whitespace-pre data-placeholder:text-placeholder text-foreground data-focused:bg-focus data-focused:text-foreground rounded leading-none"
            contenteditable="true"
            data-rac=""
            data-type="day"
            enterkeyhint="next"
            id="react-aria-_r_5_"
            inputmode="numeric"
            role="spinbutton"
            spellcheck="false"
            style="caret-color: transparent;"
            tabindex="0"
          >
            <span
              aria-hidden="true"
              class="invisible hidden pointer-events-none w-full text-center"
            />
            <span>
              01
            </span>
          </span>
          <span
            aria-hidden="true"
            class="inline p-0.5 caret-transparent type-literal:px-0 data-focused:data-placeholder:text-foreground type-literal:text-placeholder disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:bg-disabled data-placeholder:disabled:text-disabled-foreground invalid:data-focused:bg-destructive invalid:data-focused:data-placeholder:text-destructive-foreground invalid:data-focused:text-destructive-foreground invalid:placeholder:text-destructive invalid:text-destructive group/segment outline-0 whitespace-pre data-placeholder:text-placeholder text-foreground data-focused:bg-focus data-focused:text-foreground rounded leading-none"
            data-rac=""
            data-type="literal"
          >
            <span
              aria-hidden="true"
              class="invisible hidden pointer-events-none w-full text-center"
            />
            <span>
              .
            </span>
          </span>
          <span
            aria-label="Monat, "
            aria-labelledby="react-aria-_r_9_ react-aria-_r_1_"
            aria-valuemax="12"
            aria-valuemin="1"
            aria-valuenow="1"
            aria-valuetext="1 – Januar"
            autocorrect="off"
            class="inline p-0.5 caret-transparent type-literal:px-0 data-focused:data-placeholder:text-foreground type-literal:text-placeholder disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:bg-disabled data-placeholder:disabled:text-disabled-foreground invalid:data-focused:bg-destructive invalid:data-focused:data-placeholder:text-destructive-foreground invalid:data-focused:text-destructive-foreground invalid:placeholder:text-destructive invalid:text-destructive group/segment outline-0 whitespace-pre data-placeholder:text-placeholder text-foreground data-focused:bg-focus data-focused:text-foreground rounded leading-none"
            contenteditable="true"
            data-rac=""
            data-type="month"
            enterkeyhint="next"
            id="react-aria-_r_9_"
            inputmode="numeric"
            role="spinbutton"
            spellcheck="false"
            style="caret-color: transparent;"
            tabindex="0"
          >
            <span
              aria-hidden="true"
              class="invisible hidden pointer-events-none w-full text-center"
            />
            <span>
              01
            </span>
          </span>
          <span
            aria-hidden="true"
            class="inline p-0.5 caret-transparent type-literal:px-0 data-focused:data-placeholder:text-foreground type-literal:text-placeholder disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:bg-disabled data-placeholder:disabled:text-disabled-foreground invalid:data-focused:bg-destructive invalid:data-focused:data-placeholder:text-destructive-foreground invalid:data-focused:text-destructive-foreground invalid:placeholder:text-destructive invalid:text-destructive group/segment outline-0 whitespace-pre data-placeholder:text-placeholder text-foreground data-focused:bg-focus data-focused:text-foreground rounded leading-none"
            data-rac=""
            data-type="literal"
          >
            <span
              aria-hidden="true"
              class="invisible hidden pointer-events-none w-full text-center"
            />
            <span>
              .
            </span>
          </span>
          <span
            aria-label="Jahr, "
            aria-labelledby="react-aria-_r_d_ react-aria-_r_1_"
            aria-valuemax="9999"
            aria-valuemin="1"
            aria-valuenow="2026"
            aria-valuetext="2026"
            autocorrect="off"
            class="inline p-0.5 caret-transparent type-literal:px-0 data-focused:data-placeholder:text-foreground type-literal:text-placeholder disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:bg-disabled data-placeholder:disabled:text-disabled-foreground invalid:data-focused:bg-destructive invalid:data-focused:data-placeholder:text-destructive-foreground invalid:data-focused:text-destructive-foreground invalid:placeholder:text-destructive invalid:text-destructive group/segment outline-0 whitespace-pre data-placeholder:text-placeholder text-foreground data-focused:bg-focus data-focused:text-foreground rounded leading-none"
            contenteditable="true"
            data-rac=""
            data-type="year"
            enterkeyhint="next"
            id="react-aria-_r_d_"
            inputmode="numeric"
            role="spinbutton"
            spellcheck="false"
            style="caret-color: transparent;"
            tabindex="0"
          >
            <span
              aria-hidden="true"
              class="invisible hidden pointer-events-none w-full text-center"
            />
            <span>
              2026
            </span>
          </span>
        </div>
        <input
          class=""
          data-rac=""
          hidden=""
          title=""
          type="text"
          value="2026-01-01"
        />
      </div>
      <div
        class="in-field:mt-1 text-xs text-muted-foreground group-disabled/field:text-disabled-foreground group-invalid/field:text-destructive has-[+_[aria-hidden=true]]:mb-0"
      >
        <span
          class="react-aria-Text"
          id="react-aria-_r_3_"
          slot="description"
        >
          This is a help text description
        </span>
      </div>
    </div>
  `);
});

test('render DateField with label and helper text', () => {
  render(
    <Basic.Component label="label" description="date field description" />
  );

  const label = screen.getByText('label');
  const description = screen.getByText('date field description');

  expect(label).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

test('supports error message', () => {
  render(
    <Basic.Component
      label="date field"
      error
      errorMessage="something went wrong"
    />
  );

  const error = screen.getByText('something went wrong');

  expect(error).toBeInTheDocument();
});

test('displays error message instead of description when both are provided', () => {
  render(
    <Basic.Component
      label="date field"
      error
      errorMessage="something went wrong"
      description="this is description"
    />
  );

  const description = screen.queryByText('this is description');
  const error = screen.getByText('something went wrong');

  expect(description).not.toBeInTheDocument();
  expect(error).toBeInTheDocument();
});

test('renders without icons', () => {
  render(<Basic.Component label="date field" />);

  const icon = screen.queryByRole('icon');
  const action = screen.queryByRole('action');

  expect(icon).not.toBeInTheDocument();
  expect(action).not.toBeInTheDocument();
});

test('renders action as react element', () => {
  render(<Basic.Component label="date field" action={<div>huhu</div>} />);

  const action = screen.getByText('huhu');

  expect(action).toMatchInlineSnapshot(`
<div>
  huhu
</div>
`);
  expect(action).toBeInTheDocument();
});

test('calls onChange when pasting a valid date', async () => {
  const user = userEvent.setup();
  const onChangeSpy = vi.fn();

  render(<Basic.Component label="date field" onChange={onChangeSpy} />);

  const group = screen.getAllByRole('group')[0];
  await user.click(group);
  await user.paste('2024-12-25');

  expect(onChangeSpy).toHaveBeenCalledWith(new CalendarDate(2024, 12, 25));
  expect(onChangeSpy).toHaveBeenCalledTimes(1);
});

test('updates field state when pasting without onChange callback', async () => {
  const user = userEvent.setup();

  render(<Basic.Component label="date field" />);

  const group = screen.getAllByRole('group')[0];
  await user.click(group);
  await user.paste('2024-12-25');

  const segments = screen.getAllByRole('spinbutton');
  const [daySegment, monthSegment, yearSegment] = segments;

  expect(daySegment).toHaveTextContent('25');
  expect(monthSegment).toHaveTextContent('12');
  expect(yearSegment).toHaveTextContent('2024');
});

test.each([
  {
    format: 'ISO format (YYYY-MM-DD)',
    input: '2024-12-25',
    expected: new CalendarDate(2024, 12, 25),
  },
  {
    format: 'European format (DD.MM.YYYY)',
    input: '25.12.2024',
    expected: new CalendarDate(2024, 12, 25),
  },
  {
    format: 'European format with slash (DD/MM/YYYY)',
    input: '25/12/2024',
    expected: new CalendarDate(2024, 12, 25),
  },
  {
    format: 'US format (MM/DD/YYYY)',
    input: '12/25/2024',
    expected: new CalendarDate(2024, 12, 25),
  },
])('supports pasting dates in $format', async ({ input, expected }) => {
  const user = userEvent.setup();
  const onChangeSpy = vi.fn();

  render(<Basic.Component label="date field" onChange={onChangeSpy} />);

  const group = screen.getAllByRole('group')[0];
  await user.click(group);
  await user.paste(input);

  expect(onChangeSpy).toHaveBeenCalledWith(expected);
});

test('does not call onChange when pasting invalid date', async () => {
  const user = userEvent.setup();
  const onChangeSpy = vi.fn();

  render(<Basic.Component label="date field" onChange={onChangeSpy} />);

  const group = screen.getAllByRole('group')[0];
  await user.click(group);
  await user.paste('not a date');

  expect(onChangeSpy).not.toHaveBeenCalled();
});

test('does not call onChange when pasting invalid date format', async () => {
  const user = userEvent.setup();
  const onChangeSpy = vi.fn();

  render(<Basic.Component label="date field" onChange={onChangeSpy} />);

  const group = screen.getAllByRole('group')[0];
  await user.click(group);
  await user.paste('32/13/2024'); // Invalid day and month

  expect(onChangeSpy).not.toHaveBeenCalled();
});

test.each([
  {
    year: 2024,
    description: 'leap year divisible by 4',
    input: '29.02.2024',
    expected: new CalendarDate(2024, 2, 29),
  },
  {
    year: 2000,
    description: 'leap year divisible by 400',
    input: '29.02.2000',
    expected: new CalendarDate(2000, 2, 29),
  },
  {
    year: 1600,
    description: 'leap year divisible by 400',
    input: '29.02.1600',
    expected: new CalendarDate(1600, 2, 29),
  },
])(
  'accepts February 29th for $description ($year)',
  async ({ input, expected }) => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();

    render(<Basic.Component label="date field" onChange={onChangeSpy} />);

    const group = screen.getAllByRole('group')[0];
    await user.click(group);
    await user.paste(input);

    expect(onChangeSpy).toHaveBeenCalledWith(expected);
  }
);

test.each([
  { year: 2023, description: 'non-leap year', input: '29.02.2023' },
  {
    year: 1900,
    description: 'century year not divisible by 400',
    input: '29.02.1900',
  },
  {
    year: 2100,
    description: 'century year not divisible by 400',
    input: '29.02.2100',
  },
])('rejects February 29th for $description ($year)', async ({ input }) => {
  const user = userEvent.setup();
  const onChangeSpy = vi.fn();

  render(<Basic.Component label="date field" onChange={onChangeSpy} />);

  const group = screen.getAllByRole('group')[0];
  await user.click(group);
  await user.paste(input);

  expect(onChangeSpy).not.toHaveBeenCalled();
});

test('show console warning when pasting fails', async () => {
  const user = userEvent.setup();
  const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

  render(<Basic.Component label="date field" />);

  const group = screen.getAllByRole('group')[0];
  await user.click(group);

  await expect(user.paste(undefined)).resolves.not.toThrow();
  expect(consoleWarnSpy).not.toHaveBeenCalled();
});
