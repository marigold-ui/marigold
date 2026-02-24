import { Card, Cards } from 'fumadocs-ui/components/card';
import type { ReactElement } from 'react';

export interface TeaserCardProps {
  href: string;
  icon: ReactElement<any>;
  title: string;
  caption: string;
}

export interface TeaserListProps {
  items: TeaserCardProps[];
}

export const TeaserList = ({ items }: TeaserListProps) => (
  <Cards>
    {items.map(props => (
      // eslint-disable-next-line react/prop-types
      <Card key={props.href} {...props}>
        {
          // eslint-disable-next-line react/prop-types
          props.caption
        }
      </Card>
    ))}
  </Cards>
);
