import { getUsers } from "@/lib/actions/users";
import { PageProps } from "@/lib/types/default";
import UsersPageView from "@/components/users";
import { getCurrentUser } from "@/lib/utils/data/users";

export default async function Page(props: PageProps) {
  const { data: users, error } = await getUsers();
  const currentUser = await getCurrentUser();

  return (
    <UsersPageView users={users} error={error} currentUser={currentUser} />
  );
}
