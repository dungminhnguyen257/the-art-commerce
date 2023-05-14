import * as dao from '@lib/user/dao';
import type { UserResponse } from '@lib/user/dto';
import { UserPatchBodySchema } from '@lib/user/dto';
import { StatusCodes } from 'http-status-codes';
import type { NextApiHandler } from 'next';

import { apiHandler } from '@/lib/utils/api-handler';
import { checkAuthorization } from '@/lib/utils/http';

const get: NextApiHandler<UserResponse> = async (req, res) => {
  const { id } = req.query;
  await checkAuthorization(req, 'user', id as string);
  const record = await dao.findUniqueById(id as string);
  res.status(StatusCodes.OK).json(record);
};

const patch: NextApiHandler<UserResponse> = async (req, res) => {
  const { id } = req.query;
  await checkAuthorization(req, 'user', id as string);
  UserPatchBodySchema.parse(req.body);
  const record = await dao.updateUser(req.body);
  res.status(StatusCodes.OK).json(record);
};

export default apiHandler(
  {
    GET: get,
    PATCH: patch,
  },
  'user'
);
