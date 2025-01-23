import { useSystemMessages } from "@/context/system-messages";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  success: {
    className: "alert-success",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          color="#fff"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    textColor: "text-white",
  },
  error: {
    className: "alert-error",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          color="#fff"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    textColor: "text-white",
  },
};

export default function SystemMessage() {
  const { success, error, setSuccessMessage, setErrorMessage } =
    useSystemMessages();

  if (!success && !error) return null;

  const variant = success ? variants.success : variants.error;
  const onClose = () => (success ? setSuccessMessage : setErrorMessage);

  return (
    <div role="alert" className={cn("alert", variant.className)}>
      {variant.icon}
      <span className={variant.textColor}>{success}</span>
      <div>
        <button className="btn btn-sm btn-circle" onClick={onClose}>
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
