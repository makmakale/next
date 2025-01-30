import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import todosImg from '@/public/images/todos.jpeg'

export default function Home() {
  return (
    <div className={'w-full h-full flex flex-col items-center p-4 lg:p-10'}>
      <h1 className={"text-3xl md:text-7xl mb-10 text-center font-black"}>
        To Do Board
      </h1>
      <div className="relative">
        <Image
          src={todosImg}
          alt={"To Do"}
          width={800}
          height={0}
          className={'rounded-lg object-cover shadow-md shadow-blue-500'}
        />
        <Button className="absolute -bottom-20 sm:bottom-[25%] left-[50%] -translate-x-1/2 text-white">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
