'use client'

import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import CardHeader from "@/components/Auth/CardWrapper/CardHeader";
import CardSocial from "@/components/Auth/CardWrapper/CardSocial";

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}) => {
  return (
    <Card className="w-[400px]">
      <CardHeader headerLabel={headerLabel}/>

      <CardContent className="space-y-4">
        {children}

        <CardSocial/>
      </CardContent>

      <CardFooter>
        <Link href={backButtonHref}>
          <Button variant="link" className="px-0">{backButtonLabel}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;