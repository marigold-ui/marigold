import { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Button, Tag } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { TagGroup } from './TagGroup';

interface CloseButtonProps {
  className: string;
}

export const CloseButton = ({ className }: CloseButtonProps) => {
  return (
    <Button slot="remove" className={className}>
      <svg viewBox="0 0 20 20" fill="currentColor" width={20} height={20}>
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
      </svg>
    </Button>
  );
};

type RemovedProps = 'className' | 'style' | 'isDisabled';

// Props
// ---------------
export interface TagProps extends Omit<RAC.TagProps, RemovedProps> {
  variant?: string;
  size?: string;
  children?: ReactNode;
  disabled?: boolean;
}

const _Tag = ({ variant, size, children, disabled, ...rest }: TagProps) => {
  let textValue = typeof children === 'string' ? children : undefined;

  const classNames = useClassNames({ component: 'Tag', variant, size });

  const props = {
    isDisabled: disabled,
    ...rest,
  };

  return (
    <Tag
      textValue={textValue}
      {...props}
      className={cn('data-selection-mode:cursor-pointer', classNames.tag)}
    >
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <CloseButton
              className={cn('flex items-center', classNames.closeButton)}
            />
          )}
        </>
      )}
    </Tag>
  );
};

_Tag.Group = TagGroup;
export { _Tag as Tag };
