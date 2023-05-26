import React, { HTMLAttributes, ReactElement, ReactNode, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useDialog } from '@react-aria/dialog';
import type { AriaDialogProps } from '@react-types/dialog';

import { cn, useClassNames } from '@marigold/system';

import { Header } from '../Header';
import { Headline } from '../Headline';
import { DialogContextProps, useDialogContext } from './Context';
import { DialogTrigger } from './DialogTrigger';
import { DialogController } from './DialogController';

// Close Button
// ---------------
interface CloseButtonProps {
  className?: string;
}

const CloseButton = ({ className }: CloseButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { close } = useDialogContext();

  const { buttonProps } = useButton(
    {
      onPress: () => close?.(),
    },
    ref
  );

  return (
    <div className="flex justify-end">
      <button
        className={cn(
          'h-4 w-4 cursor-pointer border-none p-0 leading-normal outline-0',
          className
        )}
        ref={ref}
        {...buttonProps}
      >
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          />
        </svg>
      </button>
    </div>
  );
};

/**
 * Search for a direct child that can act as title to improve accessibility.
 */
const addTitleProps = (
  children: ReactNode,
  titleProps: HTMLAttributes<HTMLElement>
) => {
  const childs = React.Children.toArray(children);

  const titleIndex = childs.findIndex(
    child =>
      React.isValidElement(child) &&
      (child.type === Header || child.type === Headline)
  );

  // No child found that can act as title
  if (titleIndex < 0) {
    console.warn(
      'No child in <Dialog> found that can act as title for accessibility. Please add a <Header> or <Headline> as direct child.'
    );
    return children;
  }

  // If we found a child, add the titleProps to it
  const titleChild = React.cloneElement(
    childs[titleIndex] as ReactElement<any>,
    titleProps
  );
  childs.splice(titleIndex, 1, titleChild);

  return childs;
};

// Props
// ---------------
export interface DialogChildProps {
  close: DialogContextProps['close'];
  titleProps: HTMLAttributes<HTMLElement>;
}

export interface DialogProps extends AriaDialogProps {
  children?: ReactNode | ((props: DialogChildProps) => ReactNode);
  variant?: string;
  size?: string;
  closeButton?: boolean;
}

// Component
// ---------------
export const Dialog = ({
  children,
  variant,
  size,
  closeButton,
  ...props
}: DialogProps) => {
  const ref = useRef(null);
  const { close } = useDialogContext();
  const { dialogProps, titleProps } = useDialog(props, ref);

  const classNames = useClassNames({ component: 'Dialog', variant, size });

  return (
    <div className={classNames.container} {...dialogProps}>
      {closeButton && <CloseButton className={classNames.closeButton} />}
      {typeof children === 'function'
        ? children({ close, titleProps })
        : props['aria-labelledby']
        ? children
        : addTitleProps(children, titleProps)}
    </div>
  );
};

Dialog.Trigger = DialogTrigger;
Dialog.Controller = DialogController;
