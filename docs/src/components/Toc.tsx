import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Box, Headline, Link, List } from '@marigold/components';

export interface TocProps {
  selector: string;
  items: string;
}

export const Toc = ({ items, selector }: TocProps) => {
  const elements = JSON.parse(items) as { anchor: string; title: string }[];
  const [, setMounted] = useState(false);

  const ref = useRef<Element>();

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
        display: ['none', 'none', 'block'],
        top: 20,
        mx: 'large-2',
        pl: 'medium-2',

        borderLeft: '1px solid',
        borderColor: 'background.light',
      }}
    >
      <Headline level="3">Table of Contents</Headline>
      {elements.map((i: { title: string; anchor: string }) => (
        <List key={i.title}>
          <Link variant="toc" href={i.anchor}>
            {i.title}
          </Link>
        </List>
      ))}
    </Box>
  );

  return createPortal(<TocPortal />, ref.current);
};

export const TocContainer = () => {
  return <div id="toc"></div>;
};
