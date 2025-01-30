import {cn} from "@/lib/utils/utils";

export default function FormControl({className, children}) {
  return (
    <div className={cn('space-y-2 mb-4', className)}>
      {children}
    </div>
  );
}