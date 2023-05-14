/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-param-reassign */
import * as userDao from '@lib/user/dao';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // https://authjs.dev/reference/core/providers_google
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        // https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/google.ts
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    }),
  ],
  session: {
    // https://next-auth.js.org/configuration/options#session
    strategy: 'jwt',
  },
  callbacks: {
    // https://next-auth.js.org/configuration/callbacks#jwt-callback
    // user, account, and profile are available only when user signs in
    async jwt({ token, user, account, profile }) {
      // query user from db
      const userRecord = await userDao.findUniqueByEmail(token.email as string);
      token.role = userRecord.role;
      return token;
    },
    // how nextAuth handles the params below: https://authjs.dev/reference/adapters#user
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        return (profile as any)?.email_verified;
      }
      return false;
    },
    async session({ session, token }) {
      // https://authjs.dev/guides/basics/role-based-access-control
      // Send properties to the client, like an access_token and user id from a provider.
      // query user from database
      if (token?.access_token) {
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
