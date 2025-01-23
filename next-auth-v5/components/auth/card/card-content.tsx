import { ReactNode } from "react";

export default function AuthCardContent({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="card-body bg-white rounded-2xl md:rounded-br-2xl md:rounded-tr-2xl">
      <h2 className="card-title justify-center text-2xl font-semibold tracking-tight mb-4">
        {title}
      </h2>

      <div className="grid gap-6">{children}</div>
    </div>
  );
}
