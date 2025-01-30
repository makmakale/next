import {TableHead, TableHeader as THead, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils/utils";

const TableHeader = ({columns}) => {
  return (
    <THead>
      <TableRow>
        <TableHead className='w-[40px]'>#</TableHead>

        {columns.map(col => (
          <TableHead key={col.id} className={cn('min-w-[100px]', col.className)}>
            {col.title}
          </TableHead>
        ))}
      </TableRow>
    </THead>
  );
};

export default TableHeader;