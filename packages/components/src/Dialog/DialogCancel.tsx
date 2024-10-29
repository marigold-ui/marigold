import { useContext } from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import type { ButtonProps } from '../Button/Button';
import { Button } from '../Button/Button';
import intlMessages from '../intl';

// Component
// ---------------
export const DialogCancel = ({ children, ...props }: ButtonProps) => {
  const state = useContext(OverlayTriggerStateContext)!;
  const stringFormatter = useLocalizedStringFormatter(
    intlMessages,
    '@marigold/components'
  );

  return (
    <Button variant="secondary" {...props} onPress={() => state.close()}>
      {children ?? stringFormatter.format('button.cancel')}
    </Button>
  );
};
