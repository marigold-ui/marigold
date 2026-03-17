import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useClassNames } from '@marigold/system';
import { intlMessages } from '../intl/messages';

export const Ellipsis = () => {
  const { ellipsis } = useClassNames({
    component: 'Pagination',
  });
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <span
      className={ellipsis}
      aria-label={stringFormatter.format('hiddenPages')}
    >
      &hellip;
    </span>
  );
};
