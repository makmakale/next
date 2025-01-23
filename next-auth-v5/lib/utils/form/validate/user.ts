import * as z from "zod";
import { ZodError } from "zod";

export const UserUpdateSchema = z.object({
  name: z
    .string()
    .min(3, "Username is too short")
    .max(20, "Username is too long"),
  email: z.string().email(),
  password: z.string().optional(),
});

export type UserUpdateFormValues = z.infer<typeof UserUpdateSchema>;

export const validateUserUpdateForm = (values: UserUpdateFormValues) => {
  try {
    UserUpdateSchema.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.formErrors.fieldErrors;
    }
  }
};
