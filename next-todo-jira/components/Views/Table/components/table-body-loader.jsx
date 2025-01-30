import { LoaderIcon } from 'lucide-react';
import { TableCaption } from '@/components/ui/table';

export default function TableBodyLoader(props) {
  return (
    <TableCaption className="relative h-12 w-full">
      <LoaderIcon className="animate-spin"/>
    </TableCaption>
  );
}