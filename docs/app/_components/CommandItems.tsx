import { links, themeswitch } from '@/lib/config';
import { iterateTokens } from '@/lib/utils';
import { Icons, cn } from '@/ui';
import { Command, CommandGroup, useCommandState } from 'cmdk';
import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import ReactDOMServer from 'react-dom/server';
import { useCopyToClipboard, useDebounce } from 'react-use';

import { useRouter } from 'next/navigation';

import { Inline, Split } from '@marigold/components';
import { ExternalLink } from '@marigold/icons';

import { useThemeSwitch } from '@/ui/ThemeSwitch';
import { Theme } from '@/ui/icons/Theme';

import { Hotkey } from './SiteMenu';

interface CopyItemProps {
  children: ReactNode;
  className?: string;
  value?: string;
  keywords?: string[];
  onSelect?: (value: string) => void;
  copyValue: string;
}

interface CommandItemProps {
  classNames: {
    item: string;
    container: string;
    section: string;
  };
}

interface ChangeThemeItemProps extends CommandItemProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
interface PagesItemProps extends CommandItemProps {
  name: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setPages: Dispatch<SetStateAction<[]>>;
  subPage: string;
  items: {
    title: string;
    slug: string;
    order: number | undefined;
    headings: JSON;
  }[];
}

// Components
// ---------------
export const CopyItem = ({ children, copyValue, ...props }: CopyItemProps) => {
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

export const TokenItem = ({ classNames }: CommandItemProps) => {
  const { current, themes } = useThemeSwitch();
  if (!current) {
    return null;
  }
  const tokens = iterateTokens(themes[current].colors || {});
  return (
    <CommandGroup heading="Colors" key="color" className={classNames.section}>
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
  );
};

export const IconItem = ({ classNames }: CommandItemProps) => {
  const ref = useRef<SVGSVGElement>();
  const getIcon = (icon: keyof typeof Icons, ref: RefObject<SVGSVGElement>) => {
    const Component = Icons[icon];
    const iconElement = <Component ref={ref} />;
    const svg = ReactDOMServer.renderToString(<Component ref={ref} />);
    return { iconElement, ref, icon, svg };
  };

  const iconElements = Object.keys(Icons).map((icon: keyof typeof Icons) => {
    return getIcon(icon, ref as any);
  });
  return (
    <CommandGroup heading="Icons" key="icons" className={classNames.section}>
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
  );
};

export const ChangeThemeItem = ({
  classNames,
  setOpen,
}: ChangeThemeItemProps) => {
  const { updateTheme } = useThemeSwitch();
  const changeTheme = (theme: string) => {
    updateTheme(theme);
    setOpen(false);
  };
  return (
    <>
      {themeswitch.map(({ name, items }) => (
        <CommandGroup heading={name} key={name} className={classNames.section}>
          {items?.map(item => (
            <Command.Item
              className={classNames.item}
              key={item.name}
              value={item.name}
              keywords={['change', 'theme']}
              onSelect={() => changeTheme(item.theme)}
            >
              <Inline space={4} alignY="center">
                <span className="text-text-primary-muted text-xs">
                  <Theme />
                </span>
                {item.name}
              </Inline>
            </Command.Item>
          ))}
        </CommandGroup>
      ))}
    </>
  );
};

export const ExternalLinkItem = ({ classNames }: CommandItemProps) => (
  <>
    {links.map(({ name, items }) => (
      <CommandGroup heading={name} key={name} className={classNames.section}>
        {items.map(page => (
          <Command.Item
            className={classNames.item}
            key={page.href}
            value={page.href}
            onSelect={() => window.open(page.href, '_blank')}
            keywords={page.keywords}
          >
            <Inline space={4} alignY="center">
              <span className="text-text-primary-muted text-xs">
                <ExternalLink />
              </span>
              {page.name}
            </Inline>
          </Command.Item>
        ))}
      </CommandGroup>
    ))}
  </>
);

export const PagesItem = ({
  classNames,
  items,
  name,
  setOpen,
  subPage,
  setPages,
}: PagesItemProps) => {
  const router = useRouter();
  const goto = (slug: string) => {
    router.push(`/${slug}`);
    setOpen(false);
    setPages([]);
  };
  return (
    <CommandGroup heading={name} key={name} className={classNames.section}>
      {items.map(page => (
        <>
          <Command.Item
            className={cn(classNames.item, 'group')}
            key={page.slug}
            value={page.slug}
            onSelect={() => goto(page.slug)}
          >
            <Inline space={4} alignY="center">
              {page.title}
              <Split />
              <Hotkey letter="D" className="hidden group-aria-selected:block" />
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
  );
};
