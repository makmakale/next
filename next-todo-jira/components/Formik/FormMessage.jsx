import {cn} from "@/lib/utils/utils";

const FormMessage = ({className, message, ...props}) => {
  if (!message) return null

  return (
    <p
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {message}
    </p>
  );
};

export default FormMessage;