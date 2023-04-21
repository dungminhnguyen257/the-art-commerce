import prisma from '@db/client';
import type { AdminRequestBody } from '@lib/admin/dto';

export async function createAdmin(user: AdminRequestBody) {
  return prisma.admin.create({
    data: user,
  });
}
