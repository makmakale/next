import FormWrapper from "@/components/auth/form-wrapper";
import { BiError } from "react-icons/bi";

export default function Page({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const { error } = searchParams;

  return (
    <FormWrapper
      title={"Oops! Something went wrong."}
      subTitle={"Error"}
      backButtonHref={"/dashboard/login"}
      backButtonLabel={"Back to login"}
      showSocial={false}
    >
      <div className="w-full flex justify-center items-center">
        <BiError className="text-error mr-2 text-4xl" />
      </div>
    </FormWrapper>
  );
}
