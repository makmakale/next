'use client'
import Form from '@/components/Formik/Form';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import FormMessage from "@/components/ui/form-message";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import {clearMessages} from "@/components/Views/Detail/store/actions";
import PageTitle from "@/components/Views/Table/components/page-title";
import Loader from "@/components/Views/Detail/components/Loader";
import FormActions from "@/components/Views/Detail/components/FormActions";

const DetailsView = ({
  config,
  initialValues,
  formTitle,
  children,
}) => {
  const {
    pageTitle,
    validationSchema,
    redirectPath
  } = config

  const [{isLoading, error, success}, dispatch] = useDetailsContext()

  return (
    <div className={'w-full h-full p-4 lg:p-10'}>
      <PageTitle title={pageTitle}/>

      <Form
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <FormMessage
          variant={success ? 'success' : 'error'}
          message={success || error}
          onClose={() => dispatch(clearMessages())}
        />

        <div className="w-full flex space-x-2">
          {isLoading ? <Loader/> :
            <Card className="flex-grow-[4]">
              <CardHeader>
                {!!formTitle && <CardTitle>{formTitle}</CardTitle>}
              </CardHeader>

              <CardContent>
                {children}
              </CardContent>

              <CardFooter className="space-x-2">
                <FormActions path={redirectPath} isCreateMode={config.isCreateMode}/>
              </CardFooter>
            </Card>}
        </div>
      </Form>
    </div>
  );
};

export default DetailsView;