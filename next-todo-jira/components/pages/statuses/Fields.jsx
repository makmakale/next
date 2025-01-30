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
              name="isDefault"
              label="Default status"
              mappedLabel={["No", "Yes"]}
              helperText={"Default status will be set in selects for new items."}
              component={SwitchField}
            />

            <FormField
              name="addTask"
              label="Can create tasks"
              mappedLabel={["No", "Yes"]}
              helperText={"Display create button in the board column."}
              component={SwitchField}
            />

            <FormField
              name="bgColor"
              label="Background Color"
              component={ColorChooseField}
            />

            <FormField
              name="textColor"
              label="Text Color"
              component={ColorChooseField}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}