import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Box, Headline, Link, List } from '@marigold/components';
import React from 'react';

export interface TocProps {
  selector: string;
  items: string;
}

function getId(children: string) {
  return children
    .split(' ')
    .map(word => word.toLowerCase())
    .join('-');
}

function useScrollSpy(ids: string[], options: IntersectionObserverInit) {
  const [activeId, setActiveId] = React.useState<string>();
  const observer = React.useRef<IntersectionObserver>();
  React.useEffect(() => {
    const elements = ids.map(id => document.getElementById(id));
    observer.current?.disconnect();
    observer.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);
    elements.forEach(el => {
      if (el) {
        observer.current?.observe(el);
      }
    });
    return () => observer.current?.disconnect();
  }, [ids, options]);
  return activeId;
}

export const Toc = ({ items, selector }: TocProps) => {
  const elements = JSON.parse(items) as { anchor: string; title: string }[];
  const [, setMounted] = useState(false);

  const ref = useRef<Element>();

  const activeId = useScrollSpy(
    elements.map((i: { title: string }) => getId(i.title)),
    { rootMargin: '0% 0% -50% 0%' }
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ref.current = document.querySelector(selector) || undefined;
      setMounted(true);
    }
  }, [selector]);

  if (!ref.current || elements.length === 0) {
    return null;
  }

  const TocPortal = () => (
    <Box
      css={{
        position: 'sticky',
        fontSize: 'fixed.small-2',
        top: 20,
        right: 0,
        mx: 'medium-1',
        pl: 'medium-2',

        borderLeft: '1px solid',
        borderColor: 'background.light',
      }}
    >
      <Headline level="3">Table of Contents</Headline>
      {elements.map((i: { title: string; anchor: string }) => (
        <List key={i.title}>
          <Link
            id={getId(i.title)}
            variant="toc"
            href={i.anchor}
            style={{
              fontWeight: activeId === getId(i.title) ? 'bold' : 'normal',
            }}
          >
            {i.title}
          </Link>
        </List>
      ))}
    </Box>
  );

  return createPortal(<TocPortal />, ref.current);
};

export const TocContainer = () => {
  return <Box id="toc" css={{ display: ['none', 'none', 'block'] }}></Box>;
};
