'use client';

import { links, themeswitch } from '@/lib/commandlist';
import { siteConfig } from '@/lib/config';
import { iterateTokens } from '@/lib/utils';
import { Button, Dialog, Icons, Inline, Split, useClassNames } from '@/ui';
import { Command, CommandGroup, useCommandState } from 'cmdk';
import { allContentPages } from 'contentlayer/generated';
import { RefObject, useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useCopyToClipboard, useDebounce } from 'react-use';

import { useRouter } from 'next/navigation';

import { ExternalLink, Search } from '@marigold/icons';

import { CopyButton } from '@/ui/CopyButton';
import { useThemeSwitch } from '@/ui/ThemeSwitch';
import { Theme } from '@/ui/icons/Theme';
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

const SubItem = ({ ...props }) => {
  const search = useCommandState(state => state.search);
  if (!search) return null;
  return <Command.Item {...props} />;
};

export const SiteMenu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<SVGSVGElement>();

  const goto = (slug: string) => {
    router.push(`/${slug}`);
    setOpen(false);
  };

  const { updateTheme } = useThemeSwitch();
  const changeTheme = (theme: string) => {
    updateTheme(theme);
    setOpen(false);
  };

  const getIcon = (icon: keyof typeof Icons, ref: RefObject<SVGSVGElement>) => {
    const Component = Icons[icon];
    const iconElement = <Component ref={ref} />;
    const svg = ReactDOMServer.renderToString(<Component ref={ref} />);
    return { iconElement, ref, icon, svg };
  };

  const iconElements = Object.keys(Icons).map((icon: keyof typeof Icons) => {
    return getIcon(icon, ref as any);
  });

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
  const { current, themes } = useThemeSwitch();
  if (!current) {
    return null;
  }
  const tokens = iterateTokens(themes[current].colors || {});

  return (
    <Dialog.Trigger open={open} onOpenChange={setOpen} dismissable>
      <Button variant="sunken" size="small" onPress={() => setOpen(true)}>
        Search...
        <Hotkey />
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
        >
          <div className="flex items-center gap-1.5 border-b px-3">
            <Search className="size-4 opacity-50" />
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
            {/* update themes command */}
            {themeswitch.map(({ name, items }) => (
              <CommandGroup
                heading={name}
                key={name}
                className={classNames.section}
              >
                {items.map(item => (
                  <Command.Item
                    className={classNames.item}
                    key={item.name}
                    value={item.name}
                    keywords={['change', 'theme']}
                    onSelect={() => changeTheme(item.theme)}
                  >
                    <Inline space={4} alignY="center">
                      {item.name}
                      <Split />
                      <span className="text-text-primary-muted text-xs">
                        <Theme />
                      </span>
                    </Inline>
                  </Command.Item>
                ))}
              </CommandGroup>
            ))}
            {/* links command */}
            {links.map(({ name, items }) => (
              <CommandGroup
                heading={name}
                key={name}
                className={classNames.section}
              >
                {items.map(page => (
                  <Command.Item
                    className={classNames.item}
                    key={page.href}
                    value={page.href}
                    onSelect={() => window.open(page.href, '_blank')}
                    keywords={page.keywords}
                  >
                    <Inline space={4} alignY="center">
                      {page.name}
                      <Split />
                      <span className="text-xs">
                        <ExternalLink color="text-primary-muted" />
                      </span>
                    </Inline>
                  </Command.Item>
                ))}
              </CommandGroup>
            ))}
            {/* tokens copy command */}
            {query && (
              <CommandGroup
                heading="Colors"
                key="color"
                className={classNames.section}
              >
                {tokens.map(([token]) => (
                  <SubItem
                    className={classNames.item}
                    key={token}
                    value={token}
                    keywords={['copy']}
                  >
                    <Inline space={4} alignY="center">
                      {token.replace('-DEFAULT', '')}
                      <Split />
                      <span>
                        <CopyButton
                          variant="invertedCopy"
                          codeString={token.replace('-DEFAULT', '')}
                        />
                      </span>
                    </Inline>
                  </SubItem>
                ))}
              </CommandGroup>
            )}
            {/* copy icon command */}
            {query && (
              <CommandGroup
                heading="Icons"
                key="icons"
                className={classNames.section}
              >
                {Object.values(iconElements).map(elements => (
                  <SubItem
                    key={elements.icon}
                    value={elements.icon}
                    keywords={['copy', 'icons']}
                    className={classNames.item}
                  >
                    <Inline space={4} alignY="center">
                      {elements.iconElement}
                      {elements.icon}
                      <Split />
                      <span>
                        <CopyButton
                          variant="invertedCopy"
                          codeString={elements.svg}
                        />
                      </span>
                    </Inline>
                  </SubItem>
                ))}
              </CommandGroup>
            )}
          </Command.List>
        </Command>
      </Dialog>
    </Dialog.Trigger>
  );
};
