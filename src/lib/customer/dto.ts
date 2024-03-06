import { Role } from '@prisma/client';
import { z } from 'zod';

const CustomerBodySchema = z.object({
  id: z.string(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  phone: z.string().optional().nullable(),
  email: z.string().email().nonempty(),
  address: z.string().nonempty(),
  emailVerified: z.boolean().nullable(),
  role: z.enum([Role.admin, Role.user, Role.public]),
});

export const CustomerPostBodySchema = CustomerBodySchema.omit({ id: true });

export const CustomerPatchBodySchema = CustomerBodySchema.partial({
  firstName: true,
  lastName: true,
  phone: true,
  email: true,
  address: true,
  emailVerified: true,
  role: true,
});

export type CustomerPostBody = z.infer<typeof CustomerPostBodySchema>;
export type CustomerPatchBody = z.infer<typeof CustomerPatchBodySchema>;

export type CustomerResponse = z.infer<typeof CustomerBodySchema>;
