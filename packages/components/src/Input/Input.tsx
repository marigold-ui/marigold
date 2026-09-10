import { ReactElement, Ref } from 'react';
import type RAC from 'react-aria-components';
import { Input } from 'react-aria-components/Input';
import { cn, useClassNames } from '@marigold/system';

// Props
// ---------------
type RemovedProps = 'className' | 'style' | 'size';

export interface InputProps extends Omit<RAC.InputProps, RemovedProps> {
  icon?: ReactElement<any>;
  action?: ReactElement<any>;
  variant?: string;
  size?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
}

const _Input = ({
  type,
  icon,
  action,
  variant,
  size,
  className,
  ref,
  ...props
}: InputProps) => {
  const classNames = useClassNames({
    component: 'Input',
    variant,
    size,
  });

  return (
    <div
      className={cn(
        'group/input relative flex w-(--field-width) max-w-full min-w-0 items-center'
      )}
      data-icon={icon && ''}
      data-action={action && ''}
    >
      <Input
        {...props}
        className={cn(
          'flex-1',
          'disabled:cursor-not-allowed',
          '[&[type=file]]:border-none [&[type=file]]:p-0',
          '[&[type=color]]:ml-0 [&[type=color]]:border-none [&[type=color]]:bg-transparent [&[type=color]]:p-0',
          classNames.input,
          className
        )}
        ref={ref}
        type={type}
      />
      {icon && (
        <span
          className={cn(
            'pointer-events-none absolute *:size-full',
            classNames.icon
          )}
        >
          {icon}
        </span>
      )}
      {action && !props.readOnly && (
        <span
          className={cn(
            'absolute *:flex *:size-full *:cursor-pointer *:items-center *:justify-center',
            classNames.action
          )}
        >
          {action}
        </span>
      )}
    </div>
  );
};

export { _Input as Input };
