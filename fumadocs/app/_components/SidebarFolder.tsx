'use client';
import { usePathname } from 'fumadocs-core/framework';
import type * as PageTree from 'fumadocs-core/page-tree';
import {
  SidebarFolder as BaseSidebarFolder,
  SidebarFolderContent as BaseSidebarFolderContent,
  SidebarFolderLink as BaseSidebarFolderLink,
  SidebarFolderTrigger as BaseSidebarFolderTrigger,
  useFolder,
  useFolderDepth,
} from 'fumadocs-ui/components/sidebar/base';
import { ComponentProps, type ReactNode } from 'react';
import { cva } from '@marigold/system';
import { cn } from '@marigold/system';

const itemVariants = cva({
  base: 'relative flex flex-row items-center gap-2 rounded-lg p-2 text-start text-fd-muted-foreground wrap-anywhere [&_svg]:size-4 [&_svg]:shrink-0',
  variants: {
    variant: {
      link: 'transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary data-[active=true]:hover:transition-colors',
      button:
        'transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none',
    },
    highlight: {
      true: "data-[active=true]:before:content-[''] data-[active=true]:before:bg-fd-primary data-[active=true]:before:absolute data-[active=true]:before:w-px data-[active=true]:before:inset-y-2.5 data-[active=true]:before:start-2.5",
    },
  },
});

const getItemOffset = (depth: number) => {
  return `calc(${2 + 3 * depth} * var(--spacing))`;
};

// Styled wrapper for SidebarFolderLink
const StyledSidebarFolderLink = ({
  className,
  style,
  ...props
}: ComponentProps<typeof BaseSidebarFolderLink>) => {
  const depth = useFolderDepth();

  return (
    <BaseSidebarFolderLink
      className={cn(
        itemVariants({ variant: 'link', highlight: depth > 1 }),
        'w-full',
        className
      )}
      style={{
        paddingInlineStart: getItemOffset(depth - 1),
        ...style,
      }}
      {...props}
    />
  );
};

// Styled wrapper for SidebarFolderTrigger
const StyledSidebarFolderTrigger = ({
  className,
  style,
  ...props
}: ComponentProps<typeof BaseSidebarFolderTrigger>) => {
  const { depth, collapsible } = useFolder()!;

  return (
    <BaseSidebarFolderTrigger
      className={cn(
        itemVariants({ variant: collapsible ? 'button' : null }),
        'w-full',
        className
      )}
      style={{
        paddingInlineStart: getItemOffset(depth - 1),
        ...style,
      }}
      {...props}
    />
  );
};

// Styled wrapper for SidebarFolderContent
const StyledSidebarFolderContent = ({
  className,
  children,
  ...props
}: ComponentProps<typeof BaseSidebarFolderContent>) => {
  const depth = useFolderDepth();

  return (
    <BaseSidebarFolderContent
      className={cn(
        'relative',
        depth === 1 &&
          "before:bg-fd-border before:absolute before:inset-y-1 before:start-2.5 before:w-px before:content-['']",
        className
      )}
      {...props}
    >
      {children}
    </BaseSidebarFolderContent>
  );
};

export const SidebarFolder = ({
  children,
  item,
  ...props
}: ComponentProps<'div'> & {
  item: PageTree.Folder;
  children: ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = item.index ? pathname === item.index.url : false;

  if (item.index) {
    return (
      <BaseSidebarFolder
        collapsible={false}
        defaultOpen={true}
        active={isActive}
        {...props}
      >
        <StyledSidebarFolderLink
          href={item.index.url}
          external={item.index.external}
        >
          {item.icon}
          {item.name}
        </StyledSidebarFolderLink>
        <StyledSidebarFolderContent>{children}</StyledSidebarFolderContent>
      </BaseSidebarFolder>
    );
  }

  // Regular folder without index file - render as collapsible folder
  return (
    <BaseSidebarFolder
      collapsible={item.collapsible}
      defaultOpen={item.defaultOpen}
      {...props}
    >
      <StyledSidebarFolderTrigger>
        {item.icon}
        {item.name}
      </StyledSidebarFolderTrigger>
      <StyledSidebarFolderContent>{children}</StyledSidebarFolderContent>
    </BaseSidebarFolder>
  );
};
