import type { ButtonProps, HeadingProps } from 'react-aria-components';
import { Button, Heading } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { CollapsibleContext } from './Context';

export interface CollapsibleProps
  extends
    Omit<ButtonProps, 'className' | 'style'>,
    Pick<HeadingProps, 'level'> {
  variant?: 'default' | 'link' | (string & {});
  size?: 'default' | (string & {});
}

export const CollapsibleTrigger = ({
  variant,
  size,
  children,
  level,
  ...props
}: CollapsibleProps) => {
  const classNames = useClassNames({
    component: 'Collapsible',
    variant,
    size,
    context: CollapsibleContext,
  });
  return (
    <Heading level={level}>
      <Button {...props} slot="trigger" className={classNames.trigger}>
        {children}
      </Button>
    </Heading>
  );
};
