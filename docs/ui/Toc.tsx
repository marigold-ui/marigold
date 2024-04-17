'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Link, List } from '@marigold/components';

export interface TocProps {
  data: string;
}

type Item = {
  anchor: string;
  title: string;
  id: string;
};

export const Toc = ({ data }: TocProps) => {
  const elements = JSON.parse(data) as Item[];

  const [, setIsMounted] = useState(false);

  const ref = useRef<Element>();

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
    <div className="fixed">
      <List as="ul">
        On This Page
        {elements.map(({ title, id, anchor }: Item) => (
          <List.Item key={title}>
            <Link
              variant="toc"
              href={anchor}
              data-active={activeItem === id ? 'true' : 'false'}
            >
              {title}
            </Link>
          </List.Item>
        ))}
      </List>
    </div>
  );

  return createPortal(<TocPortal />, ref.current);
};

export const TocContainer = () => {
  return <div id="toc"></div>;
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
      { rootMargin: `0% 0% -80% 0%` }
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
