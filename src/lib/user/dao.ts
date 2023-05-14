import prisma from '@db/client';
import type { UserPatchBody, UserPostBody } from '@lib/user/dto';

export async function createUser(user: UserPostBody) {
  return prisma.user.create({
    data: user,
  });
}

export async function findUniqueById(id: string | undefined) {
  return prisma.user.findUniqueOrThrow({ where: { id } });
}

export async function findUniqueByEmail(email: string | undefined) {
  return prisma.user.findUniqueOrThrow({ where: { email } });
}

export async function updateUser(user: UserPatchBody) {
  return prisma.user.update({
    data: user,
    where: { id: user.id },
  });
}

export async function findAllUsers() {
  return prisma.user.findMany();
}
