import type { PrismaClient } from '@prisma/client';
import type { DeepMockProxy } from 'jest-mock-extended';
import { mockDeep, mockReset } from 'jest-mock-extended';

import prisma from './client';

jest.mock('./client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));
beforeEach(() => {
  mockReset(prisma);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
