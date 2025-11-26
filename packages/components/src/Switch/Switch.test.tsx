import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';
import * as stories from './Switch.stories';

const { Basic } = composeStories(stories);

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
  render(<Basic label="Label" />);
  const { label, container, track, thumb } = getSwitchParts();

  expect(label.className).toMatchInlineSnapshot(
    `"items-center gap-1 text-sm font-medium leading-none text-foreground group-disabled/field:cursor-not-allowed group-disabled/field:text-disabled-foreground group-required/field:after:content-["*"] group-required/field:after:-ml-1 group-required/field:after:text-destructive inline-flex"`
  );
  expect(container.className).toMatchInlineSnapshot(
    `"w-full group/switch flex items-center gap-[1ch] disabled:cursor-not-allowed disabled:text-disabled-foreground"`
  );
  expect(track.className).toMatchInlineSnapshot(`"relative"`);
  expect(thumb.className).toMatchInlineSnapshot(
    `"flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors border-2 border-transparent group-disabled/switch:bg-disabled group-disabled/switch:text-disabled-foreground group-selected/switch:group-disabled/switch:bg-disabled group-selected/switch:group-disabled/switch:text-disabled-foreground group-selected/switch:bg-brand bg-input group-focus-visible/switch:state-focus-borderless outline-none"`
  );
});

test('supports a custom variant', () => {
  render(<Basic variant="custom" label="Label" />);
  const { track, thumb } = getSwitchParts();

  expect(track.className).toMatchInlineSnapshot(`"relative"`);
  expect(thumb.className).toMatchInlineSnapshot(
    `"flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors border-2 border-transparent group-disabled/switch:bg-disabled group-disabled/switch:text-disabled-foreground group-selected/switch:group-disabled/switch:bg-disabled group-selected/switch:group-disabled/switch:text-disabled-foreground group-selected/switch:bg-brand bg-input group-focus-visible/switch:state-focus-borderless outline-none"`
  );
});

test('supports a size', () => {
  render(<Basic size="medium" label="Label" />);
  const { track } = getSwitchParts();

  expect(track.className).toMatchInlineSnapshot(`"relative"`);
});

test('takes full width by default', () => {
  render(<Basic label="Label" />);

  const { container } = getSwitchParts();
  expect(container.className).toMatchInlineSnapshot(
    `"w-full group/switch flex items-center gap-[1ch] disabled:cursor-not-allowed disabled:text-disabled-foreground"`
  );
});

test('allows to set width via prop', () => {
  render(<Basic width={10} label="Label" />);
  const { label } = getSwitchParts();

  expect(label.className).toMatchInlineSnapshot(
    `"items-center gap-1 text-sm font-medium leading-none text-foreground group-disabled/field:cursor-not-allowed group-disabled/field:text-disabled-foreground group-required/field:after:content-["*"] group-required/field:after:-ml-1 group-required/field:after:text-destructive inline-flex"`
  );
});

test('supports disabled prop', () => {
  render(<Basic disabled label="Label" />);
  const { input, thumb, track } = getSwitchParts();

  expect(input).toBeDisabled();
  expect(track.className).toMatchInlineSnapshot(`"relative"`);
  expect(thumb.className).toMatchInlineSnapshot(
    `"flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors border-2 border-transparent group-disabled/switch:bg-disabled group-disabled/switch:text-disabled-foreground group-selected/switch:group-disabled/switch:bg-disabled group-selected/switch:group-disabled/switch:text-disabled-foreground group-selected/switch:bg-brand bg-input group-focus-visible/switch:state-focus-borderless outline-none"`
  );
});

test('renders hidden <input> element', () => {
  render(<Basic label="Label" />);
  const { input } = getSwitchParts();

  expect(input instanceof HTMLInputElement).toBeTruthy();
});

test('supports default selected', () => {
  render(<Basic defaultSelected label="Label" />);

  const { input } = getSwitchParts();

  expect(input.checked).toBeTruthy();
  fireEvent.click(input);
  expect(input.checked).toBeFalsy();
});

test('supports controlled component usage', () => {
  const onChange = vi.fn();
  render(<Basic onChange={onChange} label="Label" />);

  const { input } = getSwitchParts();

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(true);
  expect(input.checked).toBeTruthy();

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(false);
  expect(input.checked).toBeFalsy();
});

test('forwards ref', () => {
  const ref = createRef<HTMLLabelElement>();
  render(<Basic ref={ref} label="Label" />);

  expect(ref.current).toBeInstanceOf(HTMLLabelElement);
});
