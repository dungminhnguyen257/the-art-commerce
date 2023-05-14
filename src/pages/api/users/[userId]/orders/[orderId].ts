// import * as dao from '@lib/user/dao';
// import type { UserResponse } from '@lib/user/dto';
// import { UserPatchBodySchema } from '@lib/user/dto';
// import { Role } from '@prisma/client';
// import { StatusCodes } from 'http-status-codes';
// import type { NextApiHandler } from 'next';

// import { apiHandler } from '@/lib/utils/api-handler';

// const get: NextApiHandler<UserResponse> = async (req, res) => {
//   const {userId, orderId } = req.query;
//   const record = await dao.findUniqueUserOrder(userId as string, orderId as string);
//   res.status(StatusCodes.OK).json(record);
// };

// const patch: NextApiHandler<UserResponse> = async (req, res) => {
//   UserPatchBodySchema.parse(req.body);
//   const record = await dao.updateUserOrder(req.body);
//   res.status(StatusCodes.OK).json(record);
// };

// export default apiHandler(
//   {
//     GET: get,
//     PATCH: patch,
//   },
//   Role.user
// );
