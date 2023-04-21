import { z } from 'zod';

export const AdminRequestBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional().nullable(),
  email: z.string().email(),
});

export type AdminRequestBody = z.infer<typeof AdminRequestBodySchema>;

export type AdminResponse = AdminRequestBody & { id: string };
