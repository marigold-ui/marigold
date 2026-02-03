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
   * Optional preview URL to display a thumbnail image for the file.
   */
  preview?: string | null;
}

export const FileFieldItem = ({
  children,
  onRemove,
  preview,
}: FileFieldItemProps) => {
  const classNames = useClassNames({
    component: 'FileField',
  });
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');
  return (
    <div className={cn('grid', classNames.item)}>
      {preview && (
        <div className={cn('[grid-area:preview]', classNames.itemPreview)}>
          <img
            src={preview}
            alt=""
            role="presentation"
            className={classNames.itemPreviewImage}
          />
        </div>
      )}
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
