import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function LoadingButton({
  isLoading,
  className,
  children,
  ...rest
}: {
  isLoading?: boolean;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<any>) {
  return (
    <button
      type="submit"
      className={cn("btn btn-primary", className)}
      disabled={isLoading}
      {...rest}
    >
      {isLoading && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}
