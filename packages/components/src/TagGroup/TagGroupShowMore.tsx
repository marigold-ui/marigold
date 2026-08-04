import { Button } from 'react-aria-components/Button';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { intlMessages } from '../intl/messages';

export interface TagGroupShowMoreProps {
  className?: string;
  count: number;
  expanded: boolean;
  onPress: () => void;
}

export const TagGroupShowMore = ({
  className,
  count,
  expanded,
  onPress,
}: TagGroupShowMoreProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');

  return (
    <Button onPress={onPress} aria-expanded={expanded} className={className}>
      {expanded
        ? stringFormatter.format('showLessCount', { count: `${count}` })
        : stringFormatter.format('showMoreCount', { count: `${count}` })}
    </Button>
  );
};
