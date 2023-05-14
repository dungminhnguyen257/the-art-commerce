import { Role } from '@prisma/client';
import type { NextRequest } from 'next/server';
import type { JWT } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

const isAuthorized = (req: NextRequest, token: JWT | null) => {
  const adminRequiredRoutes = ['/admin'];
  const userRequiredRoutes = ['/cart'];

  for (const route of adminRequiredRoutes) {
    // check admin privilege to access admin-required route
    if (req.nextUrl.pathname.includes(route)) {
      return token?.role === Role.admin;
    }
  }

  for (const route of userRequiredRoutes) {
    // check user privilege to access user-required route
    if (req.nextUrl.pathname.includes(route)) {
      return token?.role === Role.user || token?.role === Role.admin;
    }
  }

  return true;
};

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      return isAuthorized(req, token);
    },
  },
});

export const config = { matcher: ['/admin/:path*', '/cart/:path*'] };
