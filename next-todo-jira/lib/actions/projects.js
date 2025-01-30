'use server';
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from "@/lib/constants";
import {db} from "@/lib/database/prisma";
import {ProjectSchema} from "@/lib/form/validation";

export const getListOfProjects = async (options = {}) => {
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
    const [count, projects] = await prisma.$transaction([
      db.project.count(queryOptions),
      db.project.findMany({
        ...queryOptions,
        orderBy: {
          order: 'asc',
        },
        take: limit,
        skip: offset * limit,
      }),
    ]);

    return {data: {count, rows: projects}};
  } catch (err) {
    console.error('Failed to fetch projects', err);
    return {error: err.message};
  }
};

export const setDefaultProject = async (id) => {
  if (!id || id === 'undefined') return;

  try {
    const project = await db.project.findUnique({where: {id}});
    if (!project) {
      return {error: 'Project not found'};
    }

    await db.project.updateMany({
      where: {isDefault: true, NOT: {id}},
      data: {isDefault: false}
    });

    await db.project.update({where: {id}, data: {isDefault: true}});

    return {success: 'Project was set as default'};
  } catch (err) {
    console.error('Failed to set default project', err);
    return {error: err.message};
  }
};

export const deleteProject = async (id) => {
  // if (!id || id === 'undefined') return;
  //
  // try {
  //   const project = await Project.findOne({
  //     where: {id},
  //     include: [{model: Task, attributes: ['id']}],
  //   });
  //   if (!project) {
  //     return {error: 'Project not found'};
  //   }
  //
  //   if (project.tasks.length > 0) {
  //     return {error: 'Project contain tasks. Please delete or move them first.'};
  //   }
  //
  //   await project.destroy();
  //
  //   return {success: 'Project was deleted'};
  // } catch (err) {
  //   console.error('Failed to delete project', err);
  //   return {error: err.message};
  // }
};

export const createProject = async (body) => {
  if (!body) return

  try {
    // check if fields are valid
    await ProjectSchema.validate(body)
    const {title, alias, isDefault} = ProjectSchema.cast(body)

    // check if same title or alias already in use
    const isExist = await db.project.findFirst({
      where: {
        OR: [{title}, {alias}],
      },
    });

    if (isExist) {
      return {error: 'Title or alias already in use'}
    }

    // check if other project is already set as default
    if (isDefault) {
      await db.project.updateMany({
        where: {isDefault: true},
        data: {isDefault: false}
      });
    }

    const count = await db.project.count()
    const project = await db.project.create({
      data: {
        ...body,
        order: count
      }
    })

    return {data: project}
  } catch (err) {
    console.error('Failed to create project', err)
    return {error: err.message}
  }
}

export const getProjectById = async (id) => {
  id = +id
  if (!id || id === 'undefined') return

  try {
    const project = await db.project.findUnique({where: {id}})

    return {data: project}
  } catch (err) {
    console.error('Failed to fetch project', err)
    return {error: err.message}
  }
}

export const updateProject = async (body, id) => {
  // if (!id || id === 'undefined' || !body) return
  //
  // try {
  //   // check if project is exists
  //   const project = await Project.findByPk(id)
  //   if (!project) {
  //     return {error: 'Project not found'}
  //   }
  //
  //   // check if fields are valid
  //   const isValid = ProjectSchema.isValid(body)
  //   if (!isValid) {
  //     return {error: 'Invalid fields'}
  //   }
  //
  //   // check if same title or alias already in use
  //   const isExist = await Project.findOne({
  //     where: {
  //       [Op.or]: [{title: body.title}, {alias: body.alias}],
  //       id: {[Op.ne]: id}
  //     }
  //   })
  //   if (isExist) {
  //     return {error: 'Title or alias already in use'}
  //   }
  //
  //   // check if other project is already set as default
  //   if (body.isDefault) {
  //     const prevDefault = await Project.findOne({
  //       where: {isDefault: true, id: {[Op.ne]: id}},
  //     })
  //     if (prevDefault) {
  //       await prevDefault.update({isDefault: false});
  //       await prevDefault.save();
  //     }
  //   }
  //
  //   await project.update(body)
  //   await project.save()
  //   revalidatePath('/projects/edit/[id]', 'page')
  //
  //   return {data: toJSON(project)}
  // } catch (err) {
  //   console.error('Failed to update project', err)
  //   return {error: err.message}
  // }
}