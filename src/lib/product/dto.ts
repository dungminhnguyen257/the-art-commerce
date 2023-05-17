import image from 'next/image';
import {z} from 'zod';

export const ProductRequestBodySchema {
  name: z.string().nonempty(),
  description: z.string().optional().nullable(),
  stock_quantity: z.number().nonnegative().nonempty(),
  price: z.number().nonnegative().nonempty(),
  image: z.instanceof(File)
};

export type ProductRequestBody = z.infer<typeof ProductRequestBodySchema>;

export type ProductResponse = ProductRequestBody & { id: string };
