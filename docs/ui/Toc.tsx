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

  console.log(items);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toc = document.querySelector('#toc');

  const TocPortal = () => (
    <div>
      <Headline level={2}>Table of Contents</Headline>
      {elements.map((i: { title: string; anchor: string }) => (
        <div key={i.title}>
          <div>
            <Link href={i.anchor}>{i.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
  return isMounted
    ? createPortal(<TocPortal />, toc ? (toc as Element) : document.body)
    : null;
};

export const TocContainer = () => {
  return <div id="toc"></div>;
};
