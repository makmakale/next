import { Field, FieldAttributes, FieldConfig } from "formik";

export default function FormikField(props: FieldConfig & FieldAttributes<any>) {
  return <Field {...props} />;
}
