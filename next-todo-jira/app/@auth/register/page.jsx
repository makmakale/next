'use client'
import {Button} from "@/components/ui/button"
import CardWrapper from "@/components/Auth/CardWrapper";
import {useRouter} from "next/navigation";
import {useState, useTransition} from "react";
import {RegisterSchema} from "@/lib/form/validation";
import Form from "@/components/Formik/Form";
import FormMessage from "@/components/ui/form-message";
import FormField from "@/components/Formik/FormField";
import {createUser} from "@/lib/actions/users";

const initialValues = {
  username: '',
  password: ''
}

export default function Page() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = (values, {setSubmitting}) => {
    setError('')

    startTransition(async () => {
      const {success, error} = await createUser(values)
      setSubmitting(false)

      if (success) {
        router.push('/login')
      } else {
        setError(error)
      }
    })
  }

  return (
    <div className="h-full flex justify-center items-center">
      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/"
      >
        <Form
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={onSubmit}
        >
          <FormMessage variant={'error'} message={error}/>

          <FormField
            name="username"
            label="Username"
            placeholder="Username"
            disabled={isPending}
            required
          />

          <FormField
            name="name"
            label="Name"
            placeholder="Name"
            disabled={isPending}
            required
          />

          <FormField
            name="email"
            email="email"
            label="Email"
            placeholder="Email"
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
            Register
          </Button>
        </Form>
      </CardWrapper>
    </div>
  );
}