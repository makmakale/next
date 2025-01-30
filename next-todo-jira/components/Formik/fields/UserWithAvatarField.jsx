'use client';

import FormControl from "@/components/Formik/common/FormControl";
import FormLabel from "@/components/Formik/common/FormLabel";
import FormHelperText from "@/components/Formik/common/FormHelperText";
import UserAvatarName from "@/components/app/user-avatar-name";

const UserWithAvatarField = ({
                               label = 'Reporter',
                               user,
                               helperText,
                               className,
                               field: {name},
                               form: {
                                 touched,
                                 errors,
                               },
                             }) => {
  const id = `${name}-form-item`;
  const isError = errors[name] && touched[name];
  const error = errors[name];

  return (
    <FormControl className={className}>
      <FormLabel label={label} id={id} isError={isError}/>

      <UserAvatarName user={user}/>

      <FormHelperText show={isError || helperText} isError={isError}>
        {error || helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default UserWithAvatarField;