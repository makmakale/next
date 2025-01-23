import * as z from "zod";
import { ZodError } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password is too short"),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;

export const validateLoginForm = (values: LoginFormValues) => {
  try {
    LoginSchema.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.formErrors.fieldErrors;
    }
  }
};

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(3, "Username is too short")
    .max(20, "Username is too long"),
  email: z.string().email(),
  password: z.string().min(4, "Password is too short"),
});

export type RegisterFormValues = z.infer<typeof RegisterSchema>;

export const validateRegisterForm = (values: RegisterFormValues) => {
  try {
    RegisterSchema.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.formErrors.fieldErrors;
    }
  }
};
