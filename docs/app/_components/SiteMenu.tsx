'use client';

import { siteConfig } from '@/lib/config';
import { Button, Dialog } from '@/ui';
import { Command, CommandGroup } from 'cmdk';
import { allContentPages } from 'contentlayer/generated';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Search } from '@marigold/icons';

import { useHasMounted } from '@/ui/useHasMounted';

// Helpers
// ---------------
const groupedPages = siteConfig.navigation.map(({ name, slug }) => {
  const items = allContentPages
    .filter(page => page.slug.includes(slug))
    .map(({ title, slug, order }) => ({ title, slug, order }));

  // sort by order if it's defiened, otherwise sort alphabettically
  items.sort((a, b) => {
    if (typeof a.order === 'number' && typeof b.order === 'number') {
      return a.order - b.order;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return { name, slug, items };
});

const Hotkey = () => {
  const mounted = useHasMounted();

  if (!mounted) {
    return null;
  }

  const isMacOS = window.navigator.userAgent.includes('Mac OS');

  return (
    <kbd className="hidden h-5 w-10 items-center justify-center rounded-md text-xs lg:inline-flex lg:border lg:border-gray-300 lg:bg-gray-200">
      <span className="text-xs">{isMacOS ? '⌘' : 'Ctrl+'}</span>K
    </kbd>
  );
};

// Component
// ---------------
export const SiteMenu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const goto = (slug: string) => {
    router.push(`/${slug}`);
    setOpen(false);
  };

  // register global cmd+k hotkey
  useEffect(() => {
    const onPress = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keypress', onPress);
    return () => document.removeEventListener('keypress', onPress);
  }, []);

  return (
    <Dialog.Trigger open={open} onOpenChange={setOpen} dismissable>
      <Button variant="sunken" size="small" onPress={() => setOpen(true)}>
        <span className="hidden xl:inline-flex ">Search documentation...</span>
        <span className="inline-flex xl:hidden ">Search...</span>
        <Hotkey />
      </Button>
      <Dialog aria-label="Global Command Menu">
        <Command className="bg-bg-surface text-popover-foreground [&_[cmdk-group-heading]]:text-secondary-400 [&_[cmdk-list-sizer]]:divide-secondary-100 flex size-full w-[500px] flex-col overflow-hidden rounded-md [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2.5 [&_[cmdk-item]]:py-2 [&_[cmdk-item]_svg]:size-5 [&_[cmdk-list-sizer]]:divide-y">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 size-4 shrink-0 opacity-50"></Search>
            <Command.Input
              value={query}
              autoFocus
              onValueChange={setQuery}
              placeholder="Type to search ..."
              className="placeholder:text-text-primary-muted flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thumb-rounded-full max-h-[300px] overflow-y-auto overflow-x-hidden">
            <Command.Empty className="py-6 text-center text-sm">
              No results found.
            </Command.Empty>
            {groupedPages.map(({ name, items }) => (
              <CommandGroup
                heading={name}
                key={name}
                className="text-secondary-600 [&_[cmdk-group-heading]]:text-text-primary-muted overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium"
              >
                {items.map(page => (
                  <Command.Item
                    className="aria-selected:bg-bg-hover aria-selected:text-text-primary relative flex cursor-default select-none flex-col rounded px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                    key={page.slug}
                    value={page.slug}
                    onSelect={() => goto(page.slug)}
                  >
                    {page.title}
                  </Command.Item>
                ))}
              </CommandGroup>
            ))}
          </Command.List>
        </Command>
      </Dialog>
    </Dialog.Trigger>
  );
};
