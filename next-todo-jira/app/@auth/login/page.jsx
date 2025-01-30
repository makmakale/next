'use client'
import {Button} from "@/components/ui/button"
import CardWrapper from "@/components/Auth/CardWrapper";
import {useState, useTransition} from "react";
import {LoginSchema} from "@/lib/form/validation";
import Form from "@/components/Formik/Form";
import FormMessage from "@/components/ui/form-message";
import FormField from "@/components/Formik/FormField";
import {login} from "@/lib/actions/users";

const initialValues = {
  username: '',
  password: ''
}

export default function Page() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const onSubmit = (values, {setSubmitting}) => {
    setError('')

    startTransition(async () => {
      const res = await login(values)
      if (res?.error) setError(res.error)
      setSubmitting(false)
    })
  }

  return (
    <div className="h-full flex justify-center items-center">
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/register"
      >
        <Form
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >

          <FormMessage variant="primary" message={(
            <div>
              <div>Default users:</div>
              <div>
                <p>Username: admin | user</p>
                <p>Password: admin | user</p>
              </div>
            </div>
          )}/>
          <FormMessage variant={'error'} message={error}/>

          <FormField
            name="username"
            label="Username"
            placeholder="Username"
            disabled={isPending}
            required
          />

          <FormField
            name="password"
            type="password"
            label="Password"
            placeholder="******"
            disabled={isPending}
            required
          />

          <Button type="submit" size="lg" className="w-full" disabled={isPending}>
            Login
          </Button>
        </Form>
      </CardWrapper>
    </div>
  );
}