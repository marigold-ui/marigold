'use client';

// Explicitly re-export compound component parts for MDX usage
import { SectionMessage as _SectionMessage } from '@marigold/components';

export * from '@marigold/components';
export * from '@marigold/system';
export * as Icons from '@marigold/icons';

export const SectionMessageTitle = _SectionMessage.Title;
export const SectionMessageContent = _SectionMessage.Content;
