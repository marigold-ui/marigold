import { Header, Heading } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

export interface DrawerTitleProps {
  variant?: string;
  size?: string;
  /**
   * Sets heading level, h1 through h6.
   * @default "2"
   */
  level?: '1' | '2' | '3' | '4' | '5' | '6';

  /**
   * Children of the component.
   */
  children?: React.ReactNode;
}

export const DrawerTitle = ({
  level = '2',
  variant,
  size,
  children,
}: DrawerTitleProps) => {
  const classNames = useClassNames({ component: 'Drawer', variant, size });
  return (
    <Header className={cn('[grid-area:title]', classNames.header)}>
      <Heading slot="title" level={Number(level)} className={classNames.title}>
        {children}
      </Heading>
    </Header>
  );
};
