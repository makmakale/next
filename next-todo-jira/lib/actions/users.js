'use server';
import {Op} from 'sequelize';
import {toJSON} from '@/lib/utils/data';
import bcrypt from 'bcryptjs';
import {RegisterSchema, UpdateUserSchema} from '@/lib/form/validation';
import {revalidatePath} from "next/cache";
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from "@/lib/constants";
import {db} from "@/lib/database/prisma";
import {getUserByEmail, getUserById, getUserByUsername} from "@/lib/utils/users";
import {signIn} from "@/lib/auth";
import {AuthError} from "next-auth";

export const login = async (values) => {
  try {
    await signIn('credentials', {
      ...values,
      redirectTo: '/board'
    })
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return {error: 'Incorrect username or password '}
        case "CallbackRouteError":
          return {error: e.cause.err.message}
        default:
          return ({error: 'Something went wrong'})
      }
    }
    throw e
  }
}

export const getListOfUsers = async (options = {}) => {
  const {
    limit = DEFAULT_PAGE_SIZE,
    offset = DEFAULT_PAGE_INDEX,
    q = '',
  } = options

  try {
    const users = await db.user.findAndCountAll({
      // where: {
      //   name: dbSearchQuery(q),
      // },
      order: ['createdAt'],
      limit,
      offset: offset * limit,
    });

    return {data: toJSON(users)};
  } catch (err) {
    console.error('Failed to fetch users', err);
    return {error: err.message};
  }
};

export const createUser = async (body) => {
  if (!body) return;

  try {
    // check if fields are valid
    await RegisterSchema.validate(body);
    const castData = RegisterSchema.cast(body)
    const {username, email, password} = castData

    // check if same email or username already in use
    const isUsernameExist = await getUserByUsername(username);
    if (isUsernameExist) {
      return {error: 'Username already in use'};
    }

    const isEmailExist = await getUserByEmail(email);
    if (isEmailExist) {
      return {error: 'Email already in use'};
    }

    if (!password.trim()) {
      return {error: 'Password is required'};
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({data: {...castData, password: hashedPassword}});

    return {success: 'User created'};
  } catch (err) {
    console.error('Failed to create user', err);
    return {error: err.message};
  }
};

export const disableUser = async (id) => {
  if (!id || id === 'undefined') return;

  try {
    const user = await getUserById(id);
    await user.update({isActive: !user.isActive});
    await user.save();

    return {success: user.isActive ? 'User was activated' : 'User was disabled'};
  } catch (err) {
    console.error('Failed to change user status', err);
    return {error: err.message};
  }
};

export const getUserDetails = async (id) => {
  if (!id || id === 'undefined') return

  try {
    const user = await getUserById(id)

    return {data: toJSON(user)}
  } catch (err) {
    console.error('Failed to fetch user', err)
    return {error: err.message}
  }
}

export const updateUser = async (body, id) => {
  if (!id || id === 'undefined' || !body) return

  try {
    // check if user is exists
    const user = await getUserById(id)
    if (!user) {
      return {error: 'User not found'}
    }

    // check if fields are valid
    const isValid = UpdateUserSchema.isValid(body)
    if (!isValid) {
      return {error: 'Invalid fields'}
    }

    // check if same email or username already in use
    const isExist = await db.user.findOne({
      where: {
        [Op.or]: [{username: body.username}, {email: body.email}],
        id: {[Op.ne]: id}
      }
    })
    if (isExist) {
      return {error: 'Username or Email already in use'}
    }

    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10)
      await user.update({...body, password: hashedPassword})
    } else {
      await user.update(body)
    }
    await user.save()
    revalidatePath('/users/edit/[id]', 'page')

    return {data: toJSON(user)}
  } catch (err) {
    console.error('Failed to update user')
    return {error: err.message}
  }
}