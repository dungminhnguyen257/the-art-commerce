import { Role } from '@prisma/client';
import createHttpError from 'http-errors';
import type { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

export async function post(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function checkAuthorization(
  req: NextApiRequest,
  authorizationLevel: 'admin' | 'user' | 'public' = 'admin',
  userId?: string
) {
  const token = await getToken({ req });

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
