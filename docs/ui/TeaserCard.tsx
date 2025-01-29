import { Card, Stack, Tiles } from '@/ui';
import type { ReactElement } from 'react';
import Link from 'next/link';

export interface TeaserCardProps {
  href: string;
  icon: ReactElement<any>;
  title: string;
  caption: string;
}

export const TeaserCard = ({ href, icon, title, caption }: TeaserCardProps) => (
  <Link className="flex no-underline" href={href}>
    <Card variant="hovering">
      <Stack space={4}>
        <div className="grid size-12 place-items-center rounded-full bg-(--color-bg-muted) p-2">
          {icon}
        </div>
        <div className="text-2xl font-semibold tracking-tight">{title}</div>
        <div className="text-sm text-(--color-text-primary-muted)">
          {caption}
        </div>
      </Stack>
    </Card>
  </Link>
);

export interface TeaserListProps {
  items: TeaserCardProps[];
}

export const TeaserList = ({ items }: TeaserListProps) => (
  <Tiles tilesWidth="340px" space={5} equalHeight>
    {items.map(props => (
      <TeaserCard key={props.href} {...props} />
    ))}
  </Tiles>
);
