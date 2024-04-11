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

  const toc = document.querySelector('#toc');

  const TocPortal = () => (
    <div>
      <Headline level={2}>Table of Contents</Headline>
    </div>
  );
  return createPortal(<TocPortal />, toc as Element);
};

export const TocContainer = () => {
  return <div id="toc"></div>;
};
