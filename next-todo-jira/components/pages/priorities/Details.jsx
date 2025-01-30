'use client'
import DetailsView from "@/components/Views/Detail";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import Fields from "@/components/pages/priorities/Fields";
import DetailsWrapper from "@/components/Views/Detail/components/DetailsWrapper";

function Component({config}) {
  const [{data}] = useDetailsContext()

  const initialValues = {
    title: data?.title || '',
    alias: data?.alias || '',
    description: data?.description || '',
    color: data?.color || '#3192e7',
    isDefault: data?.isDefault || false,
  }

  return (
    <DetailsView
      config={config}
      formTitle={data?.title}
      initialValues={initialValues}
    >
      <Fields/>
    </DetailsView>
  );
}

export default DetailsWrapper(Component)