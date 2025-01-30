'use client';

import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Eye, EyeOff} from 'lucide-react';
import {Button} from '@/components/ui/button';
import FormControl from "@/components/Formik/common/FormControl";
import FormLabel from "@/components/Formik/common/FormLabel";
import FormHelperText from "@/components/Formik/common/FormHelperText";

const InputField = ({
  label,
  type = 'text',
  required,
  helperText,
  className,
  field: {name},
  form: {
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
  },
  ...props
}) => {
  const id = `${name}-form-item`;
  const isError = errors[name] && touched[name];
  const error = errors[name];

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl className={className}>
      <FormLabel label={label} id={id} isError={isError} required={required}/>

      <div className="relative flex">
        <Input
          id={id}
          type={type === 'password' ? showPassword ? 'text' : 'password' : type}
          required={required}
          autoComplete="off"
          name={name}
          value={values[name] || ''}
          error={error}
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
          className="w-full"
        />

        {type === 'password' ? (
          <Button type="button" variant="ghost" onClick={handleShowPassword} className="absolute top-0 right-0">
            {showPassword ? <Eye/> : <EyeOff/>}
          </Button>
        ) : null}
      </div>

      <FormHelperText show={isError || helperText} isError={isError}>
        {error || helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default InputField;