'use client'
import {TableBody as TBody, TableCell, TableRow,} from '@/components/ui/table';
import {cn} from '@/lib/utils/utils';
import {useTableContext} from '@/components/Views/Table/store/table-context';
import {get} from '@/lib/utils/data';
import {LoaderIcon} from "lucide-react";
import EditLink from "@/components/ui/edit-link";

const TableBody = (props) => {
  const {columns, ...rest} = props;
  const [{rows, page, rowsPerPage, isLoading}] = useTableContext();

  return (
    <TBody>
      {rows.length > 0 ? (
        rows.map((row, index) => {
          return (
            <TableRow key={row.id}>
              <TableCell>
                {page * rowsPerPage + index + 1}
              </TableCell>

              {columns.map((col) => {
                if (col.renderValue) {
                  const Comp = col.renderValue;
                  return (
                    <TableCell key={col.id} align={col.align}>
                      <Comp row={row} col={col} {...rest}/>
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={col.id} align={col.align}>
                    {col.isLink ? <EditLink id={row.id} title={get(row, col.id)}/> : get(row, col.id)}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell
            colSpan={columns.length + 1}
            className={cn('h-16 text-center')}
          >
            {isLoading ? <LoaderIcon className="animate-spin mx-auto"/> : 'No results.'}
          </TableCell>
        </TableRow>
      )}
    </TBody>
  );
};

export default TableBody;
