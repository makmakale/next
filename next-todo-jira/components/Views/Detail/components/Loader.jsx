import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export default function Loader(props) {
  return (
    <div className="w-full flex space-x-2">
      <Card className="flex-grow-[4]">
        <CardHeader>
          <Skeleton className="h-4 w-[250px]"/>
        </CardHeader>

        <CardContent>
          <div className="flex lg:space-x-4 flex-wrap lg:flex-nowrap">
            <div className="w-full flex flex-col space-y-4">
              <Skeleton className="h-10 w-full"/>
              <Skeleton className="h-[300px] w-full rounded-xl"/>
            </div>

            <div className="w-full lg:max-w-[350px]">
              <Skeleton className="h-[360px] w-full rounded-xl"/>
            </div>
          </div>
        </CardContent>

        <CardFooter className="space-x-2">
          <Skeleton className="h-4 w-[100px]"/>
          <Skeleton className="h-4 w-[150px]"/>
          <Skeleton className="h-4 w-[120px]"/>
        </CardFooter>
      </Card>
    </div>
  );
}