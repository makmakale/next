import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { CurrentUserProps } from "@/lib/types/users";

export const getCurrentUser = async () => {
  const session = await auth();
  return (session?.user as CurrentUserProps) || null;
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUsername = (name: string | null) => {
  if (!name) return "";

  const firstLetter = name.split(" ")[0][0].toUpperCase();
  const secondLetter = name.split(" ")[1]?.[0].toUpperCase() || "";

  return firstLetter + secondLetter;
};
