"use server";

import { db } from "@/lib/db";
import { UserProps } from "@/lib/types/users";
import {
  UserUpdateFormValues,
  UserUpdateSchema,
} from "@/lib/utils/form/validate/user";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export const getUsers = async (): Promise<{
  data?: UserProps[] | undefined;
  error?: string | undefined;
}> => {
  try {
    const users: UserProps[] = await db.user.findMany();

    return { data: users };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getUser = async (
  id: number | string,
): Promise<{
  data?: UserProps | null | undefined;
  error?: string | undefined;
}> => {
  try {
    const user: UserProps | null = await db.user.findUnique({
      where: { id: +id },
    });

    return { data: user };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const updateUser = async (
  values: UserUpdateFormValues,
  id: number | string,
): Promise<{
  data?: UserProps | null;
  error?: string | undefined;
}> => {
  try {
    const validatedFields = UserUpdateSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { name, email, password } = validatedFields.data;
    const existingUser = await db.user.findFirst({
      where: { email, NOT: { id: +id } },
    });
    if (existingUser) {
      return { error: "Email already in use!" };
    }

    const data: { name: string; email: string; password?: string } = {
      name,
      email,
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      data.password = hashedPassword;
    }

    const user: UserProps | null = await db.user.update({
      where: { id: +id },
      data,
    });

    revalidatePath("/dashboard/users/[userId]");
    return { data: user };
  } catch (error: any) {
    return { error: error.message };
  }
};
