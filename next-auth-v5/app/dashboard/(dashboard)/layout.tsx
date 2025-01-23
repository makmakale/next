export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-xl flex items-center">
      {children}
    </div>
  );
}
