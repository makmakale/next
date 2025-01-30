'use client'
import DetailsView from "@/components/Views/Detail";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import Fields from "@/components/pages/users/Fields";
import DetailsWrapper from "@/components/Views/Detail/components/DetailsWrapper";

function Component({config, user}) {
  const [{data}] = useDetailsContext()

  const initialValues = {
    username: data?.username || '',
    name: data?.name || '',
    email: data?.email || '',
    password: '',
    isActive: data?.isActive || true,
  }

  return (
    <DetailsView
      config={config}
      formTitle={data?.title}
      initialValues={initialValues}
    >
      <Fields isCreateMode={config.isCreateMode} isActiveDisabled={data?.id === user.id}/>
    </DetailsView>
  );
}

export default DetailsWrapper(Component)