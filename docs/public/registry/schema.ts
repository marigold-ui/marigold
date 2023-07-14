import * as z from 'zod';

export const registrySchema = z.array(
  z.object({
    name: z.string(),
  })
);

export type Registry = z.infer<typeof registrySchema>;
