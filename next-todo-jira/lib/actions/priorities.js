'use server';
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from "@/lib/constants";
import {db} from "@/lib/database/prisma";

export const getListOfPriorities = async (options = {}) => {
  const {
    limit = DEFAULT_PAGE_SIZE,
    offset = DEFAULT_PAGE_INDEX,
    q = '',
  } = options

  const queryOptions = {
    where: {
      title: {
        contains: q,
        mode: 'insensitive',
      },
    }
  }

  try {
    const [count, priorities] = await prisma.$transaction([
      db.taskPriority.count(queryOptions),
      db.taskPriority.findMany({
        ...queryOptions,
        orderBy: {
          order: 'asc',
        },
        take: limit,
        skip: offset * limit,
      }),
    ]);

    return {data: {count, rows: priorities}};
  } catch (err) {
    console.error('Failed to fetch priorities', err);
    return {error: err.message};
  }
};

export const setDefaultPriority = async (id) => {
  // if (!id || id === 'undefined') return;
  //
  // try {
  //   const priority = await TaskPriority.findByPk(id);
  //   if (!priority) {
  //     return {error: 'Priority not found'};
  //   }
  //
  //   const prevDefault = await TaskPriority.findOne({
  //     where: {isDefault: true, id: {[Op.ne]: id}},
  //   });
  //   if (prevDefault) {
  //     await prevDefault.update({isDefault: false});
  //     await prevDefault.save();
  //   }
  //
  //   await priority.update({isDefault: true});
  //   await priority.save();
  //
  //   return {success: 'Priority was set as default'};
  // } catch (err) {
  //   console.error('Failed to set default priority', err);
  //   return {error: err.message};
  // }
};

export const deletePriority = async (id) => {
  // if (!id || id === 'undefined') return;
  //
  // try {
  //   const priority = await TaskPriority.findByPk(id);
  //   if (!priority) {
  //     return {error: 'Priority not found'};
  //   }
  //
  //   await priority.destroy();
  //
  //   return {success: 'Priority was deleted'};
  // } catch (err) {
  //   console.error('Failed to delete priority', err);
  //   return {error: err.message};
  // }
};

export const createPriority = async (body) => {
  // if (!body) return
  //
  // try {
  //   // check if fields are valid
  //   const isValid = TaskPrioritySchema.isValid(body)
  //   if (!isValid) {
  //     return {error: 'Invalid fields'}
  //   }
  //
  //   // check if same title or alias already in use
  //   const isExist = await TaskPriority.findOne({
  //     where: {
  //       [Op.or]: [{title: body.title}, {alias: body.alias}]
  //     }
  //   })
  //   if (isExist) {
  //     return {error: 'Title or alias already in use'}
  //   }
  //
  //   // check if other type is already set as default
  //   if (body.isDefault) {
  //     const prevDefault = await TaskPriority.findOne({
  //       where: {isDefault: true},
  //     })
  //     if (prevDefault) {
  //       await prevDefault.update({isDefault: false});
  //       await prevDefault.save();
  //     }
  //   }
  //
  //   const count = await TaskPriority.count()
  //   const priority = await TaskPriority.create({
  //     ...body,
  //     order: count
  //   })
  //
  //   return {data: toJSON(priority)}
  // } catch (err) {
  //   console.error('Failed to create priority', err)
  //   return {error: err.message}
  // }
}

export const getPriorityById = async (id) => {
  // try {
  //   const priority = await TaskPriority.findByPk(id)
  //
  //   return {data: toJSON(priority)}
  // } catch (err) {
  //   console.error('Failed to fetch priority', err)
  //   return {error: err.message}
  // }
}

export const updatePriority = async (body, id) => {
  // if (!id || id === 'undefined' || !body) return
  //
  // try {
  //   const priority = await TaskPriority.findByPk(id)
  //   if (!priority) {
  //     return {error: 'Priority not found'}
  //   }
  //
  //   // check if fields are valid
  //   const isValid = TaskPrioritySchema.isValid(body)
  //   if (!isValid) {
  //     return {error: 'Invalid fields'}
  //   }
  //
  //   // check if same title or alias already in use
  //   const isExist = await TaskPriority.findOne({
  //     where: {
  //       [Op.or]: [{title: body.title}, {alias: body.alias}],
  //       id: {[Op.ne]: id}
  //     }
  //   })
  //   if (isExist) {
  //     return {error: 'Title or alias already in use'}
  //   }
  //
  //   // check if other type is already set as default
  //   if (body.isDefault) {
  //     const prevDefault = await TaskPriority.findOne({
  //       where: {isDefault: true, id: {[Op.ne]: id}},
  //     })
  //     if (prevDefault) {
  //       await prevDefault.update({isDefault: false});
  //       await prevDefault.save();
  //     }
  //   }
  //
  //   await priority.update(body)
  //   await priority.save()
  //   revalidatePath('/priorities/edit/[id]', 'page')
  //
  //   return {data: toJSON(priority)}
  // } catch (err) {
  //   console.error('Failed to update priority', err)
  //   return {error: err.message}
  // }
}