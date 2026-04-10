import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { vi } from 'vitest';
import { Basic } from './Switch.stories';

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

test('supports base styling', () => {
  render(<Basic.Component label="Label" />);
  const { label, container, track, thumb } = getSwitchParts();

  expect(label.className).toMatchInlineSnapshot(
    `"items-center gap-1 text-sm font-medium leading-none text-foreground group-disabled/field:cursor-not-allowed group-disabled/field:text-disabled group-required/field:after:content-["*"] group-required/field:after:-ml-1 group-required/field:after:text-destructive-accent in-field:mb-1.5 inline-flex"`
  );
  expect(container.className).toMatchInlineSnapshot(
    `"w-full group/switch flex items-center gap-[1ch] disabled:cursor-not-allowed disabled:text-disabled"`
  );
  expect(track.className).toMatchInlineSnapshot(`"relative"`);
  expect(thumb.className).toMatchInlineSnapshot(
    `"flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors border-2 border-transparent group-disabled/switch:bg-disabled-surface group-disabled/switch:text-disabled group-selected/switch:group-disabled/switch:bg-disabled-surface group-selected/switch:group-disabled/switch:text-disabled group-selected/switch:bg-selected-bold bg-neutral group-focus-visible/switch:ui-state-focus outline-none"`
  );
});

test('takes full width by default', () => {
  render(<Basic.Component label="Label" />);

  const { container } = getSwitchParts();
  expect(container.className).toMatchInlineSnapshot(
    `"w-full group/switch flex items-center gap-[1ch] disabled:cursor-not-allowed disabled:text-disabled"`
  );
});

test('allows to set width via prop', () => {
  render(<Basic.Component width={10} label="Label" />);
  const { label } = getSwitchParts();

  expect(label.className).toMatchInlineSnapshot(
    `"items-center gap-1 text-sm font-medium leading-none text-foreground group-disabled/field:cursor-not-allowed group-disabled/field:text-disabled group-required/field:after:content-["*"] group-required/field:after:-ml-1 group-required/field:after:text-destructive-accent in-field:mb-1.5 inline-flex"`
  );
});

test('supports disabled prop', () => {
  render(<Basic.Component disabled label="Label" />);
  const { input, thumb, track } = getSwitchParts();

  expect(input).toBeDisabled();
  expect(track.className).toMatchInlineSnapshot(`"relative"`);
  expect(thumb.className).toMatchInlineSnapshot(
    `"flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors border-2 border-transparent group-disabled/switch:bg-disabled-surface group-disabled/switch:text-disabled group-selected/switch:group-disabled/switch:bg-disabled-surface group-selected/switch:group-disabled/switch:text-disabled group-selected/switch:bg-selected-bold bg-neutral group-focus-visible/switch:ui-state-focus outline-none"`
  );
});

test('supports controlled component usage', async () => {
  const onChange = vi.fn();
  render(<Basic.Component onChange={onChange} label="Label" />);

  const { input } = getSwitchParts();

  await user.click(input);
  expect(onChange).toHaveBeenCalledWith(true);
  expect(input.checked).toBeTruthy();

  await user.click(input);
  expect(onChange).toHaveBeenCalledWith(false);
  expect(input.checked).toBeFalsy();
});

test('forwards ref', () => {
  const ref = createRef<HTMLLabelElement>();
  render(<Basic.Component ref={ref} label="Label" />);

  expect(ref.current).toBeInstanceOf(HTMLLabelElement);
});
