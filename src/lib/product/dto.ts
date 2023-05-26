import { z } from 'zod';

export const ProductRequestBodySchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional().nullable(),
  stock_quantity: z.number().nonnegative(),
  // price: z.instanceof(Prisma.Decimal),
  price: z.number(),
  image: z.instanceof(Buffer).nullable().optional(),
});

export type ProductRequestBody = z.infer<typeof ProductRequestBodySchema>;

export type ProductResponse = ProductRequestBody & { id: string };
