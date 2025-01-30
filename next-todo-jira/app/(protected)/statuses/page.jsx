import TableView from "@/components/Views/Table";
import {ROUTES} from "@/lib/utils/constants/routes";

export default async function Page() {
  return <TableView route={ROUTES.statuses}/>
}