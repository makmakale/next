import { ReactNode } from "react";

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="card md:card-side bg-base-100 shadow-xl w-full">
      {children}
    </div>
  );
}
