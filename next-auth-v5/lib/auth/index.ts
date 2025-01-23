import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: "/dashboard/login",
    error: "/dashboard/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60, // 4h
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  ...authConfig,
});
