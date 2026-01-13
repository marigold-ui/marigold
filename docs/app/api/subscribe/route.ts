import { z } from 'zod';
import { NextResponse } from 'next/server';

// Helpers
// ---------------
const ALREADY_REGISTERED_EMAILS = [
  'support@reservix.de',
  'marigold@reservix.de',
];

const schema = z.object({
  email: z
    .string()
    .email()
    .refine(
      val => {
        return !ALREADY_REGISTERED_EMAILS.includes(val);
      },
      {
        message: 'This email is already subscribed.',
      }
    ),
});

// POST
// ---------------
export const POST = async (req: Request) => {
  const body = await req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(result.error.flatten().fieldErrors, {
      status: 400,
    });
  }

  return NextResponse.json(result.data);
};
