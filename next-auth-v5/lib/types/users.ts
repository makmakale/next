import { UserRole } from "@prisma/client";
import { User } from "next-auth";

export type UserProps = {
  id: number;
  email: string | null;
  password: string | null;
  name: string | null;
  image: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type CurrentUserProps = ({ id: number; role: UserRole } & User) | null;
