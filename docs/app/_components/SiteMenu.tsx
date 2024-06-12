'use client';

import { links, themeswitch } from '@/lib/commandlist';
import { siteConfig } from '@/lib/config';
import { iterateTokens } from '@/lib/utils';
import { Button, Dialog, Icons, Inline, Split, cn, useClassNames } from '@/ui';
import { Command, CommandGroup, useCommandState } from 'cmdk';
import { allContentPages } from 'contentlayer/generated';
import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOMServer from 'react-dom/server';
import { useCopyToClipboard, useDebounce } from 'react-use';

import { useRouter } from 'next/navigation';

import { ExternalLink, Search } from '@marigold/icons';

import { useThemeSwitch } from '@/ui/ThemeSwitch';
import { Theme } from '@/ui/icons/Theme';
import { useHasMounted } from '@/ui/useHasMounted';

// Helpers
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
      className="placeholder:text-text-primary-muted h-11 w-full bg-transparent outline-none"
      onKeyDown={e => {
        if (e.metaKey && e.key === 'd') {
          e.preventDefault();
          onHandlePages(slug);
        }
      }}
    />
  );
};

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
}
const Hotkey = ({ letter }: HotKeyProps) => {
  const mounted = useHasMounted();
  if (!mounted) {
    return null;
  }
  const isMacOS = window.navigator.userAgent.includes('Mac OS');
  return (
    <span className="opacity-50">
      ({isMacOS ? '⌘' : 'Ctrl+'}
      {letter})
    </span>
  );
};

// Component
// ---------------
interface CopyItemProps {
  children: ReactNode;
  className?: string;
  value?: string;
  keywords?: string[];
  onSelect?: (value: string) => void;
  copyValue: string;
}

const CopyItem = ({ children, copyValue, ...props }: CopyItemProps) => {
  const search = useCommandState(state => state.search);
  const [isCopied, setCopy] = useState(false);
  const [, setCopied] = useCopyToClipboard();
  const [isReady, cancel] = useDebounce(() => setCopy(false), 2000, [isCopied]);
  const copy = (value: string) => {
    if (isReady()) {
      cancel();
    }
    setCopy(true);
    setCopied(value);
  };

  if (!search) return null;
  return (
    <Command.Item onSelect={() => copy(copyValue)} {...props}>
      <Inline space={4} alignY="center">
        {children}
        <Split />
        <span className="text-text-primary-muted text-xs">
          {isCopied ? 'COPIED!' : 'COPY ICON'}
        </span>
      </Inline>
    </Command.Item>
  );
};

export const SiteMenu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<SVGSVGElement>();

  const [pages, setPages] = useState(['']);
  const subPage = pages[pages.length - 1];

  const handlePages = (slug: string) => {
    setPages([...pages, slug]);
  };

  const goto = (slug: string) => {
    router.push(`/${slug}`);
    setOpen(false);
    setPages([]);
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
  }, [pages]);

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
              setPages(pages => pages.slice(0, -1));
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
                  <>
                    <Command.Item
                      className={classNames.item}
                      key={page.slug}
                      value={page.slug}
                      onSelect={() => goto(page.slug)}
                    >
                      <Inline space={4} alignY="center">
                        {page.title}
                        <Split />
                        <Hotkey letter="D" />
                      </Inline>
                    </Command.Item>
                    {subPage === page.slug && (
                      <>
                        {Object.values(page.headings).map(
                          (sub: { slug: string; text: string }) => (
                            <Command.Item
                              value={`${page.slug}${sub.slug}`}
                              className={cn(
                                'text-text-primary-muted ml-7',
                                classNames.item
                              )}
                              onSelect={() => goto(`${page.slug}#${sub.slug}`)}
                            >
                              {sub.text}
                            </Command.Item>
                          )
                        )}
                      </>
                    )}
                  </>
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
                      <span className="text-text-primary-muted text-xs">
                        <ExternalLink />
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
                  <CopyItem
                    className={classNames.item}
                    key={token}
                    value={token}
                    keywords={['copy']}
                    copyValue={token.replace('-DEFAULT', '')}
                  >
                    {token.replace('-DEFAULT', '')}
                  </CopyItem>
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
                  <CopyItem
                    key={elements.icon}
                    value={elements.icon}
                    keywords={['copy']}
                    className={classNames.item}
                    copyValue={elements.svg}
                  >
                    {elements.iconElement}
                    {elements.icon}
                  </CopyItem>
                ))}
              </CommandGroup>
            )}
          </Command.List>
          <div className="flex h-10 items-center justify-end gap-4 border-t px-2">
            <div>
              Action <span className="opacity-50">↵</span>
            </div>
            <div>
              More Details <Hotkey letter="D" />
            </div>
          </div>
        </Command>
      </Dialog>
    </Dialog.Trigger>
  );
};
