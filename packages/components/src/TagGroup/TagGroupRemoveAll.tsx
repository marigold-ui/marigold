import { useContext } from 'react';
import { Button, ListStateContext } from 'react-aria-components';
import type { TagGroupProps } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { intlMessages } from '../intl/messages';

export interface TagGroupRemoveAllProps extends Pick<
  TagGroupProps,
  'onRemove'
> {
  className?: string;
}

export const TagGroupRemoveAll = ({
  className,
  onRemove,
}: TagGroupRemoveAllProps) => {
  const state = useContext(ListStateContext);
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');

  if (state && state.collection.size < 2) {
    return null;
  }

  return (
    <Button
      onPress={() => onRemove?.(new Set(state?.collection.getKeys()))}
      className={className}
    >
      {stringFormatter.format('removeAll')}
    </Button>
  );
};
