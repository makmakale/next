"use client";

import FormItem from "@/components/common/form/form-item";
import FormWrapper from "@/components/auth/form-wrapper";
import FormikField from "@/components/common/form/formik-field";
import {
  LoginFormValues,
  validateLoginForm,
} from "@/lib/utils/form/validate/auth";
import { login } from "@/lib/actions/auth";
import { useTransition } from "react";
import { useSystemMessages } from "@/context/system-messages";
import SystemMessage from "@/components/system-message";
import LoadingButton from "@/components/common/loading-button";
import FormikWrapper from "@/components/common/form/formik-wrapper";

export default function LoginForm() {
  const [isLoading, startTransition] = useTransition();
  const { setErrorMessage } = useSystemMessages();

  const onSubmit = (values: LoginFormValues) => {
    setErrorMessage();

    startTransition(async () => {
      try {
        const res = await login(values);
        if (res?.error) setErrorMessage(res.error);
      } catch (err) {
        console.log("err", err);
        setErrorMessage("Something went wrong");
      }
    });
  };

  return (
    <FormWrapper
      title={"Login"}
      subTitle={"Welcome Back!"}
      backButtonHref={"/dashboard/register"}
      backButtonLabel={"Don't have an account?"}
    >
      <FormikWrapper
        initialValues={{
          email: "",
          password: "",
        }}
        validate={validateLoginForm}
        onSubmit={onSubmit}
      >
        <SystemMessage />

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

        <LoadingButton isLoading={isLoading}>Log in</LoadingButton>
      </FormikWrapper>
    </FormWrapper>
  );
}
