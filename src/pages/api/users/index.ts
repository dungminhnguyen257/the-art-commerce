import * as dao from '@lib/user/dao';
import type { UserResponse } from '@lib/user/dto';
import { UserPostBodySchema } from '@lib/user/dto';
import { StatusCodes } from 'http-status-codes';
import type { NextApiHandler } from 'next';

import { apiHandler } from '@/lib/utils/api-handler';

const getUsers: NextApiHandler<UserResponse[]> = async (req, res) => {
  const records = await dao.findAllUsers();
  res.status(StatusCodes.CREATED).json(records);
};

const postUser: NextApiHandler<UserResponse> = async (req, res) => {
  UserPostBodySchema.parse(req.body);
  const record = await dao.createUser(req.body);
  res.status(StatusCodes.CREATED).json(record);
};

export default apiHandler(
  {
    GET: getUsers,
    POST: postUser,
  },
  'admin'
);
