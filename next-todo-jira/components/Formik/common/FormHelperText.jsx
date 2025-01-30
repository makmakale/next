import {cn} from "@/lib/utils/utils";

export default function FormHelperText({show, isError, children}) {
  if (!show) return null

  return (
    <p className={cn('text-sm text-muted-foreground', isError && 'text-destructive')}>
      {children}
    </p>
  );
}