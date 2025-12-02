'use client';

import Link from 'next/link';
import { Button } from '@marigold/components';

export function HomeContent() {
  return (
    <div className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">Hello World</h1>
      <p className="text-access-admin-foreground">
        You can open{' '}
        <Link href="/docs" className="font-medium underline">
          /docs
        </Link>{' '}
        and see the documentation.
        <Button variant="sunken">test</Button>
      </p>
    </div>
  );
}
