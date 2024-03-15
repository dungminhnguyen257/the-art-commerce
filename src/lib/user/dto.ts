import { Role } from '@prisma/client';
import { z } from 'zod';

const UserBodySchema = z.object({
  id: z.string(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  email: z.string().email().nonempty(),
  emailVerified: z.boolean().nullable(),
  role: z.enum([Role.admin, Role.user, Role.public]),
});

export const UserPostBodySchema = UserBodySchema.omit({ id: true });

export const UserPatchBodySchema = UserBodySchema.partial({
  firstName: true,
  lastName: true,
  phone: true,
  email: true,
  emailVerified: true,
  role: true,
});

export type UserPostBody = z.infer<typeof UserPostBodySchema>;
export type UserPatchBody = z.infer<typeof UserPatchBodySchema>;

export type UserResponse = z.infer<typeof UserBodySchema>;
