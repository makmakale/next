import {get} from "@/lib/utils/data";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

export default function AvatarColumn({row, col}) {
  const image = get(row, col.id)
  const name = get(row, 'name')

  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={image || '/images/noavatar.png'} alt={image ? name : 'no avatar'}/>
    </Avatar>
  );
}