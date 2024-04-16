import { Card, Stack, Tiles } from '@/ui';
import type { ReactElement } from 'react';

export interface TeaserCardProps {
  icon: ReactElement;
  title: string;
  caption: string;
}

export const TeaserCard = ({ icon, title, caption }: TeaserCardProps) => (
  <Card variant="condensed">
    <Stack space={4}>
      <div className="bg-bg-muted grid size-12 place-items-center rounded-full p-2">
        {icon}
      </div>
      <div className="text-2xl font-semibold tracking-tight">{title}</div>
      <div className="text-text-primary-muted text-sm">{caption}</div>
    </Stack>
  </Card>
);

export interface TeaserListProps {
  items: TeaserCardProps[];
}

export const TeaserList = ({ items }: TeaserListProps) => (
  <Tiles tilesWidth="300px" space={4} stretch>
    {items.map(props => (
      <TeaserCard {...props} />
    ))}
  </Tiles>
);
