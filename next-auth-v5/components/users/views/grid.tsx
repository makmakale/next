import { CurrentUserProps, UserProps } from "@/lib/types/users";
import Link from "next/link";

export default function GridView({
  users,
  currentUser,
}: {
  users: UserProps[] | null | undefined;
  currentUser: CurrentUserProps;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {users?.map((user) => {
        const canEdit = currentUser?.id === user.id;

        return (
          <div key={user.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title capitalize">{user.name}</h2>

              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <p>Registered: {user.createdAt.toLocaleDateString()}</p>

              <div className="card-actions w-full justify-center mt-4">
                <Link
                  href={`/dashboard/users/${user.id}`}
                  className="btn btn-primary btn-wide"
                >
                  {canEdit ? "Edit" : "View"}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
