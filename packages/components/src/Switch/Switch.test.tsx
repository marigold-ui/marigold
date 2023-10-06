import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Theme, cva } from '@marigold/system';

import { setup } from '../test.utils';
import { Switch } from './_Switch';

const theme: Theme = {
  name: 'switch test',
  components: {
    Switch: {
      container: cva(),
      track: cva(
        [
          'bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px]',
          'group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked',
          ' disabled:bg-dis disabled:opacity-[0.5]',
          'focus:outline-offset[3] focus:outline-none',
          'focus:outline-switch-track-outline-focus',
        ],
        {
          variants: {
            size: {
              large: 'h-[48] w-[96] rounded-[40]',
            },
          },
        }
      ),
      thumb: cva(['bg-switch-track-background', 'shadow-[1px_1px_4px]'], {
        variants: {
          size: {
            large: 'top-2 h-[44] w-[44] ',
          },
        },
      }),
    },
  },
};

const user = userEvent.setup();
const getSwitchParts = () => {
  const label: HTMLLabelElement = screen.getByText('Label');
  // eslint-disable-next-line testing-library/no-node-access
  const container: HTMLElement = label.parentElement!;
  // eslint-disable-next-line testing-library/no-node-access
  const track = container.lastChild! as HTMLElement;
  // eslint-disable-next-line testing-library/no-node-access
  const thumb = track.lastChild! as HTMLElement;

  const input: HTMLInputElement = screen.getByRole('switch');

  return { label, input, container, track, thumb };
};

const { render } = setup({ theme });

test('supports base styling', () => {
  render(<Switch>Label</Switch>);
  const { label, container, track, thumb } = getSwitchParts();

  expect(label.className).toMatchInlineSnapshot(
    `"group/switch w-[var(--switchWidth)] relative flex items-center justify-between gap-[1ch]"`
  );
  expect(container.className).toMatchInlineSnapshot(`""`);
  expect(track.className).toMatchInlineSnapshot(
    `"group/switch w-[var(--switchWidth)] relative flex items-center justify-between gap-[1ch]"`
  );
  expect(thumb.className).toMatchInlineSnapshot(
    `"relative h-6 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px] group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked disabled:bg-dis disabled:opacity-[0.5] focus:outline-none focus:outline-switch-track-outline-focus"`
  );
});

test('supports a custom variant', () => {
  render(<Switch variant="custom">Label</Switch>);
  const { track, thumb } = getSwitchParts();

  expect(track.className).toMatchInlineSnapshot(
    `"group/switch w-[var(--switchWidth)] relative flex items-center justify-between gap-[1ch]"`
  );
  expect(thumb.className).toMatchInlineSnapshot(
    `"relative h-6 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px] group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked disabled:bg-dis disabled:opacity-[0.5] focus:outline-none focus:outline-switch-track-outline-focus"`
  );
});

test('supports a size', () => {
  render(<Switch size="medium">Label</Switch>);
  const { track } = getSwitchParts();

  expect(track.className).toMatchInlineSnapshot(
    `"group/switch w-[var(--switchWidth)] relative flex items-center justify-between gap-[1ch]"`
  );
});

test('takes full width by default', () => {
  render(<Switch>Label</Switch>);
  const { container } = getSwitchParts();
  expect(container.className).toMatchInlineSnapshot(`""`);
});

test('allows to set width via prop', () => {
  render(<Switch width="500px">Label</Switch>);
  const { label } = getSwitchParts();
  expect(label).toHaveAttribute('style', '--switchWidth: 500px;');
});

test('supports disabled prop', () => {
  render(<Switch disabled>Label</Switch>);
  const { input, thumb, track } = getSwitchParts();

  expect(input).toBeDisabled();
  expect(track.className).toMatchInlineSnapshot(
    `"group/switch w-[var(--switchWidth)] relative flex items-center justify-between gap-[1ch]"`
  );
  expect(thumb.className).toMatchInlineSnapshot(
    `"relative h-6 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px] group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked disabled:bg-dis disabled:opacity-[0.5] focus:outline-none focus:outline-switch-track-outline-focus"`
  );
});

test('renders hidden <input> element', () => {
  render(<Switch>Label</Switch>);
  const { input } = getSwitchParts();
  expect(input instanceof HTMLInputElement).toBeTruthy();
});

test('toggle switch per click', () => {
  render(<Switch>Label</Switch>);

  const { input, track } = getSwitchParts();

  fireEvent.click(input);
  expect(track.className).toMatchInlineSnapshot(
    `"group/switch w-[var(--switchWidth)] relative flex items-center justify-between gap-[1ch]"`
  );
  expect(input.checked).toBeTruthy();

  fireEvent.click(input);
  expect(track.className).toMatchInlineSnapshot(
    `"group/switch w-[var(--switchWidth)] relative flex items-center justify-between gap-[1ch]"`
  );
  expect(input.checked).toBeFalsy();
});

test('focus element and toggle switch per keyboard space', async () => {
  render(<Switch>Label</Switch>);

  const { input, track } = getSwitchParts();
  user.tab();

  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => expect(track).toHaveAttribute('data-focus'));
  user.keyboard('{space}');
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => expect(track).toHaveStyle(`background-color: orange`));
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => expect(input.checked).toBeTruthy());

  user.keyboard('{space}');
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => expect(track).toHaveStyle(`background-color: blue`));
  // eslint-disable-next-line testing-library/await-async-utils
  waitFor(() => expect(input.checked).toBeFalsy());
});

test('supports default checked', () => {
  render(<Switch defaultChecked>Label</Switch>);

  const { input } = getSwitchParts();

  expect(input.checked).toBeTruthy();
  fireEvent.click(input);
  expect(input.checked).toBeFalsy();
});

test('supports controlled component usage', () => {
  const onChange = jest.fn();
  render(<Switch onChange={onChange}>Label</Switch>);

  const { input } = getSwitchParts();

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(true);
  expect(input.checked).toBeTruthy();

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(false);
  expect(input.checked).toBeFalsy();
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLInputElement>();
  render(<Switch ref={ref}>Label</Switch>);

  expect(ref.current).toBeInstanceOf(HTMLInputElement);
});
