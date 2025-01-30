import {Field} from 'formik';
import InputField from '@/components/Formik/fields/InputField';

const FormField = ({...props}) => {
  return (
    <Field component={InputField} {...props} />
  );
};

export default FormField;