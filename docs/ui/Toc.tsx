'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Headline, Link, List } from '@marigold/components';

export interface TocProps {
  selector: string;
  items: string;
}

export const Toc = ({ items, selector }: TocProps) => {
  const elements = JSON.parse(items) as { anchor: string; title: string }[];

  const [, setIsMounted] = useState(false);

  const ref = useRef<Element>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ref.current = document.querySelector('#toc') || undefined;
      setIsMounted(true);
    }
  }, [selector]);

  if (!ref.current || elements.length === 0) {
    return null;
  }

  const TocPortal = () => (
    <div className="absolute right-0 px-10">
      <p className="font-semibold">On this page</p>
      {elements.map((i: { title: string; anchor: string }) => (
        <div key={i.title}>
          <div>
            <Link href={i.anchor}>{i.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );

  return createPortal(<TocPortal />, ref.current);
};

export const TocContainer = () => {
  return <div id="toc"></div>;
};
