import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {setMessage} from "@/components/Views/Table/store/actions";
import {useTableContext} from "@/components/Views/Table/store/table-context";
import {useState} from "react";
import {get} from "@/lib/utils/data";
import {Switch} from "@/components/ui/switch";
import {Tooltip, TooltipProvider, TooltipTrigger} from "@radix-ui/react-tooltip";
import {TooltipContent} from "@/components/ui/tooltip";
import {useSession} from "next-auth/react";

const DisableAction = ({row, col, reloadData, onDelete}) => {
  const {data: session} = useSession()
  const loggedUser = session?.user

  const value = get(row, col.id)
  const [open, setOpen] = useState(false)
  const [, dispatch] = useTableContext()

  const handleConfirm = async () => {
    const {success, error} = await onDelete(row.id)

    if (success && reloadData) {
      dispatch(setMessage('success', success))
      reloadData()
    }
    if (error) {
      dispatch(setMessage('error', error))
    }
    setOpen(false)
  }

  const isCurrentUser = loggedUser?.id === row.id
  const disabled = !loggedUser.isAdmin || isCurrentUser
  const tooltipMessage = isCurrentUser
    ? "You can't disable yourself"
    : !loggedUser.isAdmin ? "You don't have rights" : null

  return (
    <>
      {disabled ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Switch
                checked={value}
                onChange={value ? () => setOpen(true) : handleConfirm}
                disabled={disabled}
                className="disabled:bg-gray-300 dark:disabled:bg-gray-50"
              />
            </TooltipTrigger>
            <TooltipContent>
              {tooltipMessage}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Switch
          checked={value}
          onChange={value ? () => setOpen(true) : handleConfirm}
        />
      )}

      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will deactivate this user.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="sm:justify-start">
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>

  );
};

export default DisableAction;