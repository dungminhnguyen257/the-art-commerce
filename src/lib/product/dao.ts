import prisma from '@db/client';

import type { ProductRequestBody } from '@/lib/product/dto';

export async function createProduct(product: ProductRequestBody) {
  const record = await prisma.product.create({
    data: product,
  });
  return record;
}
