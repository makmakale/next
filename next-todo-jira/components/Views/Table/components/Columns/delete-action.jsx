import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {setMessage} from "@/components/Views/Table/store/actions";
import {useTableContext} from "@/components/Views/Table/store/table-context";

const DeleteAction = ({row, reloadData, onDelete}) => {
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
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Trash2 className="w-4 h-4"/>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            and remove your data from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="sm:justify-start">
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAction;