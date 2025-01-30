import FormField from "@/components/Formik/FormField";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import SwitchField from "@/components/Formik/fields/SwitchField";

export default function Fields({isCreateMode, isActiveDisabled}) {
  return (
    <div className="flex lg:space-x-4 flex-wrap lg:flex-nowrap">
      <div className="w-full flex flex-col">
        <FormField
          name="username"
          label="Username"
          className="w-full"
          required
        />

        <FormField
          name="name"
          label="Name"
          required
        />

        <FormField
          name="email"
          label="Email"
          type="email"
          required
        />

        <FormField
          name="password"
          label="Password"
          type="password"
          placeholder="******"
          required={isCreateMode}
        />
      </div>

      <div className="w-full lg:max-w-[350px]">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>

          <CardContent>
            <FormField
              name="isActive"
              label="Status"
              mappedLabel={["Disabled", "Active"]}
              component={SwitchField}
              disabled={isActiveDisabled}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}