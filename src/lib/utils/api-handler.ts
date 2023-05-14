import { Prisma, Role } from '@prisma/client';
import type { Method } from 'axios';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { ZodError } from 'zod';
import type { ValidationError } from 'zod-validation-error';
import { fromZodError } from 'zod-validation-error';
// Shape of the response when an error is thrown
export interface ErrorResponse {
  error: {
    message: ValidationError | string;
    detail?: any; // Sent for unhandled errors reulting in 500
  };
  status?: number; // Sent for unhandled errors reulting in 500
}

const formatError = (message: string, detail: any = undefined) => ({
  error: { message, detail },
});

type ApiMethodHandlers = {
  [key in Uppercase<Method>]?: NextApiHandler;
};

function errorHandler(err: unknown, res: NextApiResponse<ErrorResponse>) {
  // Errors with statusCode >= 500 should not be exposed
  if (createHttpError.isHttpError(err) && err.expose) {
    // Handle all errors thrown by http-errors module
    return res.status(err.statusCode).json(formatError(err.message));
  }
  if (err instanceof ZodError) {
    // Handle zod validation errors
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json(formatError(fromZodError(err).toString()));
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // source: https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-error-types
    switch (err.code) {
      case 'P2002':
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json(
            formatError(
              `Unique constraint failed on the field(s) ${err.meta?.target}`
            )
          );
      case 'P2025':
        return res.status(StatusCodes.NOT_FOUND).json(formatError(err.message));
      default:
        return res.status(StatusCodes.MULTI_STATUS).json(
          formatError('error code not handled', {
            error_code: err.code,
            error_message: err.message,
          })
        );
    }
  }
  // default to 500 server error
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: {
      message: (err as any).message ?? 'Internal Server Error',
      detail: err,
    },
    status: createHttpError.isHttpError(err) ? err.statusCode : 500,
  });
}

async function checkAuthorization(
  req: NextApiRequest,
  authorizationLevel: 'admin' | 'user' | 'public' = 'admin'
) {
  const token = await getToken({ req });
  const { userId } = req.query;
  if (authorizationLevel === Role.admin) {
    if (token?.role === Role.admin) {
      // Admin signed in
      return;
    }
  } else if (authorizationLevel === Role.user && userId) {
    // user specific authorization
    if (token?.role === Role.admin || token?.sub === userId) {
      return;
    }
  } else if (authorizationLevel === Role.user && !userId) {
    // generic user authorization
    if (token) {
      return;
    }
  } else if (authorizationLevel === 'public') {
    return;
  }
  throw new createHttpError.Unauthorized();
}

export function apiHandler(
  handler: ApiMethodHandlers,
  authorizationLevel: 'public' | 'admin' | 'user' = 'user'
) {
  return async (req: NextApiRequest, res: NextApiResponse<ErrorResponse>) => {
    try {
      await checkAuthorization(req, authorizationLevel);

      const method = req.method
        ? (req.method.toUpperCase() as keyof ApiMethodHandlers)
        : undefined;

      // check if handler supports current HTTP method
      if (!method)
        throw new createHttpError.MethodNotAllowed(
          `No method specified on path ${req.url}!`
        );

      const methodHandler = handler[method];
      if (!methodHandler)
        throw new createHttpError.MethodNotAllowed(
          `Method ${req.method} Not Allowed on path ${req.url}!`
        );

      // call method handler
      await methodHandler(req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }
  };
}
