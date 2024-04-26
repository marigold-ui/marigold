'use client';

import { siteConfig } from '@/lib/config';
import { Button, Dialog, useClassNames } from '@/ui';
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

  return <span className="opacity-50">({isMacOS ? '⌘' : 'Ctrl+'}K)</span>;
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
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, []);

  const classNames = useClassNames({ component: 'Menu', variant: 'command' });

  return (
    <Dialog.Trigger open={open} onOpenChange={setOpen} dismissable>
      <Button variant="sunken" size="small" onPress={() => setOpen(true)}>
        Search...
        <Hotkey />
      </Button>
      <Dialog aria-label="Global Command Menu">
        <Command className={classNames.container}>
          <div className="flex items-center gap-1.5 border-b px-3">
            <Search className="size-4 opacity-50"></Search>
            <Command.Input
              value={query}
              autoFocus
              onValueChange={setQuery}
              placeholder="Type to search ..."
              className="placeholder:text-text-primary-muted h-11 w-full bg-transparent outline-none"
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
                className={classNames.section}
              >
                {items.map(page => (
                  <Command.Item
                    className={classNames.item}
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
