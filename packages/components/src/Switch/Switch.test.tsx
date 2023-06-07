import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Theme } from '@marigold/system';
import { Switch } from './Switch';
import { cva } from 'class-variance-authority';
import userEvent from '@testing-library/user-event';
import { setup } from '../test.utils';

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
      label: cva(''),
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

  expect(label.className).toMatchInlineSnapshot(`""`);
  expect(container.className).toMatchInlineSnapshot(
    `"group/switch w-[var(--switchWidth)] relative flex items-center justify-between gap-[1ch]"`
  );
  expect(track.className).toMatchInlineSnapshot(
    `"relative h-6 w-12 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px] group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked disabled:bg-dis disabled:opacity-[0.5] focus:outline-none focus:outline-switch-track-outline-focus"`
  );
  expect(thumb.className).toMatchInlineSnapshot(
    `"h-[22px] w-[22px] cubic-bezier(.7,0,.3,1) checked:translate-x-[calc(47px - 100%)] absolute left-0 top-px block translate-x-[1px] rounded-full transition-all duration-100 ease-in-out will-change-transform group-selected/switch:translate-x-[calc(47px_-_100%)] bg-switch-track-background shadow-[1px_1px_4px]"`
  );
});

test('supports a custom variant', () => {
  render(<Switch variant="custom">Label</Switch>);
  const { track, thumb } = getSwitchParts();

  expect(track.className).toMatchInlineSnapshot(
    `"relative h-6 w-12 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px] group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked disabled:bg-dis disabled:opacity-[0.5] focus:outline-none focus:outline-switch-track-outline-focus"`
  );
  expect(thumb.className).toMatchInlineSnapshot(
    `"h-[22px] w-[22px] cubic-bezier(.7,0,.3,1) checked:translate-x-[calc(47px - 100%)] absolute left-0 top-px block translate-x-[1px] rounded-full transition-all duration-100 ease-in-out will-change-transform group-selected/switch:translate-x-[calc(47px_-_100%)] bg-switch-track-background shadow-[1px_1px_4px]"`
  );
});

test('supports a size', () => {
  render(<Switch size="medium">Label</Switch>);
  const { track } = getSwitchParts();

  expect(track.className).toMatchInlineSnapshot(
    `"relative h-6 w-12 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px] group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked disabled:bg-dis disabled:opacity-[0.5] focus:outline-none focus:outline-switch-track-outline-focus"`
  );
});

test('takes full width by default', () => {
  render(<Switch>Label</Switch>);
  const { container } = getSwitchParts();
  expect(container.className).toMatchInlineSnapshot(
    `"group/switch w-[var(--switchWidth)] relative flex items-center justify-between gap-[1ch]"`
  );
});

test('allows to set width via prop', () => {
  render(<Switch width="500px">Label</Switch>);
  const { container } = getSwitchParts();
  expect(container).toHaveAttribute('style', '--switchWidth: 500px;');
});

test('supports disabled prop', () => {
  render(<Switch disabled>Label</Switch>);
  const { input, thumb, track } = getSwitchParts();

  expect(input).toBeDisabled();
  expect(track.className).toMatchInlineSnapshot(
    `"relative h-6 w-12 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px] group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked disabled:bg-dis disabled:opacity-[0.5] focus:outline-none focus:outline-switch-track-outline-focus"`
  );
  expect(thumb.className).toMatchInlineSnapshot(
    `"h-[22px] w-[22px] cubic-bezier(.7,0,.3,1) checked:translate-x-[calc(47px - 100%)] absolute left-0 top-px block translate-x-[1px] rounded-full transition-all duration-100 ease-in-out will-change-transform group-selected/switch:translate-x-[calc(47px_-_100%)] bg-switch-track-background shadow-[1px_1px_4px]"`
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
    `"relative h-6 w-12 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px] group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked disabled:bg-dis disabled:opacity-[0.5] focus:outline-none focus:outline-switch-track-outline-focus"`
  );
  expect(input.checked).toBeTruthy();

  fireEvent.click(input);
  expect(track.className).toMatchInlineSnapshot(
    `"relative h-6 w-12 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl bg-switch-track-background shadow-switch-track-shadow shadow-[0_0_0_1px] group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked disabled:bg-dis disabled:opacity-[0.5] focus:outline-none focus:outline-switch-track-outline-focus"`
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
