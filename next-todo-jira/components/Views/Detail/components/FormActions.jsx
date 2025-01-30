import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useFormikContext} from "formik";
import {setDetails, setError} from "@/components/Views/Detail/store/actions";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import {useTransition} from "react";
import {LoaderIcon} from "lucide-react";

const FormActions = ({path = '/', isCreateMode}) => {
  const router = useRouter()
  const [{submitAction}, dispatch] = useDetailsContext()
  const {values, resetForm} = useFormikContext();
  const [isLoading, setTransition] = useTransition()

  const handleSubmit = (mode) => {
    setTransition(async () => {
      const {data: actionData, error} = await submitAction(values)
      if (actionData) {
        if (mode === 'save&close') {
          router.replace(path)
        } else {
          if (isCreateMode) {
            dispatch(setDetails(actionData))
            router.replace(`${path}/edit/${actionData.id}`)
          } else {
            router.refresh()
          }
        }
      }
      if (error) {
        dispatch(setError(error))
      }
    })
  }

  return (
    isLoading ? <LoaderIcon className="animate-spin"/> :
      <>
        <Button
          key={'save'}
          type="button"
          className="bg-green-500"
          onClick={() => handleSubmit('save')}
        >
          Save
        </Button>

        <Button
          key={'save&close'}
          type="button"
          variant="outline"
          title={path}
          className="text-green-500 border-green-500"
          onClick={() => handleSubmit('save&close')}
        >
          Save & Close
        </Button>

        <Button
          key={'cancelBtn'}
          type="button"
          variant="outline"
          onClick={() => {
            resetForm()
            router.back()
          }}
        >
          Cancel
        </Button>
      </>
  );
};

export default FormActions;