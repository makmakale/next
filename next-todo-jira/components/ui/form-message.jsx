import {cn} from "@/lib/utils/utils";

const MessageIcon = ({className}) => {
  return (
    <svg className={cn("flex-shrink-0 w-4 h-4", className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
         fill="currentColor" viewBox="0 0 20 20">
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
  )
}

const ButtonIcon = ({className}) => {
  return (
    <svg className={cn("w-3 h-3", className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 14 14">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  )
}

const variants = {
  primary: {
    container: 'text-blue-800 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800',
    button: 'bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700',
  },
  error: {
    container: 'text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800',
    button: 'bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700',
  },
  success: {
    container: 'text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800',
    button: 'bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700',
  }
}

const FormMessage = ({variant = 'primary', message, onClose}) => {
  if (!message) return null

  return (
    <div
      id="alert"
      className={cn("flex items-center p-4 mb-4 border-t-4", variants[variant].container)}
      role="alert"
    >
      <MessageIcon/>

      <div className="ms-3 text-sm font-medium">
        {message}
      </div>

      {onClose ? (
        <button
          type="button"
          className={cn("ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8", variants[variant].button)}
          data-dismiss-target="#alert" aria-label="Close"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <ButtonIcon/>
        </button>
      ) : null}
    </div>
  );
};

export default FormMessage;