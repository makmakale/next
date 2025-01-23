"use client";

import FormItem from "@/components/common/form/form-item";
import FormWrapper from "@/components/auth/form-wrapper";
import FormikField from "@/components/common/form/formik-field";
import {
  RegisterFormValues,
  validateRegisterForm,
} from "@/lib/utils/form/validate/auth";
import { register } from "@/lib/actions/auth";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSystemMessages } from "@/context/system-messages";
import LoadingButton from "@/components/common/loading-button";
import FormikWrapper from "@/components/common/form/formik-wrapper";

export default function RegisterForm() {
  const [isLoading, startTransition] = useTransition();
  const { setSuccessMessage, setErrorMessage } = useSystemMessages();
  const router = useRouter();

  const onSubmit = (values: RegisterFormValues) => {
    setSuccessMessage();
    setErrorMessage();

    startTransition(async () => {
      try {
        const res = await register(values);
        if (res.error) setErrorMessage(res.error);
        if (res.success) {
          setSuccessMessage(res.success);
          router.push("/dashboard/login");
        }
      } catch (err) {
        console.log("err", err);
        setErrorMessage("something went wrong!");
      }
    });
  };

  return (
    <FormWrapper
      title={"Sign Up"}
      subTitle={"Create an account"}
      backButtonHref={"/dashboard/login"}
      backButtonLabel={"Already have an account?"}
    >
      <FormikWrapper
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validate={validateRegisterForm}
        onSubmit={onSubmit}
      >
        <FormikField
          label={"Name"}
          name={"name"}
          placeholder={"John Doe"}
          component={FormItem}
          disabled={isLoading}
        />

        <FormikField
          label={"Email"}
          name={"email"}
          type={"email"}
          placeholder={"john.doe@example.com"}
          component={FormItem}
          disabled={isLoading}
        />

        <FormikField
          label={"Password"}
          type="password"
          name={"password"}
          placeholder={"Password"}
          component={FormItem}
          disabled={isLoading}
        />

        <LoadingButton isLoading={isLoading}>Sign up</LoadingButton>
      </FormikWrapper>
    </FormWrapper>
  );
}
