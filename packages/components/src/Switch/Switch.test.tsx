import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Switch } from './Switch';

const theme: Theme = {
  name: 'switch test',
  components: {
    Label: {
      container: cva(),
      indicator: cva(),
    },
    ProgressCycle: cva(),
    Switch: {
      container: cva(),
      track: cva(
        [
          'bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px]',
          'group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked',
          ' disabled:bg-dis disabled:opacity-50',
          'focus:outline-offset[3] focus:outline-hidden',
          'focus:outline-switch-track-outline-focus',
        ],
        {
          variants: {
            size: {
              large: 'h-48 w-96 rounded-[40]',
            },
          },
        }
      ),
      thumb: cva(['bg-switch-track-background', 'shadow-[1px_1px_4px]'], {
        variants: {
          size: {
            large: 'top-2 size-44',
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
  render(<Switch label="Label" />);
  const { label, container, track, thumb } = getSwitchParts();

  expect(label.className).toMatchInlineSnapshot(`"inline-flex"`);
  expect(container.className).toMatchInlineSnapshot(
    `"w-full group/switch flex items-center gap-[1ch]"`
  );
  expect(track.className).toMatchInlineSnapshot(`"relative"`);
  expect(thumb.className).toMatchInlineSnapshot(
    `"bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px] group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked disabled:bg-dis disabled:opacity-50 focus:outline-hidden focus:outline-switch-track-outline-focus"`
  );
});

test('supports a custom variant', () => {
  render(<Switch variant="custom" label="Label" />);
  const { track, thumb } = getSwitchParts();

  expect(track.className).toMatchInlineSnapshot(`"relative"`);
  expect(thumb.className).toMatchInlineSnapshot(
    `"bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px] group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked disabled:bg-dis disabled:opacity-50 focus:outline-hidden focus:outline-switch-track-outline-focus"`
  );
});

test('supports a size', () => {
  render(<Switch size="medium" label="Label" />);
  const { track } = getSwitchParts();

  expect(track.className).toMatchInlineSnapshot(`"relative"`);
});

test('takes full width by default', () => {
  render(<Switch label="Label" />);
  const { container } = getSwitchParts();
  expect(container.className).toMatchInlineSnapshot(
    `"w-full group/switch flex items-center gap-[1ch]"`
  );
});

test('allows to set width via prop', () => {
  render(<Switch width={10} label="Label" />);
  const { label } = getSwitchParts();
  expect(label.className).toMatchInlineSnapshot(`"inline-flex"`);
});

test('supports disabled prop', () => {
  render(<Switch disabled label="Label" />);
  const { input, thumb, track } = getSwitchParts();

  expect(input).toBeDisabled();
  expect(track.className).toMatchInlineSnapshot(`"relative"`);
  expect(thumb.className).toMatchInlineSnapshot(
    `"bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px] group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked disabled:bg-dis disabled:opacity-50 focus:outline-hidden focus:outline-switch-track-outline-focus"`
  );
});

test('renders hidden <input> element', () => {
  render(<Switch label="Label" />);
  const { input } = getSwitchParts();
  expect(input instanceof HTMLInputElement).toBeTruthy();
});

test('focus element and toggle switch per keyboard space', async () => {
  render(<Switch label="Label" />);

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

test('supports default selected', () => {
  render(<Switch defaultSelected label="Label" />);

  const { input } = getSwitchParts();

  expect(input.checked).toBeTruthy();
  fireEvent.click(input);
  expect(input.checked).toBeFalsy();
});

test('supports controlled component usage', () => {
  const onChange = vi.fn();
  render(<Switch onChange={onChange} label="Label" />);

  const { input } = getSwitchParts();

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(true);
  expect(input.checked).toBeTruthy();

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(false);
  expect(input.checked).toBeFalsy();
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLLabelElement>();
  render(<Switch ref={ref} label="Label" />);

  expect(ref.current).toBeInstanceOf(HTMLLabelElement);
});
