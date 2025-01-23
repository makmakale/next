import { UserProps } from "@/lib/types/users";
import { getUsername } from "@/lib/utils/data/users";
import Image from "next/image";
import Link from "next/link";

export default function TableView({
  users,
}: {
  users: UserProps[] | null | undefined;
}) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <Image
                            src={user.image}
                            alt={"avatar"}
                            width={40}
                            height={40}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content mask mask-squircle w-12 h-12">
                          <span className="text-xs">
                            {getUsername(user.name)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div>
                      <Link
                        href={`/dashboard/users/${user.id}`}
                        className="btn-link"
                      >
                        <div className="font-bold">{user.name}</div>
                      </Link>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.role}</td>
                <td>{user.id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
