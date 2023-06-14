import prisma from '@db/client';
import { Prisma } from '@prisma/client';

import type { ProductRequestBody } from '@/lib/product/dto';

export async function createProduct(product: ProductRequestBody) {
  const record = await prisma.product.create({
    data: { ...product, price: new Prisma.Decimal(product.price) },
  });
  return { ...record, price: Number(record.price) };
}

export async function findAllProducts() {
  return prisma.product.findMany();
}
