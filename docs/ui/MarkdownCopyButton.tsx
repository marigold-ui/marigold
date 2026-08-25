'use client';

import { track } from '@vercel/analytics';
import { MarkdownCopyButton as BaseMarkdownCopyButton } from 'fumadocs-ui/layouts/docs/page';
import type { ComponentProps } from 'react';

/**
 * Fumadocs' copy button plus our analytics event.
 *
 * Tracked on the capture phase: the upstream button spreads incoming props over
 * its own `onClick`, so passing one would replace the copying itself.
 */
export const MarkdownCopyButton = (
  props: ComponentProps<typeof BaseMarkdownCopyButton>
) => (
  <BaseMarkdownCopyButton
    onClickCapture={() => track('Copy Code')}
    {...props}
  />
);
