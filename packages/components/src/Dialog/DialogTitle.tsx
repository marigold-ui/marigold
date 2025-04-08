import { Header, Heading } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { HeadlineProps } from '../Headline';

export interface DialogTitleProps
  extends Pick<HeadlineProps, 'level' | 'children'> {
  children: HeadlineProps['children'];
  variant?: string;
  size?: string;
  level?: HeadlineProps['level'];
}

export const DialogTitle = ({
  level = '2',
  variant,
  size,
  children,
}: DialogTitleProps) => {
  const classNames = useClassNames({ component: 'Dialog', variant, size });
  return (
    <Header className={cn('[grid-area:title]', classNames.header)}>
      <Heading slot="title" level={Number(level)}>
        {children}
      </Heading>
    </Header>
  );
};
