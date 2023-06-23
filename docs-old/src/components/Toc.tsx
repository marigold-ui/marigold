import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Box, Headline, Link, List } from '@marigold/components';
import React from 'react';
import { useComponentStyles } from '@marigold/system';

export interface TocProps {
  selector: string;
  items: string;
}

function getId(children: string) {
  return children
    ?.split(' ')
    .map(word => word.toLowerCase())
    .join('-')
    .replace(/[?']/g, '');
}

/**
 * To Do
 * Inital toc -> Did we need a Overview because we almost started with the first component with props.
 * Or should we take the Title as first element of the toc?
 * Add active-state to the element and styling everything in a own styling file
 */

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
  React.useEffect(() => {
    if (!activeId) {
      const toc = document.querySelector('#toc');
      toc?.querySelector(`#${ids[0]}`)?.setAttribute('data-active', 'true');
    }
  });
  return activeId;
}

export const Toc = ({ items, selector }: TocProps) => {
  const elements = JSON.parse(items) as { anchor: string; title: string }[];
  const [, setMounted] = useState(false);
  const isBottom = useRef(false);

  const ref = useRef<Element>();

  const styles = useComponentStyles(
    'Toc',
    {},
    {
      parts: ['toc', 'item'],
    }
  );

  const activeId = useScrollSpy(
    elements.map((i: { title: string }) => getId(i.title)),
    { rootMargin: '-10% -35% -80% -15%', threshold: 0 }
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ref.current = document.querySelector(selector) || undefined;
      setMounted(true);
    }
  }, [selector]);

  useEffect(() => {
    window.addEventListener('scroll', function () {
      const elements = document.querySelectorAll(
        '[data-intersection-active]'
      ) as any;
      const elementsLength = elements.length;
      const activeElement =
        elements[elementsLength - 2]?.dataset.intersectionActive;
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight &&
        activeElement === 'true' &&
        isBottom.current === false
      ) {
        elements[elementsLength - 2].setAttribute('data-active', 'false');
        elements[elementsLength - 1].setAttribute('data-active', 'true');
        isBottom.current = true;
      } else if (
        activeElement === 'true' &&
        isBottom.current === true &&
        window.innerHeight + window.scrollY <= document.body.scrollHeight - 100
      ) {
        elements[elementsLength - 1].setAttribute('data-active', 'false');
        elements[elementsLength - 2].setAttribute('data-active', 'true');
        isBottom.current = false;
      }
    });
  });

  if (!ref.current || elements.length === 0) {
    return null;
  }

  const TocPortal = () => (
    <Box css={styles.toc}>
      <Headline level="3">Table of Contents</Headline>
      {elements.map((i: { title: string; anchor: string }) => (
        <List key={i.title} variant="toc">
          <List.Item>
            <Link
              id={getId(i.title)}
              variant="toc"
              href={i.anchor}
              css={styles.item}
              data-active={activeId === getId(i.title) ? 'true' : 'false'}
              data-intersection-active={
                activeId === getId(i.title) ? 'true' : 'false'
              }
            >
              {i.title}
            </Link>
          </List.Item>
        </List>
      ))}
    </Box>
  );

  return createPortal(<TocPortal />, ref.current);
};

export const TocContainer = () => {
  return <Box id="toc" css={{ display: ['none', 'none', 'block'] }}></Box>;
};
