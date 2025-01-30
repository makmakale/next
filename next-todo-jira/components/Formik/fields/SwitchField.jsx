import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import FormControl from "@/components/Formik/common/FormControl";
import FormLabel from "@/components/Formik/common/FormLabel";
import FormHelperText from "@/components/Formik/common/FormHelperText";

const SwitchField = ({
  label,
  mappedLabel,
  helperText,
  className,
  field: {name, value},
  form: {
    setFieldValue,
    touched,
    errors,
  },
  ...props
}) => {
  const id = `${name}-form-item`;
  const isError = errors[name] && touched[name];
  const error = errors[name];

  return (
    <FormControl className={className}>
      <FormLabel label={label} id={id} isError={isError}/>

      <div className="flex items-center space-x-2">
        <Switch
          id={id}
          checked={value}
          onCheckedChange={val => setFieldValue(name, val)}
          {...props}
        />
        <Label htmlFor={id}>{mappedLabel[Number(value)]}</Label>
      </div>

      <FormHelperText show={isError || helperText} isError={isError}>
        {error || helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default SwitchField;