import { Button, type ButtonProps } from 'react-aria-components/Button';
import { Heading, type HeadingProps } from 'react-aria-components/Heading';
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
