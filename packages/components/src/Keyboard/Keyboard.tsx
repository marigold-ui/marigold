import type { ComponentPropsWithoutRef, Ref } from 'react';
import { use } from 'react';
import {
  KeyboardContext,
  Keyboard as RACKeyboard,
} from 'react-aria-components/Keyboard';
import { useClassNames } from '@marigold/system';

type RemovedProps = 'className' | 'style';

export interface KeyboardProps extends Omit<
  ComponentPropsWithoutRef<typeof RACKeyboard>,
  RemovedProps
> {
  ref?: Ref<HTMLElement>;
}

// Renders a `<kbd>` shortcut hint as a standalone key-cap. Inside a container
// that styles the hint via KeyboardContext (e.g. Menu.Item), defer to it. The
// context also carries the id used for the container's aria-describedby.
const _Keyboard = (props: KeyboardProps) => {
  const classNames = useClassNames({ component: 'Keyboard' });
  const context = use(KeyboardContext) as { className?: string } | null;

  return (
    <RACKeyboard
      {...props}
      className={context?.className ? undefined : classNames}
    />
  );
};

export { _Keyboard as Keyboard };
