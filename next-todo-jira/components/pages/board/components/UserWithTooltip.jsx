import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

export default function UserWithTooltip({user}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className="w-8 h-8 border">
            <AvatarImage
              src={user?.image || '/images/noavatar.png'}
              alt={user?.name}
            />
          </Avatar>
        </TooltipTrigger>
        <TooltipContent sideOffset={5} align={'end'}>
          <p>{user?.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}