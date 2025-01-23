"use server";

import { signIn, signOut } from "@/lib/auth";
import {
  LoginFormValues,
  LoginSchema,
  RegisterFormValues,
  RegisterSchema,
} from "@/lib/utils/form/validate/auth";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/utils/data/users";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/utils/constants/routes";
import { AuthError } from "next-auth";

export const login = async (values: LoginFormValues) => {
  try {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    await signIn("credentials", {
      ...values,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw err;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/dashboard/login" });
};

export const register = async (values: RegisterFormValues) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { name, password, email } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 12);

    // check user by email
    const existingUserByEmail = await getUserByEmail(email);
    if (existingUserByEmail) {
      return { error: "Email already in use!" };
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: "User was created" };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
};
