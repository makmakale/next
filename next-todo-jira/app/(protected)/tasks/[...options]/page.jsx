import {getSessionUser} from "@/lib/utils/users";
import Details from "@/components/pages/tasks/Details";
import {redirect} from "next/navigation";
import {ROUTES} from "@/lib/utils/constants/routes";

export default async function Page({params, searchParams}) {
  const [view, id] = params.options
  const route = ROUTES.tasks

  if (view === 'create') {
    const user = await getSessionUser()
    return <Details route={route} user={user} searchParams={searchParams}/>
  }

  if (view === 'edit' && !!id) {
    return <Details route={route} id={id} searchParams={searchParams}/>
  }

  redirect(route)
}