import { legalDocs } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/**
 * DRAFT — Legal / the DPO must review and release this before it goes live.
 *
 * Prose lives in `legal/impressum.mdx`. Company data came from
 * https://www.reservix.de/impressum and needs re-verifying against the current
 * commercial register entry.
 *
 * German is authoritative (§ 5 DDG applies whatever the site language), so the
 * English translation nests one heading level below it. Keep both in sync.
 */
const SLUG = ['impressum'];

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
