import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {get} from "@/lib/utils/data";
import {Badge} from "@/components/ui/badge";

const variants = {
  default: 'Default',
  secondary: 'Secondary',
  destructive: 'Destructive',
  success: 'Success',
}

const StatusDesignSelect = ({variant = 'default'}) => {
  const label = get(variants, variant, 'Unknown')

  return (
    <Select defaultValue={variant}>
      <SelectTrigger className="h-8 w-[180px]">
        <SelectValue placeholder={label}/>
      </SelectTrigger>
      <SelectContent side="top">
        <SelectGroup>
          {Object.keys(variants).map(variant => (
            <SelectItem key={variant} value={variant}>
              <Badge variant={variant}>{get(variants, variant)}</Badge>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusDesignSelect;