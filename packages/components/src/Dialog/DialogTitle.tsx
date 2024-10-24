import { cn, useClassNames } from '@marigold/system';
import { Header } from '../Header';
import { Headline, HeadlineProps } from '../Headline';

export interface DialogTitleProps extends Omit<HeadlineProps, 'slot'> {
  variant?: string;
  size?: string;
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
      <Headline slot="title" level={level}>
        {children}
      </Headline>
    </Header>
  );
};
