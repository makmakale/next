import BackButton from "@/components/common/back-button";

export default function NotFound() {
  return (
    <div className="hero bg-base-100 lg:w-[600px] rounded-lg shadow-md p-4">
      <div className="hero-content text-center">
        <div className="max-w-md space-y-6">
          <h1 className="text-5xl font-bold">Page not found</h1>
          <BackButton />
        </div>
      </div>
    </div>
  );
}
