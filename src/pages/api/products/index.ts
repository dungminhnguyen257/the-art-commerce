import * as dao from '@lib/product/dao';
import type { ProductResponse } from '@lib/product/dto';
import { ProductRequestBodySchema } from '@lib/product/dto';
import { StatusCodes } from 'http-status-codes';
import type { NextApiHandler } from 'next';

import { apiHandler } from '@/lib/utils/api-handler';

const get: NextApiHandler<ProductResponse[]> = async (req, res) => {
  const record = await dao.findAllProducts();
  res.status(StatusCodes.CREATED).json(
    record.map((product) => ({
      ...product,
      price: Number(product.price),
    }))
  );
};

const postProduct: NextApiHandler<ProductResponse> = async (req, res) => {
  ProductRequestBodySchema.parse(req.body);
  const productRecord = await dao.createProduct(req.body);
  res.status(StatusCodes.CREATED).json(productRecord);
  res
    .status(StatusCodes.CREATED)
    .json({ ...productRecord, price: Number(productRecord.price) });
};

export default apiHandler(
  {
    POST: postProduct,
    GET: get,
  },
  'public'
);
