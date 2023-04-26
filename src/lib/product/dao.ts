import prisma from '@db/client';

import type { CreateProduct } from '@/lib/product/dto';

export async function createProduct(product: CreateProduct) {
  return prisma.product.create({
    data: product,
  });
}
