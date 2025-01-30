import {db} from "@/lib/database/prisma";

export const getVerificationTokenByToken = async (token) => {
  try {
    return await db.verificationToken.findUnique({where: {token}});
  } catch (e) {
    return null
  }
}

export const getVerificationTokenByEmail = async (email) => {
  try {
    return await db.verificationToken.findFirst({where: {email}});
  } catch (e) {
    return null
  }
}