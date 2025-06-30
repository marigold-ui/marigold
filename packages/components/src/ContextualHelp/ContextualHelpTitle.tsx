import { Heading } from 'react-aria-components';
import { useClassNames } from '@marigold/system';

export interface ContextualHelpTitleProps {
  children: React.ReactNode;
  variant?: string;
  size?: string;
}

export const ContextualHelpTitle = ({
  children,
  variant,
  size,
}: ContextualHelpTitleProps) => {
  const classNames = useClassNames({
    component: 'ContextualHelp',
    variant,
    size,
  });

  return <Heading className={classNames.title}>{children}</Heading>;
};
