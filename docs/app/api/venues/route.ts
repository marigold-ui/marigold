import { venues } from '@/lib/data/venues';
import { wait } from '@/lib/utils';
import { z } from 'zod';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const schema = z.object({
  delay: z.string().regex(/^\d+$/, 'delay must be a number').transform(Number),
  q: z.string().default(''),
});

export const GET = async (req: NextRequest) => {
  const params = schema.safeParse(
    Object.fromEntries(req.nextUrl.searchParams.entries())
  );

  if (!params.success) {
    return NextResponse.json(params.error.flatten().fieldErrors, {
      status: 400,
    });
  }

  const { q, delay } = params.data;
  const result = venues.filter(venue =>
    venue.name.toLocaleLowerCase().replaceAll(' ', '').includes(q)
  );

  // Fake "this is really complicated" timer
  await wait(delay);

  return NextResponse.json(result);
};
