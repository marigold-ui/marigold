'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, List, Text } from '@marigold/components';
import { cn } from '@marigold/system';

export interface TocProps {
  data: string;
}

type Item = {
  anchor: string;
  title: string;
  id: string;
  level: string;
};

export const Toc = ({ data }: TocProps) => {
  const elements = JSON.parse(data) as Item[];

  const [, setIsMounted] = useState(false);

  const ref = useRef<Element>(undefined);

  const itemId = elements.map(item => item.id);
  const activeItem = useActiveItem(itemId);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ref.current = document.querySelector('#toc') || undefined;
      setIsMounted(true);
    }
  }, []);

  if (!ref.current || elements.length === 0) {
    return null;
  }

  const TocPortal = () => (
    <div className="not-prose w-64">
      <Text weight="semibold" color="secondary-800">
        On This Page
      </Text>
      <List as="ul">
        {elements.map(({ title, id, anchor, level }: Item) => (
          <Fragment key={id}>
            {level === 'h2' && (
              <List.Item key={title}>
                <Link
                  variant="toc"
                  href={anchor}
                  data-active={activeItem === id ? 'true' : 'false'}
                >
                  {title}
                </Link>
              </List.Item>
            )}
            {level === 'h3' && (
              <div
                className={cn(
                  'border-secondary-300 hover:border-secondary-800 border-l',
                  activeItem === id && 'border-secondary-800'
                )}
              >
                <List.Item key={title}>
                  <div className="pl-4">
                    <Link
                      variant="toc"
                      href={anchor}
                      data-active={activeItem === id ? 'true' : 'false'}
                    >
                      {title ? title : id}
                    </Link>
                  </div>
                </List.Item>
              </div>
            )}
          </Fragment>
        ))}
      </List>
    </div>
  );

  return createPortal(<TocPortal />, ref.current);
};

export const TocContainer = () => {
  return (
    <div
      id="toc"
      className="sticky top-[calc(var(--page-header-height)+1rem)]"
    ></div>
  );
};

const useActiveItem = (itemIds: string[]) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -50% 0%' }
    );

    itemIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  });

  return activeId;
};
