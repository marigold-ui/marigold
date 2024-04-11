'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Headline, Link, List } from '@marigold/components';

export const Toc = ({ items, selector }: any) => {
  const ref = useRef<Element>();
  const [, setMounted] = useState(false);
  const elements = JSON.parse(items) as { anchor: string; title: string }[];
  console.log(elements);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ref.current = document.querySelector(selector) || undefined;
    }
    setMounted(true);
  }, [selector]);

  if (!ref.current || elements.length === 0) {
    return null;
  }
  const toc = document.querySelector('#toc');

  const TocPortal = () => <div>huhuhuhu</div>;

  return createPortal(<TocPortal />, ref.current);
};

export interface TocProps {
  items: string[];
}

export const TocContainer = () => {
  return <div id="toc">huhu</div>;
};
