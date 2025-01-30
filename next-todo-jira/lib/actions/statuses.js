'use server';
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from "@/lib/constants";
import {db} from "@/lib/database/prisma";

export const getListOfStatuses = async (options = {}) => {
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
    const [count, statuses] = await prisma.$transaction([
      db.status.count(queryOptions),
      db.status.findMany({
        ...queryOptions,
        orderBy: {
          order: 'asc',
        },
        take: limit,
        skip: offset * limit,
      }),
    ]);

    return {data: {count, rows: statuses}};
  } catch (err) {
    console.error('Failed to fetch statuses', err);
    return {error: err.message};
  }
};

export const setDefaultStatus = async (id) => {
  // if (!id || id === 'undefined') return;
  //
  // try {
  //   const status = await Status.findByPk(id);
  //   if (!status) {
  //     return {error: 'Status not found'};
  //   }
  //
  //   const prevDefault = await Status.findOne({
  //     where: {isDefault: true, id: {[Op.ne]: id}},
  //   });
  //   if (prevDefault) {
  //     await prevDefault.update({isDefault: false});
  //     await prevDefault.save();
  //   }
  //
  //   await status.update({isDefault: true});
  //   await status.save();
  //
  //   return {success: 'Status was set as default'};
  // } catch (err) {
  //   console.error('Failed to set default status', err);
  //   return {error: err.message};
  // }
};

export const deleteStatus = async (id) => {
  // if (!id || id === 'undefined') return;
  //
  // try {
  //   const status = await Status.findOne({
  //     where: {id},
  //     include: [{model: Task, attributes: ['id']}],
  //   });
  //
  //   if (!status) {
  //     return {error: 'Status not found'};
  //   }
  //
  //   if (status.tasks.length > 0) {
  //     return {error: 'Status contain tasks. Please delete or move them first.'};
  //   }
  //
  //   await status.destroy();
  //
  //   return {success: 'Status was deleted'};
  // } catch (err) {
  //   console.error('Failed to delete status', err);
  //   return {error: err.message};
  // }
};

export const createStatus = async (body) => {
  // if (!body) return
  //
  // try {
  //   // check if fields are valid
  //   const isValid = StatusSchema.isValid(body)
  //   if (!isValid) {
  //     return {error: 'Invalid fields'}
  //   }
  //
  //   // check if same title already in use
  //   const isExist = await Status.findOne({
  //     where: {title: body.title}
  //   })
  //
  //   if (isExist) {
  //     return {error: 'Title already in use'}
  //   }
  //
  //   // check if other status is already set as default
  //   if (body.isDefault) {
  //     const prevDefault = await Status.findOne({
  //       where: {isDefault: true},
  //     })
  //     if (prevDefault) {
  //       await prevDefault.update({isDefault: false});
  //       await prevDefault.save();
  //     }
  //   }
  //
  //   const count = await Status.count()
  //   const status = await Status.create({
  //     ...body,
  //     order: count
  //   })
  //   revalidatePath('/statuses', 'page')
  //
  //   return {data: toJSON(status)}
  // } catch (err) {
  //   console.error('Failed to create status', err)
  //   return {error: err.message}
  // }
}

export const getStatusById = async (id) => {
  // if (!id || id === 'undefined') return
  //
  // try {
  //   const status = await Status.findByPk(id)
  //
  //   return {data: toJSON(status)}
  // } catch (err) {
  //   console.error('Failed to fetch status', err)
  //   return {error: err.message}
  // }
}

export const updateStatus = async (body, id) => {
  // if (!id || id === 'undefined' || !body) return
  //
  // try {
  //   // check if fields are valid
  //   const isValid = StatusSchema.isValid(body)
  //   if (!isValid) {
  //     return {error: 'Invalid fields'}
  //   }
  //
  //   // check if same title already in use
  //   const isExist = await Status.findOne({
  //     where: {
  //       title: body.title,
  //       id: {[Op.ne]: id}
  //     }
  //   })
  //
  //   if (isExist) {
  //     return {error: 'Title already in use'}
  //   }
  //
  //   // check if other status is already set as default
  //   if (body.isDefault) {
  //     const prevDefault = await Status.findOne({
  //       where: {isDefault: true, id: {[Op.ne]: id}},
  //     })
  //     if (prevDefault) {
  //       await prevDefault.update({isDefault: false});
  //       await prevDefault.save();
  //     }
  //   }
  //
  //   // check if status is exists
  //   const status = await Status.findByPk(id)
  //   if (!status) {
  //     return {error: 'Status not found'}
  //   }
  //
  //   await status.update(body)
  //   await status.save()
  //   revalidatePath('/statuses/edit/[id]', 'page')
  //
  //   return {data: toJSON(status)}
  // } catch (err) {
  //   console.error('Failed to update status', err)
  //   return {error: err.message}
  // }
}