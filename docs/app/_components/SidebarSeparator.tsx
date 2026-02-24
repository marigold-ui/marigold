'use client';

import { cn } from '@/lib/cn';
import {
  SidebarSeparator as FumadocsSidebarSeparator,
  useFolderDepth,
} from 'fumadocs-ui/components/sidebar/base';
import React from 'react';

//  ref: https://github.com/fuma-nama/fumadocs/blob/dev/apps/docs/content/docs/ui/layouts/docs.mdx
export const SidebarSeparator: React.FC<{
  item: { name: React.ReactNode; type: 'separator' };
}> = ({ item, ...props }) => {
  const depth = useFolderDepth();

  return (
    <FumadocsSidebarSeparator
      className={cn(
        'font-bold text-neutral-700 dark:text-neutral-300 [&_svg]:size-4 [&_svg]:shrink-0'
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
