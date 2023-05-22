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
          'border-input-border border bg-white shadow-[inset_0px_0px_1px',
          'checked:bg-switch-track-primary checked:shadow-switch-track-checked',
          'disabled:opacity-[0.5] disabled:shadow-switch-track-shadow disabled:bg-switch-track-shadow focus:outline-none focus:outline-offset[3]',
          'focus:outline-switch-track-outline-focus',
        ],
        {
          variants: {
            size: {
              large: 'w-[96] h-[48] rounded-[40]',
            },
          },
        }
      ),
      thumb: cva(
        ['bg-root-body', 'h-4 w-4'],

        // 'shadow-[inset_1px_1px_4px] shadow-switch-thumb-shadow disabled:bg-switch-thumb-disabled',
        {
          variants: {
            size: {
              large:
                'top-2 w-[44] h-[44] checked:translate-x-[calc(95px_-_44px)]',
            },
          },
        }
      ),
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
    `"group/switch relative flex items-center justify-between gap-[1ch]"`
  );
  expect(track.className).toMatchInlineSnapshot(
    `"relative h-6 w-12 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl border-input-border border bg-white shadow-[inset_0px_0px_1px checked:bg-switch-track-primary checked:shadow-switch-track-checked disabled:opacity-[0.5] disabled:shadow-switch-track-shadow disabled:bg-switch-track-shadow focus:outline-none focus:outline-switch-track-outline-focus"`
  );
  expect(thumb.className).toMatchInlineSnapshot(
    `"transition-[all 0.1s cubic-bezier(.7, 0, .3, 1)] checked:translate-x-[calc(47px - 100%)] absolute left-0 top-0 block translate-x-[1px] rounded-full will-change-transform group-selected/switch:translate-x-[calc(47px_-_100%)] bg-root-body h-4 w-4"`
  );
});

test('supports a custom variant', () => {
  render(<Switch variant="custom">Label</Switch>);
  const { container, track, thumb } = getSwitchParts();

  expect(container.className).toMatchSnapshot();
  expect(track.className).toMatchInlineSnapshot(
    `"relative h-6 w-12 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl border-input-border border bg-white shadow-[inset_0px_0px_1px checked:bg-switch-track-primary checked:shadow-switch-track-checked disabled:opacity-[0.5] disabled:shadow-switch-track-shadow disabled:bg-switch-track-shadow focus:outline-none focus:outline-switch-track-outline-focus"`
  );
  expect(thumb.className).toMatchInlineSnapshot(
    `"transition-[all 0.1s cubic-bezier(.7, 0, .3, 1)] checked:translate-x-[calc(47px - 100%)] absolute left-0 top-0 block translate-x-[1px] rounded-full will-change-transform group-selected/switch:translate-x-[calc(47px_-_100%)] bg-root-body h-4 w-4"`
  );
});

test('supports a size', () => {
  render(<Switch size="medium">Label</Switch>);
  const { track } = getSwitchParts();

  expect(track.className).toMatchInlineSnapshot(
    `"relative h-6 w-12 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl border-input-border border bg-white shadow-[inset_0px_0px_1px checked:bg-switch-track-primary checked:shadow-switch-track-checked disabled:opacity-[0.5] disabled:shadow-switch-track-shadow disabled:bg-switch-track-shadow focus:outline-none focus:outline-switch-track-outline-focus"`
  );
});

test('takes full width by default', () => {
  render(<Switch>Label</Switch>);
  const { container } = getSwitchParts();
  expect(container.className).toMatchInlineSnapshot(
    `"group/switch relative flex items-center justify-between gap-[1ch]"`
  );
});

test('allows to set width via prop', () => {
  render(<Switch width="large">Label</Switch>);
  const { container } = getSwitchParts();
  expect(container.className).toMatchSnapshot();
});

test('supports disabled prop', () => {
  render(<Switch disabled>Label</Switch>);
  const { input, thumb, track } = getSwitchParts();

  expect(input).toBeDisabled();
  expect(track.className).toMatchInlineSnapshot(
    `"relative h-6 w-12 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl border-input-border border bg-white shadow-[inset_0px_0px_1px checked:bg-switch-track-primary checked:shadow-switch-track-checked disabled:opacity-[0.5] disabled:shadow-switch-track-shadow disabled:bg-switch-track-shadow focus:outline-none focus:outline-switch-track-outline-focus"`
  );
  expect(thumb.className).toMatchInlineSnapshot(
    `"transition-[all 0.1s cubic-bezier(.7, 0, .3, 1)] checked:translate-x-[calc(47px - 100%)] absolute left-0 top-0 block translate-x-[1px] rounded-full will-change-transform group-selected/switch:translate-x-[calc(47px_-_100%)] bg-root-body h-4 w-4"`
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
    `"relative h-6 w-12 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl border-input-border border bg-white shadow-[inset_0px_0px_1px checked:bg-switch-track-primary checked:shadow-switch-track-checked disabled:opacity-[0.5] disabled:shadow-switch-track-shadow disabled:bg-switch-track-shadow focus:outline-none focus:outline-switch-track-outline-focus"`
  );
  expect(input.checked).toBeTruthy();

  fireEvent.click(input);
  expect(track.className).toMatchInlineSnapshot(
    `"relative h-6 w-12 flex-shrink-0 flex-grow-0 basis-12 rounded-3xl border-input-border border bg-white shadow-[inset_0px_0px_1px checked:bg-switch-track-primary checked:shadow-switch-track-checked disabled:opacity-[0.5] disabled:shadow-switch-track-shadow disabled:bg-switch-track-shadow focus:outline-none focus:outline-switch-track-outline-focus"`
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
