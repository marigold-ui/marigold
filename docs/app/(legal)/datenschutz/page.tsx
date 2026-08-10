import { legalDocs } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/**
 * DRAFT — Legal / the DPO must review and release this before it goes live.
 *
 * Prose lives in `legal/datenschutz.mdx`. It documents what the site actually
 * does — Vercel hosting + logs, Vercel Web Analytics, self-hosted search,
 * authenticated MCP endpoint, opt-out CLI telemetry. Change one, change it.
 *
 * German is authoritative, so the English translation nests one heading level
 * below it. Keep both in sync.
 */
const SLUG = ['datenschutz'];

export const metadata: Metadata = {
  title: legalDocs.getPage(SLUG)?.data.title,
  description: legalDocs.getPage(SLUG)?.data.description,
};

const Page = () => {
  const page = legalDocs.getPage(SLUG);
  if (!page) notFound();

  const MDX = page.data.body;

  return <MDX components={getMDXComponents()} />;
};

export default Page;
