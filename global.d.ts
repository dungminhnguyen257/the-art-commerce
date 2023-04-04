/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import type { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient;
}
