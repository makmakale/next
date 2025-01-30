'use client';

import {cn} from '@/lib/utils/utils';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useEffect, useState} from 'react';
import FormControl from "@/components/Formik/common/FormControl";
import FormLabel from "@/components/Formik/common/FormLabel";
import FormHelperText from "@/components/Formik/common/FormHelperText";

const SelectField = ({
  label,
  options,
  helperText,
  required,
  className,
  field: {name, value},
  form: {
    touched,
    errors,
    setFieldValue,
  },
}) => {
  const id = `${name}-form-item`;
  const isError = errors[name] && touched[name];
  const error = isError && errors[name];

  const [localOptions, setOptions] = useState(options || []);

  useEffect(() => {
    if (!options || localOptions.length > 0) return
    setOptions(options)
  }, [options, localOptions])

  const getOptionLabel = val => localOptions.find(item => item.value == val)?.label || ''

  const onValueChange = selectedValue => {
    setFieldValue(name, `${selectedValue}`);
  };

  useEffect(() => {
    if (localOptions.length === 0) return

    if (!value) {
      const defaultValue = localOptions.find(opt => opt.isDefault)?.value || '';
      onValueChange(defaultValue);
    }
    // eslint-disable-next-line
  }, [localOptions, value])

  return (
    <FormControl className={className}>
      <FormLabel label={label} id={id} isError={isError} required={required}/>

      <div className="relative flex">
        <Select
          defaultValue={value}
          onValueChange={onValueChange}
          required={required}
        >
          <RenderSelectTrigger
            id={id}
            name={name}
            value={getOptionLabel(value)}
            error={error}
          />

          <SelectContent side="bottom">
            <SelectGroup>
              {localOptions.map(({label, value}) => (
                <SelectItem key={value} value={`${value}`}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <FormHelperText show={isError || helperText} isError={isError}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

function RenderSelectTrigger({id, name, error, value}) {
  if (!!error) {
    return (
      <p className={cn('w-full text-left')}>
        {error}
      </p>
    )
  }

  return (
    <SelectTrigger
      id={id}
      name={name}
      className={cn(error && 'text-destructive')}
    >
      <SelectValue placeholder={value}/>
    </SelectTrigger>
  )
}

export default SelectField;