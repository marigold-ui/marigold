import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { Box, Headline, Link, List } from '@marigold/components';

export const Toc = ({ items, selector }: any) => {
  const elements = JSON.parse(items);
  const [, setMounted] = useState(false);

  const ref = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ref.current = document.querySelector(selector);
      setMounted(true);
    }
  }, []);

  if (!ref.current) {
    return null;
  }

  const TocPortal = () => (
    <Box
      css={{
        position: 'sticky',
        display: ['none', 'none', 'block'],
        top: 20,
        ml: 'large-2',
        pl: 'medium-2',
        borderLeft: '1px solid',
        borderColor: 'page.light',
      }}
    >
      <Headline level="3">Table of Contents</Headline>
      {elements.map((i: { title: string; anchor: string }) => (
        <List key={i.title}>
          <Link href={i.anchor}>{i.title}</Link>
        </List>
      ))}
    </Box>
  );

  return createPortal(<TocPortal />, ref.current);
};

export const TocContainer = () => {
  return <div id="toc"></div>;
};
