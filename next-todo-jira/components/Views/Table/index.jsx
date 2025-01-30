'use client';
import {TableProvider, useTableContext} from '@/components/Views/Table/store/table-context';
import {clearMessage, loadData} from '@/components/Views/Table/store/actions';

// components
import PageTitle from '@/components/Views/Table/components/page-title';
import FormMessage from '@/components/ui/form-message';
import Search from '@/components/Views/Table/components/search';
import {Table} from '@/components/ui/table';
import TableHeader from '@/components/Views/Table/components/table-header';
import TableBody from '@/components/Views/Table/components/table-body'
import TablePagination from '@/components/Views/Table/components/table-pagination';
import {getConfig} from "@/lib/pages/configs";

const Component = ({config}) => {
  const {
    pageTitle,
    searchLabel,
    columns,
    setDefault,
    onDelete,
  } = config

  const [state, dispatch] = useTableContext();

  return (
    <div className="w-full h-full p-4 lg:p-10">
      <PageTitle title={pageTitle}/>

      <FormMessage
        variant={state.message?.type}
        message={state.message?.message}
        onClose={() => dispatch(clearMessage())}
      />

      <Search placeholder={searchLabel}/>

      <div className="rounded-md border">
        <Table>
          <TableHeader columns={columns}/>
          <TableBody
            columns={columns}
            reloadData={() => loadData(state, dispatch)}
            onDelete={onDelete}
            setDefault={setDefault}
          />
        </Table>
      </div>

      <TablePagination/>
    </div>
  );
};

const TableWrapper = ({route}) => {
  const config = getConfig(route).table

  return (
    <TableProvider getData={config.getData}>
      <Component config={config}/>
    </TableProvider>
  );
};

export default TableWrapper;