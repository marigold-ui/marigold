import React from 'react';
import { Box, Inline, Stack } from '@marigold/components';
import { FigmaLink } from '../components/FigmaLink';
import { Link } from '../components/Link';
import { Logo } from '../components/Logo';
import { ResaleLogbook } from '@marigold/icons';

export default function LandingPage() {
  return (
    <Box
      __baseCSS={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        my: '-xsmall',
      }}
    >
      <Stack space="xxlarge" alignX="center">
        <Logo size="large" />
        <Inline space="xxlarge">
          <Link variant="outline" to="/introduction/00-getting-started">
            <ResaleLogbook size="16" />
            View in Documentation
          </Link>
          <FigmaLink to="https://www.figma.com/file/DFKyTGHAoDxOsUBPszLLxP/%F0%9F%8F%B5%EF%B8%8FMarigold?node-id=0%3A1" />
        </Inline>
      </Stack>
    </Box>
  );
}
