'use server'

import {db} from "@/lib/database/prisma";

export const getBoard = async () => {
  try {
    const boards = await db.status.findMany({
      include: {
        tasks: {
          include: {
            project: true,
            assignee: true,
            priority: true,
            type: true,
          },
          orderBy: [{order: 'asc'}],
        },
      },
      orderBy: [{order: 'asc'}],
    })
    // const boards = await Status.findAll({
    //   attributes: ['id', 'title', 'addTask'],
    //   order: [
    //     'order',
    //     [Task, 'order']
    //   ],
    //   include: [
    //     {
    //       model: Task,
    //       as: 'tasks',
    //       attributes: ['id', 'title'],
    //       include: [
    //         {
    //           model: Project,
    //           as: 'project',
    //           attributes: ['alias', 'description']
    //         },
    //         {
    //           model: User,
    //           as: 'assignee',
    //           attributes: ['name', 'username', 'image']
    //         },
    //         {
    //           model: TaskPriority,
    //           as: 'priority',
    //           attributes: ['title', 'color']
    //         },
    //         {
    //           model: TaskType,
    //           as: 'type',
    //           attributes: ['title', 'color']
    //         }
    //       ]
    //     }
    //   ]
    // })
    //
    // return {data: toJSON(boards)}
    return {data: boards}
  } catch (err) {
    console.error('Failed to fetch board', err)
    return {error: err.message}
  }
}

export const reorderColumns = async (data = {}) => {
  // try {
  //   const {id, newOrder, oldOrder} = data
  //
  //   const columns = await Status.findAll({
  //     where: {
  //       id: {
  //         [Op.ne]: id
  //       },
  //       order: {
  //         [Op.and]: {
  //           [Op.gte]: newOrder > oldOrder ? oldOrder : newOrder,
  //           [Op.lte]: newOrder > oldOrder ? newOrder : oldOrder
  //         }
  //       }
  //     }
  //   })
  //
  //   for (const column of columns) {
  //     await column.update({order: newOrder > oldOrder ? column.order - 1 : column.order + 1})
  //     await column.save()
  //   }
  //
  //   const targetColumn = await Status.findByPk(id)
  //   await targetColumn.update({order: newOrder})
  //   await targetColumn.save()
  //
  //   return {success: true}
  // } catch (err) {
  //   console.error('Failed to reorder columns', err)
  //   return {error: err.message}
  // }
}

export const reorderTasks = async (data = {}) => {
  // try {
  //   const {id, statusId, newOrder, oldOrder} = data
  //
  //   const tasks = await Task.findAll({
  //     where: {
  //       id: {
  //         [Op.ne]: id
  //       },
  //       statusId,
  //       order: {
  //         [Op.and]: {
  //           [Op.gte]: newOrder > oldOrder ? oldOrder : newOrder,
  //           [Op.lte]: newOrder > oldOrder ? newOrder : oldOrder
  //         }
  //       }
  //     }
  //   })
  //
  //   for (const task of tasks) {
  //     await task.update({order: newOrder > oldOrder ? task.order - 1 : task.order + 1})
  //     await task.save()
  //   }
  //
  //   const targetTask = await Task.findByPk(id)
  //   await targetTask.update({order: newOrder, statusId})
  //   await targetTask.save()
  //
  //   return {success: true}
  // } catch (err) {
  //   console.error('Failed to reorder tasks', err)
  //   return {error: err.message}
  // }
}