import { useClassNames } from '@marigold/system';

export interface ContextualHelpContentProps {
  children: React.ReactNode;
  variant?: string;
  size?: string;
}

export const ContextualHelpContent = ({
  children,
  variant,
  size,
}: ContextualHelpContentProps) => {
  const classNames = useClassNames({
    component: 'ContextualHelp',
    variant,
    size,
  });

  return <div className={classNames.content}>{children}</div>;
};
