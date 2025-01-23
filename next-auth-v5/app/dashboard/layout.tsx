import { SystemMessagesProvider } from "@/context/system-messages";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SystemMessagesProvider>{children}</SystemMessagesProvider>;
}
