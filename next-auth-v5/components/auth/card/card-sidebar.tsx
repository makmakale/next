import { ReactNode } from "react";
import { LockKeyhole } from "lucide-react";

export default function AuthCardSidebar({ children }: { children: ReactNode }) {
  return (
    <div className="hidden md:flex bg-primary rounded-bl-2xl rounded-tl-2xl flex-col gap-4 justify-center items-center p-8 lg:w-[350px]">
      <LockKeyhole className="w-10 h-10 mx-auto text-white" />
      <span className="text-white text-center text-2xl">{children}</span>
    </div>
  );
}
