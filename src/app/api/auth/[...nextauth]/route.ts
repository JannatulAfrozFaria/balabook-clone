import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { config } from '../../../../../middleware';
import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../../../../../helpers/server-helpers";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password)
          return null;
        try {
          await connectToDatabase();
          const user = await prisma.user.findFirst({
            where: { username: credentials.username },
          });
          if (!user?.password) {
            console.log("user Not Found");
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            console.log(user);
            return user;
          }
        } catch (error) {
          console.error(error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          type: token.type,
          phone: token.phone,
          photo: token.photo,
          warehouseId: token.warehouseId,
        },
      };
    },
    jwt: ({ token, user }) => {
      // console.log('JWT Callback', { token, user })
      if (user) {
        //@ts-nocheck
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          type: u.type,
          phone: u.phone,
          photo: u.photo,
          warehouseId: u.warehouseId,
        };
      } else {
        return token;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
