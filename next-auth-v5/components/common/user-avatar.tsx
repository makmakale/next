import { getUsername } from "@/lib/utils/data/users";
import Image from "next/image";

export default function UserAvatar({
  image,
  name,
}: {
  image?: string | undefined;
  name: string;
}) {
  if (!image) {
    return (
      <div className="bg-neutral text-neutral-content rounded-full w-10">
        <span>{getUsername(name)}</span>
      </div>
    );
  }
  return (
    <div className="w-10 rounded-full">
      <Image alt={name} src={image} width={50} height={50} />
    </div>
  );
}
