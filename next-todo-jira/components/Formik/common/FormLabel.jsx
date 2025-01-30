import {cn} from "@/lib/utils/utils";
import {Label} from "@/components/ui/label";

export default function FormLabel({label, id, isError, required}) {
  if (!label) return null

  return (
    <Label htmlFor={id} className={cn(isError && 'text-destructive')}>
      {label}{required && '*'}
    </Label>
  );
}