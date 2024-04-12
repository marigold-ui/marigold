'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Link, List } from '@marigold/components';

export interface TocProps {
  items: string;
}

export const Toc = ({ items }: TocProps) => {
  const elements = JSON.parse(items) as {
    anchor: string;
    title: string;
    id: string;
  }[];

  const [, setIsMounted] = useState(false);

  const ref = useRef<Element>();

  useEffect(() => {
    // const observer = new IntersectionObserver(entries => {});
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
        {elements.map((i: { title: string; anchor: string; id: string }) => (
          <List.Item key={i.title}>
            <Link variant="toc" href={i.anchor} key={i.id}>
              {i.title}
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
