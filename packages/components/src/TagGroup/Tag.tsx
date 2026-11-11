import { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Tag as RACTag } from 'react-aria-components/TagGroup';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { useTagCollapseContext, useTagGroupContext } from './Context';
import { TagGroup } from './TagGroup';

type RemovedProps = 'className' | 'style' | 'isDisabled';

// Props
// ---------------
export interface TagProps extends Omit<RAC.TagProps, RemovedProps> {
  /**
   * Visual variant of the component. Which values exist is defined by the theme
   * and listed in the "Appearance" section of the component's documentation.
   */
  variant?: string;
  /**
   * Size of the component. Which values exist is defined by the theme and listed
   * in the "Appearance" section of the component's documentation.
   */
  size?: string;
  /** Children of the component. */
  children?: ReactNode;
  /**
   * Disables the tag. Takes precedence over `disabled` on the surrounding
   * `<Tag.Group>`.
   */
  disabled?: boolean;
}

const Tag = ({
  variant,
  size,
  children,
  disabled,
  hidden,
  ...rest
}: TagProps) => {
  let textValue = typeof children === 'string' ? children : undefined;

  const classNames = useClassNames({ component: 'Tag', variant, size });
  const { disabled: groupDisabled } = useTagGroupContext();
  const { hidden: collapsed } = useTagCollapseContext();

  const props = {
    isDisabled: disabled ?? groupDisabled,
    hidden: hidden ?? collapsed,
    ...rest,
  };

  return (
    <RACTag
      textValue={textValue}
      {...props}
      className={cn('data-selection-mode:cursor-pointer', classNames.tag)}
    >
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <CloseButton className={classNames.closeButton} slot="remove" />
          )}
        </>
      )}
    </RACTag>
  );
};

Tag.Group = TagGroup;
export { Tag };
