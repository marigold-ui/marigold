import { VisuallyHidden } from 'react-aria-components/VisuallyHidden';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { intlMessages } from '../intl/messages';

/**
 * Hidden new-tab warning (WCAG G201), rendered last so the accessible name
 * still starts with the label. Localized, unlike `AccessLabel`.
 */
export const NewTabLabel = ({ active }: { active?: boolean }) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return active ? (
    <VisuallyHidden elementType="span">
      {` ${stringFormatter.format('opensInNewTab')}`}
    </VisuallyHidden>
  ) : null;
};
