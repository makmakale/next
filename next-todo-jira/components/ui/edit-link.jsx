import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";

export default function EditLink({href, id, title}) {
  const pathname = usePathname()

  return (
    <Button variant="link" asChild className="px-0">
      <Link href={href || `${pathname}/edit/${id}`} className="max-w-[500px] truncate font-medium" prefetch>
        {title}
      </Link>
    </Button>
  );
}