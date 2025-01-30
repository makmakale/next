import {Form as FormikForm, Formik} from 'formik';
import FormMessage from "@/components/ui/form-message";

const Form = ({
  children,
  ...props
}) => {
  return (
    <Formik {...props}>
      {({errors, submitCount}) => (
        <FormikForm>
          {submitCount > 0 && <FormMessage message={Object.values(errors)[0]} variant="error"/>}
          {children}
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;