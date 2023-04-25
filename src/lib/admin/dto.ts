import { z } from 'zod';

export const AdminRequestBodySchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  phone: z.string().optional().nullable(),
  email: z.string().email().nonempty(),
});

export type AdminRequestBody = z.infer<typeof AdminRequestBodySchema>;

export type AdminResponse = AdminRequestBody & { id: string };
