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
      <Card key={props.href} {...props}>
        {props.caption}
      </Card>
    ))}
  </Cards>
);
