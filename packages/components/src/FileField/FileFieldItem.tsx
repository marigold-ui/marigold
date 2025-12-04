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
}

export const FileFieldItem = ({ children, onRemove }: FileFieldItemProps) => {
  const classNames = useClassNames({
    component: 'FileField',
  });
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');
  return (
    <div className={cn('grid', classNames.item)}>
      {children}
      <div className={cn('[grid-area:remove]', classNames.itemRemove)}>
        <CloseButton
          aria-label={stringFormatter.format('removeFile')}
          onPress={onRemove}
        />
      </div>
    </div>
  );
};
