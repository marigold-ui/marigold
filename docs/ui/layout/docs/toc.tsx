'use client';
import { type TOCItemType, useActiveAnchors } from 'fumadocs-core/toc';
import { Link, List } from '@marigold/components';
import { cn } from '@marigold/system';

export const TocItem = ({ item }: { item: TOCItemType }) => {
  const isActive = useActiveAnchors().includes(item.url.slice(1));
  return (
    <div
      className={cn(
        'py-0.5',
        item.depth == 3 &&
          'border-secondary-300 hover:border-secondary-800 border-l',
        isActive && 'border-secondary-800'
      )}
    >
      <List.Item>
        <Link
          href={item.url}
          variant="toc"
          data-active={isActive}
          data-level={item.depth}
          style={{
            paddingLeft: Math.max(0, item.depth - 2) * 16,
          }}
        >
          {item.title}
        </Link>
      </List.Item>
    </div>
  );
};
