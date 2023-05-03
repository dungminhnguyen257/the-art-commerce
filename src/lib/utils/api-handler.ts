import { Prisma } from '@prisma/client';
import type { Method } from 'axios';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
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
    if (err.code === 'P2002') {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json(
          formatError(
            `Unique constraint failed on the field(s) ${err.meta?.target}`
          )
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

export function apiHandler(handler: ApiMethodHandlers) {
  return async (req: NextApiRequest, res: NextApiResponse<ErrorResponse>) => {
    try {
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
