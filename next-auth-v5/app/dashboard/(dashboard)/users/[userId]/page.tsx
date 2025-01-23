import { getUser } from "@/lib/actions/users";
import { PageProps } from "@/lib/types/default";
import UsersDetails from "@/components/users/views/details";
import { getCurrentUser } from "@/lib/utils/data/users";

export default async function Page(props: PageProps) {
  const { data: user, error } = await getUser(props.params.userId);
  const currentUser = await getCurrentUser();
  const canEdit = user?.id === currentUser?.id;

  return <UsersDetails user={user} error={error} canEdit={canEdit} />;
}
