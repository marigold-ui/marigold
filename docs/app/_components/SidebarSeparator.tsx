'use client';

import {
  SidebarSeparator as FumadocsSidebarSeparator,
  useFolderDepth,
} from 'fumadocs-ui/components/sidebar/base';
import React from 'react';
import { cn } from '@marigold/system';

//  ref: https://github.com/fuma-nama/fumadocs/blob/dev/apps/docs/content/docs/ui/layouts/docs.mdx
export const SidebarSeparator: React.FC<{
  item: { name: React.ReactNode; type: 'separator' };
}> = ({ item, ...props }) => {
  const depth = useFolderDepth();

  return (
    <FumadocsSidebarSeparator
      className={cn(
        // A category label is not a nav item: own type scale (smaller, caps,
        // tracked, full contrast) instead of a bolder item.
        'text-fd-foreground text-[0.6875rem] font-semibold tracking-[0.09em] uppercase',
        // Asymmetric space instead of a divider: the label belongs to the group
        // below it, and is pushed away from the group above.
        'mt-7 mb-1 py-1 first:mt-1',
        '[&_svg]:size-4 [&_svg]:shrink-0'
      )}
      style={{
        paddingInlineStart: `calc(${2 + 3 * depth} * var(--spacing))`,
      }}
      {...props}
    >
      {item.name}
    </FumadocsSidebarSeparator>
  );
};
