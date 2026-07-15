import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';
import { Keyboard as RACKeyboard } from 'react-aria-components/Keyboard';

type RemovedProps = 'className' | 'style';

export interface KeyboardProps extends Omit<
  ComponentPropsWithoutRef<typeof RACKeyboard>,
  RemovedProps
> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

// Renders a `<kbd>` shortcut hint. Styling and the id used for the parent's
// aria-describedby come from the surrounding `KeyboardContext` (e.g. injected
// by `Menu.Item`), mirroring how `<Description>` reads `TextContext`.
const _Keyboard = ({ children, ref, ...props }: KeyboardProps) => (
  <RACKeyboard ref={ref} {...props}>
    {children}
  </RACKeyboard>
);

export { _Keyboard as Keyboard };
