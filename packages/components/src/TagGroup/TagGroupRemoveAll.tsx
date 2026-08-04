import { use } from 'react';
import { ListStateContext } from 'react-aria-components/ListBox';
import type { TagGroupProps } from 'react-aria-components/TagGroup';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { Button } from '../Button/Button';
import { intlMessages } from '../intl/messages';

export type TagGroupRemoveAllProps = Pick<TagGroupProps, 'onRemove'>;

export const TagGroupRemoveAll = ({ onRemove }: TagGroupRemoveAllProps) => {
  const state = use(ListStateContext);
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');

  if (state && state.collection.size < 2) {
    return null;
  }

  return (
    <Button onPress={() => onRemove?.(new Set(state?.collection.getKeys()))}>
      {stringFormatter.format('removeAll')}
    </Button>
  );
};
