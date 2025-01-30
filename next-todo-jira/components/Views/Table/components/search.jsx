'use client';

import {Input} from '@/components/ui/input';
import {CirclePlus, Search as SearchIcon} from 'lucide-react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useTableContext} from '@/components/Views/Table/store/table-context';
import {setSearchValue} from "@/components/Views/Table/store/actions";

const Search = ({placeholder = 'Type for search'}) => {
  const pathname = usePathname();
  const [{isLoading, searchValue}, dispatch] = useTableContext();

  const handleSearchChange = ({target}) => dispatch(setSearchValue(target.value));

  return (
    <div className="my-4 flex sm:space-x-2 sm:justify-between">
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"/>
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearchChange}
          disabled={isLoading}
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>

      {isLoading ? null : <Button asChild className="ml-auto">
        <Link href={`${pathname}/create`}>
          <CirclePlus className="w-4 h-4 mr-2"/> New
        </Link>
      </Button>}
    </div>
  );
};

export default Search;