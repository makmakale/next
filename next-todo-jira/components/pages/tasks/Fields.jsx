import FormField from "@/components/Formik/FormField";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import EditorField from '@/components/Formik/fields/EditorField'
import SelectField from '@/components/Formik/fields/SelectField'
import UserWithAvatarField from '@/components/Formik/fields/UserWithAvatarField'
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import SubTasks from "@/components/pages/tasks/SubTasks";

export default function Fields({user, showSubtasks}) {
  const [{options}] = useDetailsContext()

  return (
    <div className="flex lg:space-x-4 flex-wrap lg:flex-nowrap">
      <div className="w-full flex flex-col">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <FormField
            name="title"
            label="Title"
            className={"w-full"}
            required
          />
          <FormField
            name="projectId"
            label="Project"
            options={options?.project}
            required
            className={"w-full md:w-1/4 md:min-w-[180px]"}
            component={SelectField}/>
        </div>

        <FormField
          name="description"
          label="Description"
          className="w-full flex-grow mb-0"
          component={EditorField}
        />

        <SubTasks show={showSubtasks}/>
      </div>

      <div className="w-full lg:max-w-[350px]">
        <FormField
          name="statusId"
          label="Status"
          options={options?.status}
          component={SelectField}/>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>

          <CardContent>
            <FormField
              name="userId"
              label="Assignee"
              options={options?.assignee}
              component={SelectField}/>

            <FormField
              name="typeId"
              label="Type"
              options={options?.type}
              required
              component={SelectField}/>

            <FormField
              name="priorityId"
              label="Priority"
              options={options?.priority}
              component={SelectField}/>

            <FormField
              name="createdBy"
              user={user}
              component={UserWithAvatarField}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}