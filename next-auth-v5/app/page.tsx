import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white shadow-md p-4 rounded-xl flex items-center">
      <div className="hero bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold pb-6">Hello there</h1>
            <Link href={"/dashboard"} className="btn btn-primary">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
