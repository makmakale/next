import FormControl from "@/components/Formik/common/FormControl";
import FormLabel from "@/components/Formik/common/FormLabel";
import FormHelperText from "@/components/Formik/common/FormHelperText";
import InputField from "@/components/Formik/fields/InputField";

const ColorChooseField = ({
  label,
  helperText,
  className,
  field: {name, value},
  form,
  form: {
    touched,
    errors,
  },
}) => {
  const id = `${name}-form-item`;
  const isError = errors[name] && touched[name];
  const error = errors[name];

  return (
    <FormControl className={className}>
      <FormLabel label={label} id={id} isError={isError}/>

      <div className="flex items-center space-x-2">
        <InputField field={{name, value}} type={'color'} form={form} className="w-14"/>
        <InputField field={{name, value}} form={form} disabled/>
      </div>

      <FormHelperText show={isError || helperText} isError={isError}>
        {error || helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default ColorChooseField;