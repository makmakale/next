import Details from "@/components/pages/users/Details";
import {redirect} from "next/navigation";
import {ROUTES} from "@/lib/utils/constants/routes";
import {getSessionUser} from "@/lib/utils/users";

export default async function Page({params}) {
  const [view, id] = params.options
  const user = await getSessionUser()
  const route = ROUTES.users

  if (view === 'create') {
    return <Details route={route}/>
  }

  if (view === 'edit' && !!id) {
    return <Details route={route} id={id} user={user}/>
  }

  redirect(route)
}