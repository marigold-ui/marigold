import { siteConfig } from '@/lib/config';
import { Button, Dialog } from '@/ui';
import { Command, CommandGroup } from 'cmdk';
import { allContentPages } from 'contentlayer/generated';
import React from 'react';

import { useRouter } from 'next/navigation';

import { Search } from '@marigold/icons';

export const CommandMenu = () => {
  const groupedPages = siteConfig.navigation.map(({ name, slug }) => {
    const items = allContentPages
      .filter(page => page.slug.includes(slug))
      .map(({ title, slug, order }) => ({ title, slug, order }));
    //sorting by order or alphabetticly
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items.length - 1; j++) {
        //by order if there is an order
        if (typeof items[j].order == 'number') {
          if (
            (items[j].order as number) > 1 &&
            (items[j].order as number) > (items[j + 1].order as number)
          ) {
            const e = items[j];
            items[j] = items[j + 1];
            items[j + 1] = e;
          }
          //if no order sorting alphabetticly
        } else {
          if (items[j].title.localeCompare(items[j + 1].title) > -1) {
            const e = items[j];
            items[j] = items[j + 1];
            items[j + 1] = e;
          }
        }
      }
    }
    return { name, slug, items };
  });
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: {
      key: string;
      metaKey: any;
      ctrlKey: any;
      preventDefault: () => void;
    }) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  function redirect(slug: string) {
    router.push(`/${slug}`);
    setOpen(false);
  }

  return (
    <Dialog.Trigger open={open} onOpenChange={setOpen} dismissable>
      <Button variant="sunken" size="small" onPress={() => setOpen(true)}>
        <span className="hidden xl:inline-flex ">Search documentation...</span>
        <span className="hidden lg:inline-flex xl:hidden">Search...</span>
        <div className="  inline-flex h-5  w-10 items-center justify-center rounded-md text-sm lg:border lg:border-gray-300 lg:bg-gray-200">
          <span className="text-xs">⌘</span>K
        </div>
      </Button>
      <Dialog size="medium" aria-label="Global Command Menu">
        <Command className=" bg-bg-surface text-popover-foreground [&_[cmdk-group-heading]]:text-text-primary-muted flex size-full w-[500px] flex-col overflow-hidden rounded-md [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5">
          <div className="flex items-center  border-b px-3">
            <Search className="mr-2 size-4 shrink-0 opacity-50"></Search>
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Type to search ..."
              className=" placeholder:text-text-primary-muted flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            <Command.Empty className="py-6 text-center text-sm">
              No results found.
            </Command.Empty>
            {groupedPages.map(({ name, items }) => (
              <CommandGroup
                heading={name}
                key={name}
                className="text-secondary-700 [&_[cmdk-group-heading]]:text-text-primary-muted overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium"
              >
                <Command.Separator
                  alwaysRender
                  className="bg-secondary-500 border-secondary-500 -mx-1  h-px"
                ></Command.Separator>
                {items.map(page => (
                  <Command.Item
                    className="aria-selected:bg-bg-hover aria-selected:text-text-primary relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    key={page.slug}
                    value={page.slug}
                    onSelect={() => redirect(page.slug)}
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
