'use client'
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {useTableContext} from "@/components/Views/Table/store/table-context";
import {setPageIndex, setPageSize} from "@/components/Views/Table/store/actions";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,} from 'lucide-react';

function TablePagination() {
  const [{page, rowsPerPage, total, isLoading}, dispatch] = useTableContext()
  const countPages = Math.ceil(total / rowsPerPage) || 1

  const getCanPreviousPage = () => {
    return page - 1 >= 0
  }
  const getCanNextPage = () => {
    return page + 1 <= countPages - 1
  }

  if (isLoading) return null

  return (
    <div className="flex items-center space-x-6 lg:space-x-8 mt-4">
      <div className="ml-auto flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${rowsPerPage}`}
          onValueChange={(value) => {
            dispatch(setPageSize(Number(value)))
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={rowsPerPage}/>
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {page + 1} of{" "} {countPages}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => dispatch(setPageIndex(0))}
          disabled={!getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft className="h-4 w-4"/>
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => dispatch(setPageIndex(page - 1))}
          disabled={!getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="h-4 w-4"/>
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => dispatch(setPageIndex(page + 1))}
          disabled={!getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="h-4 w-4"/>
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => dispatch(setPageIndex(countPages - 1))}
          disabled={!getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight className="h-4 w-4"/>
        </Button>
      </div>
    </div>
  )
}

export default TablePagination;