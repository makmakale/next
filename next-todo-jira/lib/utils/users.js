import {db} from "@/lib/database/prisma";
import {auth} from "@/lib/auth";

export const getSessionUser = async () => {
  const session = await auth()
  return session?.user
}

export const getUserById = async (id) => {
  try {
    return await db.user.findUnique({where: {id}})
  } catch {
    return null
  }
}

export const getUserByUsername = async (username) => {
  try {
    return await db.user.findUnique({where: {username}})
  } catch {
    return null
  }
}

export const getUserByEmail = async (email) => {
  try {
    return await db.user.findUnique({where: {email}})
  } catch {
    return null
  }
}