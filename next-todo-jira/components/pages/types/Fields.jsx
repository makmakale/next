import FormField from "@/components/Formik/FormField";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import SwitchField from "@/components/Formik/fields/SwitchField";
import ColorChooseField from "@/components/Formik/fields/ColorChooseField";

export default function Fields() {
  return (
    <div className="flex lg:space-x-4 flex-wrap lg:flex-nowrap">
      <div className="w-full flex flex-col">
        <FormField
          name="title"
          label="Title"
          className="w-full"
          required
        />

        <FormField
          name="alias"
          label="Alias"
        />

        <FormField
          name="description"
          label="Description"
        />
      </div>

      <div className="w-full lg:max-w-[350px]">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>

          <CardContent>
            <FormField
              name="color"
              label="Color"
              component={ColorChooseField}
            />

            <FormField
              name="isDefault"
              label="Default type"
              mappedLabel={["No", "Yes"]}
              helperText={"Default type will be set in selects for new items."}
              component={SwitchField}
            />

            <FormField
              name="subtasksAllowed"
              label="Allowe create subtasks"
              mappedLabel={["No", "Yes"]}
              component={SwitchField}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}