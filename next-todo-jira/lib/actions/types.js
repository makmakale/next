'use server';
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from "@/lib/constants";
import {db} from "@/lib/database/prisma";

export const getListOfTypes = async (options = {}) => {
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
    const [count, types] = await prisma.$transaction([
      db.taskType.count(queryOptions),
      db.taskType.findMany({
        ...queryOptions,
        orderBy: {
          order: 'asc',
        },
        take: limit,
        skip: offset * limit,
      }),
    ]);

    return {data: {count, rows: types}};
  } catch (err) {
    console.error('Failed to fetch types', err);
    return {error: err.message};
  }
};

export const setDefaultType = async (id) => {
  // if (!id || id === 'undefined') return;
  //
  // try {
  //   const type = await TaskType.findByPk(id);
  //   if (!type) {
  //     return {error: 'Type not found'};
  //   }
  //
  //   const prevDefault = await TaskType.findOne({
  //     where: {isDefault: true, id: {[Op.ne]: id}},
  //   });
  //   if (prevDefault) {
  //     await prevDefault.update({isDefault: false});
  //     await prevDefault.save();
  //   }
  //
  //   await type.update({isDefault: true});
  //   await type.save();
  //
  //   return {success: 'Type was set as default'};
  // } catch (err) {
  //   console.error('Failed to set default type', err);
  //   return {error: err.message};
  // }
};

export const deleteType = async (id) => {
  // if (!id || id === 'undefined') return;
  //
  // try {
  //   const type = await TaskType.findByPk(id);
  //   if (!type) {
  //     return {error: 'Type not found'};
  //   }
  //
  //   await type.destroy();
  //
  //   return {success: 'Type was deleted'};
  // } catch (err) {
  //   console.error('Failed to delete type', err);
  //   return {error: err.message};
  // }
};

export const createType = async (body) => {
  // if (!body) return
  //
  // try {
  //   // check if fields are valid
  //   const isValid = TaskTypeSchema.isValid(body)
  //   if (!isValid) {
  //     return {error: 'Invalid fields'}
  //   }
  //
  //   // check if same title or alias already in use
  //   const isExist = await TaskType.findOne({
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
  //     const prevDefault = await TaskType.findOne({
  //       where: {isDefault: true},
  //     })
  //     if (prevDefault) {
  //       await prevDefault.update({isDefault: false});
  //       await prevDefault.save();
  //     }
  //   }
  //
  //   const count = await TaskType.count()
  //   const type = await TaskType.create({
  //     ...body,
  //     order: count
  //   })
  //
  //   return {data: toJSON(type)}
  // } catch (err) {
  //   console.error('Failed to update type', err)
  //   return {error: err.message}
  // }
}

export const getTypeById = async (id) => {
  // try {
  //   const type = await TaskType.findByPk(id)
  //
  //   return {data: toJSON(type)}
  // } catch (err) {
  //   console.error('Failed to fetch type', err)
  //   return {error: err.message}
  // }
}

export const updateType = async (body, id) => {
  // if (!id || id === 'undefined' || !body) return
  //
  // try {
  //   // check if type is exists
  //   const type = await TaskType.findByPk(id)
  //   if (!type) {
  //     return {error: 'Type not found'}
  //   }
  //
  //   // check if fields are valid
  //   const isValid = TaskTypeSchema.isValid(body)
  //   if (!isValid) {
  //     return {error: 'Invalid fields'}
  //   }
  //
  //   // check if same title or alias already in use
  //   const isExist = await TaskType.findOne({
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
  //     const prevDefault = await TaskType.findOne({
  //       where: {isDefault: true, id: {[Op.ne]: id}},
  //     })
  //     if (prevDefault) {
  //       await prevDefault.update({isDefault: false});
  //       await prevDefault.save();
  //     }
  //   }
  //
  //   await type.update(body)
  //   await type.save()
  //   revalidatePath('/types/edit/[id]', 'page')
  //
  //   return {data: toJSON(type)}
  // } catch (err) {
  //   console.error('Failed to update type', err)
  //   return {error: err.message}
  // }
}