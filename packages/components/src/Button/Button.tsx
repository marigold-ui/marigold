import type { ReactNode, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Button } from 'react-aria-components/Button';
import { useContextProps } from 'react-aria-components/slots';
import { cn, useClassNames } from '@marigold/system';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';
import type { SlotProps } from '../types';
import { ButtonContext, type ButtonContextValue } from './Context';

type RemovedProps = 'isDisabled' | 'isPending' | 'className' | 'style';

export interface ButtonProps
  extends Omit<RAC.ButtonProps, RemovedProps>, SlotProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'destructive-ghost'
    | 'ghost'
    | 'link'
    | (string & {});

  /**
   * The size of the button. `icon` renders a square, icon-only button and
   * composes with any `variant` (e.g. `variant="ghost" size="icon"`).
   * @default 'default'
   */
  size?: 'default' | 'small' | 'large' | 'icon' | (string & {});

  /**
   * If true, the element stretches to fill the available width.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Children of the component
   */
  children?: ReactNode;

  /**
   * Disables the button.
   * @default false
   */
  disabled?: RAC.ButtonProps['isDisabled'];
  /**
   * Whether the button is in a loading state.
   * This disables press and hover events while retaining focusability, and announces the loading state to screen readers.
   */
  loading?: RAC.ButtonProps['isPending'];
  ref?: Ref<HTMLButtonElement>;
}

const _Button = ({ ref: refProp, ...inputProps }: ButtonProps) => {
  // Consume the Marigold `ButtonContext` (NOT RAC's) so a bare `<Button>`
  // adapts inside `<ButtonGroup>`/`<Panel.Header>`. A local prop always wins;
  // `slot={null}` opts out, any other `slot` forwards to RAC's `<Button>`.
  const [merged, ref] = useContextProps(
    inputProps as ButtonContextValue,
    refProp,
    ButtonContext
  );

  const {
    children,
    variant,
    size,
    disabled,
    loading,
    fullWidth,
    className,
    ...props
  } = merged;

  const classNames = useClassNames({
    component: 'Button',
    variant,
    size,
  });

  return (
    <Button
      {...props}
      ref={ref}
      className={cn(
        className,
        classNames,
        fullWidth ? 'w-full' : undefined,
        loading && 'cursor-progress!'
      )}
      isPending={loading}
      isDisabled={disabled}
    >
      {loading ? (
        <>
          <span className="absolute">
            <ProgressCircle />
          </span>
          <span className="invisible flex gap-[inherit]">{children}</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export { _Button as Button };
