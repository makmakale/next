'use client'
import {createContext, useContext, useEffect, useReducer} from 'react'
import tableReducer, {initialValues} from "@/components/Views/Table/store/reducer";
import {loadData} from "@/components/Views/Table/store/actions";
import useDebounce from "@/lib/hooks/useDebounce";

const TableContext = createContext()

export const useTableContext = () => {
  const context = useContext(TableContext)

  if (!context) {
    throw new Error("Component must be rendered as child component of TableContext")
  }

  return context
}

export const TableProvider = ({getData, children}) => {
  const [state, dispatch] = useReducer(tableReducer, {...initialValues, getData})
  const debouncedSearchValue = useDebounce(state.searchValue, 500);

  useEffect(() => {
    if (!state.getData) return;

    loadData(state, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.getData, state.page, state.rowsPerPage, debouncedSearchValue]);

  return (
    <TableContext.Provider value={[state, dispatch]}>
      {children}
    </TableContext.Provider>
  )
}