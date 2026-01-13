import { internal, links } from '@/lib/config';
import { iterateTokens } from '@/lib/utils';
import { ruiTheme } from '@/theme';
import { Icons, cn } from '@/ui';
import { Command, CommandGroup, useCommandState } from 'cmdk';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useCopyToClipboard, useDebounce } from 'react-use';
import { useRouter } from 'next/navigation';
import { Inline, Split } from '@marigold/components';
import { ExternalLink } from '@marigold/icons';
import { NestedStringObject } from '@marigold/system';
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

interface ChangeOpenItemProps extends CommandItemProps {
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

// Helpers
//----------------
const useGoto = (
  setOpen: Dispatch<SetStateAction<boolean>>,
  setPages?: Dispatch<SetStateAction<[]>>
) => {
  const router = useRouter();

  const goto = ({ slug, hash = '' }: { slug: string; hash?: string }) => {
    const url = `/${slug}${hash}`;

    router.push(url);
    setOpen(false);
    if (setPages) {
      setPages([]);
    }
  };

  return goto;
};

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
  const tokens = iterateTokens(ruiTheme.colors as NestedStringObject);
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
  const getIcon = (icon: keyof typeof Icons) => {
    const Component = Icons[icon];
    const iconElement = <Component />;
    const svg = ReactDOMServer.renderToString(<Component />);
    return { iconElement, icon, svg };
  };

  const iconElements = Object.keys(Icons).map((icon: keyof typeof Icons) => {
    return getIcon(icon);
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
  const goto = useGoto(setOpen, setPages);

  return (
    <CommandGroup heading={name} key={name} className={classNames.section}>
      {items.map(page => (
        <>
          <Command.Item
            className={cn(classNames.item, 'group')}
            key={page.slug}
            value={page.slug}
            keywords={[page.title]}
            onSelect={() => goto({ slug: page.slug })}
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
                    key={sub.slug}
                    value={`${page.slug}${sub.slug}`}
                    className={cn(
                      'text-text-primary-muted ml-7',
                      classNames.item
                    )}
                    onSelect={() =>
                      goto({ slug: page.slug, hash: `#${sub.slug}` })
                    }
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

export const InternalPage = ({ classNames, setOpen }: ChangeOpenItemProps) => {
  const goto = useGoto(setOpen);
  return (
    <>
      {internal.map(val =>
        Object.values(val).map(items =>
          items.map(({ name, slug }) => (
            <Command.Item
              className={classNames.item}
              key={name}
              value={slug}
              onSelect={() => goto({ slug })}
            >
              {name}
            </Command.Item>
          ))
        )
      )}
    </>
  );
};
