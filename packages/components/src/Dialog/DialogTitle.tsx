import { Header } from '../Header';
import { Headline, HeadlineProps } from '../Headline';

export interface DialogTitleProps extends Omit<HeadlineProps, 'slot'> {}

export const DialogTitle = ({ level = '2', children }: DialogTitleProps) => (
  <Header className="flex items-center [grid-area:title]">
    <Headline slot="title" level={level}>
      {children}
    </Headline>
  </Header>
);
