import { Card, Stack, Tiles } from '@/ui';
import type { ReactElement } from 'react';
import Link from 'next/link';

export interface TeaserCardProps {
  href: string;
  icon: ReactElement;
  title: string;
  caption: string;
}

export const TeaserCard = ({ href, icon, title, caption }: TeaserCardProps) => (
  <Link className="flex no-underline" href={href}>
    <Card variant="hovering">
      <Stack space={4}>
        <div className="bg-bg-muted grid size-12 place-items-center rounded-full p-2">
          {icon}
        </div>
        <div className="text-2xl font-semibold tracking-tight">{title}</div>
        <div className="text-text-primary-muted text-sm">{caption}</div>
      </Stack>
    </Card>
  </Link>
);

export interface TeaserListProps {
  items: TeaserCardProps[];
}

export const TeaserList = ({ items }: TeaserListProps) => (
  <Tiles tilesWidth="300px" space={5} stretch>
    {items.map(props => (
      <TeaserCard {...props} />
    ))}
  </Tiles>
);
