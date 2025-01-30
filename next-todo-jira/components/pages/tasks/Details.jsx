'use client'
import DetailsView from "@/components/Views/Detail";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import Fields from "@/components/pages/tasks/Fields";
import DetailsWrapper from "@/components/Views/Detail/components/DetailsWrapper";

function Component({config, user, searchParams}) {
  const {isCreateMode, isEditMode} = config
  const [{data}] = useDetailsContext()

  const initialValues = {
    title: data?.title || '',
    projectId: data?.projectId || '',
    description: data?.description || '',
    statusId: isCreateMode ? (searchParams.statusId || '') : data?.statusId,
    userId: data?.userId || '',
    typeId: data?.typeId || '',
    priorityId: data?.priorityId || '',
    createdBy: isCreateMode ? user.id : data?.createdBy
  }


  return (
    <DetailsView
      config={config}
      formTitle={data?.title}
      initialValues={initialValues}
    >
      <Fields
        user={isCreateMode ? user : data?.reporter}
        showSubtasks={isEditMode && data?.type?.subtasksAllowed && !data?.parentId}
      />
    </DetailsView>
  );
}

export default DetailsWrapper(Component)