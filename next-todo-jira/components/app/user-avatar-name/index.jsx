import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"

function UserAvatar({image, name}) {
  return (
    <Avatar className="w-8 h-8 border">
      <AvatarImage
        src={image || '/images/noavatar.png'}
        alt={name || 'Unassigned'}
      />
    </Avatar>
  )
}

export default function UserAvatarName({
  user,
  withAvatar = true,
  onlyAvatar = false,
  withTooltip = false,
}) {
  const {name = 'Unassigned', image} = user || {}

  return (
    <div className="flex space-x-2 items-center">
      {withTooltip ? <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <UserAvatar image={image} name={name}/>
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> : withAvatar && <UserAvatar image={image} name={name}/>}

      {!onlyAvatar && <div>{name}</div>}
    </div>
  );
}