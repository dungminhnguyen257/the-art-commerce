// import createHttpError from "http-errors";
import * as dao from '@lib/admin/dao';
import type { AdminResponse } from '@lib/admin/dto';
import { AdminRequestBodySchema } from '@lib/admin/dto';
import { apiHandler } from '@lib/utils/api';
import { StatusCodes } from 'http-status-codes';
import type { NextApiHandler } from 'next';

const postAdmin: NextApiHandler<AdminResponse> = async (req, res) => {
  AdminRequestBodySchema.parse(req.body);
  const adminRecord = await dao.createAdmin(req.body);
  res.status(StatusCodes.CREATED).json(adminRecord);
  // if (!adminRecord)
  //   throw new createHttpError.NotFound(`Article with id ${id} not found!`);
};

export default apiHandler({
  POST: postAdmin,
});
