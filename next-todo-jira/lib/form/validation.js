import * as yup from 'yup';

const transformIds = (val) => val === Number(val) ? val : null

export const LoginSchema = yup.object({
  username: yup
    .string('Enter your username')
    .min(3, 'Username should be of minimum 3 characters long')
    .required('Username is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters long')
    .required('Password is required'),
});

export const RegisterSchema = yup.object({
  username: yup
    .string('Enter your username')
    .min(3, 'Username should be of minimum 3 characters long')
    .required('Username is required'),
  name: yup
    .string('Enter your name')
    .min(3, 'Name should be of minimum 3 characters long')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Email is not valid')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters long')
    .required('Password is required'),
});

export const TaskSchema = yup.object({
  title: yup
    .string('Enter the title')
    .min(3, 'Title should be of minimum 3 characters long')
    .required('Title is required'),
  projectId: yup
    .number()
    .nullable()
    .transform(transformIds)
    .required('Reporter is required'),
  statusId: yup
    .number()
    .nullable()
    .transform(transformIds),
  typeId: yup
    .number()
    .nullable()
    .transform(transformIds)
    .required('Type is required'),
  priorityId: yup
    .number()
    .nullable()
    .transform(transformIds),
  userId: yup
    .number()
    .nullable()
    .transform(transformIds),
  createdBy: yup
    .number()
    .nullable()
    .transform(transformIds),
});

export const StatusSchema = yup.object({
  title: yup
    .string('Enter the title')
    .min(3, 'Title should be of minimum 3 characters long')
    .required('Title is required'),
  isDefault: yup.boolean(),
  addTasks: yup.boolean(),
})

export const ProjectSchema = yup.object({
  title: yup
    .string('Enter the title')
    .min(3, 'Title should be of minimum 3 characters long')
    .required('Title is required'),
  alias: yup
    .string('Enter the alias')
    .min(2, 'Alias should be of minimum 2 characters long')
    .max(6, 'Alias should be of maximum 6 characters long')
    .required('Alias is required. It will be shown on the board'),
  isDefault: yup.boolean(),
})

export const TaskTypeSchema = yup.object({
  title: yup
    .string('Enter the title')
    .min(3, 'Title should be of minimum 3 characters long')
    .required('Title is required'),
  alias: yup
    .string('Enter the alias'),
  color: yup
    .string('Enter the color')
    .required('Color is required'),
  isDefault: yup.boolean(),
})

export const TaskPrioritySchema = yup.object({
  title: yup
    .string('Enter the title')
    .min(3, 'Title should be of minimum 3 characters long')
    .required('Title is required'),
  alias: yup
    .string('Enter the alias'),
  color: yup
    .string('Enter the color')
    .required('Color is required'),
  isDefault: yup.boolean(),
})

export const UpdateUserSchema = yup.object({
  username: yup
    .string('Enter your username')
    .min(3, 'Username should be of minimum 3 characters long')
    .required('Username is required'),
  name: yup
    .string('Enter your name')
    .min(3, 'Name should be of minimum 3 characters long')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Email is not valid')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters long')
    .optional(),
});


