'use client';

import { siteConfig } from '@/lib/config';
import { Button, Dialog, Inline, cn, useClassNames } from '@/ui';
import { track } from '@vercel/analytics/react';
import { Command, useCommandState } from 'cmdk';
import { allContentPages } from 'contentlayer/generated';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Search } from '@marigold/icons';
import { useHasMounted } from '@/ui/useHasMounted';
import {
  ExternalLinkItem,
  IconItem,
  InternalPage,
  PagesItem,
  TokenItem,
} from './CommandItems';

// Helpers
// ---------------
const groupedPages = siteConfig.navigation.map(({ name, slug }) => {
  const items = allContentPages
    .filter(page => page.slug.includes(slug))
    .filter(page => page.headings)
    .map(({ title, slug, order, headings }) => ({
      title,
      slug,
      order,
      headings,
    }));

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

interface HotKeyProps {
  letter: string;
  className?: string;
}
export const Hotkey = ({ letter, className }: HotKeyProps) => {
  const mounted = useHasMounted();
  if (!mounted) {
    return null;
  }
  const isMacOS = window.navigator.userAgent.includes('Mac OS');
  return (
    <span className={cn('opacity-50', className)} aria-hidden="true">
      ({isMacOS ? '⌘' : 'Ctrl+'}
      {letter})
    </span>
  );
};

// Components
// ---------------
interface CustomInputProps {
  value: string;
  onValueChange: Dispatch<SetStateAction<string>>;
  onHandlePages: (val: string) => void;
}

const CustomInput = ({
  value,
  onValueChange,
  onHandlePages,
}: CustomInputProps) => {
  const slug = useCommandState(state => state.value);

  return (
    <Command.Input
      value={value}
      onValueChange={onValueChange}
      autoFocus
      placeholder="Type to search ..."
      className="placeholder:text-text-primary-muted h-11 w-full bg-transparent outline-hidden"
      onKeyDown={e => {
        if (e.metaKey && e.key === 'd') {
          e.preventDefault();
          onHandlePages(slug);
        }
      }}
      onFocus={e => e.target.select()}
    />
  );
};

export const SiteMenu = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const [pages, setPages] = useState(['']);
  const subPage = pages[pages.length - 1];

  const handlePages = (slug: string) => {
    setPages([...pages, slug]);
  };

  // register global cmd+k hotkey
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
        if (open) {
          track('Use cmkd');
        }
      }
    };

    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [pages, open]);

  const classNames = useClassNames({ component: 'Menu', variant: 'command' });
  const onPress = () => {
    setOpen(true);
    track('Use cmkd');
  };

  return (
    <Dialog.Trigger open={open} onOpenChange={setOpen} dismissable>
      <Button variant="sunken" size="small" onPress={onPress}>
        Search...
        <Hotkey letter="K" />
      </Button>
      <Dialog aria-label="Global Command Menu">
        <Command
          className={classNames.container}
          filter={(value, query, keywords) => {
            const searchValue = `${value} ${keywords}`;
            if (searchValue.toLowerCase().includes(query.toLowerCase()))
              return 1;
            return 0;
          }}
          onKeyDown={e => {
            if (e.key === 'Escape' || (e.key === 'Backspace' && !query)) {
              e.preventDefault();
              setOpen(false);
              setPages([]);
            }
          }}
        >
          <div className="flex items-center gap-1.5 border-b px-3">
            <Search className="size-4 opacity-50" />
            <CustomInput
              value={query}
              onValueChange={setQuery}
              onHandlePages={handlePages}
            />
          </div>
          <Command.List className="scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thumb-rounded-full max-h-[300px] overflow-x-hidden overflow-y-auto">
            <Command.Empty className="py-6 text-center text-sm">
              No results found.
            </Command.Empty>
            {/* pages and subpages command */}
            {groupedPages.map(({ name, items }) => (
              <PagesItem
                key={name}
                name={name}
                items={items}
                classNames={classNames}
                setOpen={setOpen}
                setPages={setPages}
                subPage={subPage}
              />
            ))}
            {/* external links command */}
            <ExternalLinkItem classNames={classNames} />
            {/* tokens copy command */}
            {query && <TokenItem classNames={classNames} />}
            {/* copy icon command */}
            {query && <IconItem classNames={classNames} />}
            {query.length > 6 && (
              <InternalPage classNames={classNames} setOpen={setOpen} />
            )}
          </Command.List>
          <div className="flex h-10 items-center justify-end gap-4 border-t px-2 text-xs">
            <Inline space={2} alignY="center">
              Go
              <span className="border-border-inverted bg-secondary-400/10 rounded-xs border p-1 opacity-50">
                ↵
              </span>
            </Inline>
            <Inline space={2} alignY="center">
              Expand
              <Hotkey
                letter="D"
                className="border-border-inverted bg-secondary-400/10 rounded-xs border p-1"
              />
            </Inline>
          </div>
        </Command>
      </Dialog>
    </Dialog.Trigger>
  );
};
