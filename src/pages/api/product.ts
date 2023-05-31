// import createHttpError from "http-errors";
import * as dao from '@lib/product/dao';
import type { ProductResponse } from '@lib/product/dto';
import { ProductRequestBodySchema } from '@lib/product/dto';
import { Role } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import type { NextApiHandler } from 'next';

import { apiHandler } from '@/lib/utils/api-handler';

const postProduct: NextApiHandler<ProductResponse> = async (req, res) => {
  ProductRequestBodySchema.parse(req.body);
  const productRecord = await dao.createProduct(req.body);
  res.status(StatusCodes.CREATED).json(productRecord);
};

export default apiHandler(
  {
    POST: postProduct,
  },
  Role.admin
);
