"use client";

import { UserProps } from "@/lib/types/users";
import SystemMessage from "@/components/system-message";
import FormikField from "@/components/common/form/formik-field";
import FormItem from "@/components/common/form/form-item";
import LoadingButton from "@/components/common/loading-button";
import { useTransition } from "react";
import { useSystemMessages } from "@/context/system-messages";
import {
  UserUpdateFormValues,
  validateUserUpdateForm,
} from "@/lib/utils/form/validate/user";
import { updateUser } from "@/lib/actions/users";
import { useRouter } from "next/navigation";
import FormikWrapper from "@/components/common/form/formik-wrapper";

export default function Details({
  user,
  error,
  canEdit,
}: {
  user: UserProps | null | undefined;
  error: string | undefined;
  canEdit: boolean;
}) {
  const [isLoading, startTransition] = useTransition();
  const { setErrorMessage } = useSystemMessages();
  const router = useRouter();

  const onSubmit = (values: UserUpdateFormValues) => {
    if (!user) return;
    setErrorMessage();

    startTransition(async () => {
      try {
        const res = await updateUser(values, user.id);
        if (res?.error) setErrorMessage(res.error);
      } catch (err) {
        console.log("err", err);
        setErrorMessage("Something went wrong");
      }
    });
  };

  if (error) {
    return <div className="text-error">{error}</div>;
  }

  return (
    <div className="w-full">
      <FormikWrapper
        initialValues={{
          name: user?.name || "",
          email: user?.email || "",
          password: "",
        }}
        validate={validateUserUpdateForm}
        onSubmit={onSubmit}
      >
        <SystemMessage />

        <FormikField
          label={"Name"}
          name={"name"}
          placeholder={"John Doe"}
          component={FormItem}
          disabled={!canEdit || isLoading}
        />

        <FormikField
          label={"Email"}
          name={"email"}
          type={"email"}
          placeholder={"john.doe@example.com"}
          component={FormItem}
          disabled={!canEdit || isLoading}
        />

        <FormikField
          label={"Password"}
          type="password"
          name={"password"}
          placeholder={"Password"}
          component={FormItem}
          disabled={!canEdit || isLoading}
        />

        <div className="flex gap-4">
          <LoadingButton isLoading={isLoading}>Save</LoadingButton>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => router.push("/dashboard/users")}
          >
            Cancel
          </button>
        </div>
      </FormikWrapper>
    </div>
  );
}
