import prisma from '@db/client';
import type { CreateAdmin } from '@lib/admins/models';

export async function createAdmin(user: CreateAdmin) {
  return prisma.admin.create({
    data: user,
  });
}
