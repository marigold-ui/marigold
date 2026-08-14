import { ReactNode } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { intlMessages } from '../intl/messages';
import { CloseButton } from './../CloseButton/CloseButton';

export interface FileFieldItemProps {
  children?: ReactNode;
  /**
   * Called when the close button is pressed to remove this item.
   */
  onRemove?: () => void;

  /**
   * Accessible name for the remove button. Defaults to "Remove file", so pass
   * the file's name when you compose items yourself and rows stay
   * distinguishable to a screen reader.
   */
  removeLabel?: string;

  size?: 'default' | 'small' | (string & {});
}

export const FileFieldItem = ({
  children,
  onRemove,
  removeLabel,
  size,
}: FileFieldItemProps) => {
  const classNames = useClassNames({
    component: 'FileField',
    size,
  });
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');
  return (
    <div className={cn('grid', classNames.item)}>
      {children}
      <div className={cn('[grid-area:remove]', classNames.itemRemove)}>
        <CloseButton
          aria-label={removeLabel ?? stringFormatter.format('removeFile')}
          onPress={onRemove}
        />
      </div>
    </div>
  );
};
