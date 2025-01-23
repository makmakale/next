import GoogleProvider from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/utils/form/validate/auth";
import { getUserByEmail } from "@/lib/utils/data/users";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      const user = await getUserByEmail(token.email as string);
      if (!user) return token;

      token.id = user.id;
      token.role = user.role;

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }

      return session;
    },

    async signIn({ profile, account }) {
      if (account?.provider !== "google") return true;

      if (!profile?.email) throw new Error("No Profile");

      await db.user.upsert({
        where: {
          email: profile.email,
        },
        update: {
          name: profile.name,
          image: profile.picture,
        },
        create: {
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        },
      });

      return true;
    },
  },
};
