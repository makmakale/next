import { Form, Formik, FormikConfig } from "formik";
import SystemMessage from "@/components/system-message";

export default function FormikWrapper({
  children,
  ...rest
}: { children: React.ReactNode } & FormikConfig<any>) {
  return (
    <Formik {...rest}>
      <Form>
        <div className="grid gap-4">
          <SystemMessage />

          {children}
        </div>
      </Form>
    </Formik>
  );
}
