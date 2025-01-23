import { InputHTMLAttributes } from "react";
import { FieldProps } from "formik";
import { cn } from "@/lib/utils";

interface IFormItem {
  label?: string;
  helperText?: string;
}

export default function FormItem({
  label,
  helperText,
  field,
  form,
  ...rest
}: IFormItem & InputHTMLAttributes<any> & FieldProps) {
  const { touched, errors } = form;
  const errorMsg = errors[field.name];
  const hasError = touched[field.name] && errorMsg;

  return (
    <label className="form-control w-full">
      {label ? (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      ) : null}

      <input
        type="text"
        {...rest}
        {...field}
        className={cn(
          "input input-bordered w-full",
          rest.className,
          hasError && "input-error",
        )}
      />

      {hasError || helperText ? (
        <div className="label">
          <span className={cn("label-text-alt", hasError && "text-error")}>
            {errorMsg?.toString() || helperText}
          </span>
        </div>
      ) : null}
    </label>
  );
}
