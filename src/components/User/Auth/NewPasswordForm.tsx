import React, {useState} from 'react'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import { useFormik } from 'formik';
import { passwordSchema } from '../../../schema/user/auth';

function NewPasswordForm() {
        const [error, setError] = useState("");
        const formik = useFormik({
          initialValues: {
            password: "",
            cPassword: "",
          },
          validationSchema: passwordSchema,
          onSubmit: (values, { resetForm }) => {
            console.log(values);
            // will navigate back to login with a message saying your password has been changed successfully
        },
        });
  return (
    <div className="bg-[#1E1E1E] p-16 self-center z-10 w-[300px] md:w-[350px] flex flex-col justify-center rounded-lg items-center opacity-70">
      <h1 className="text-white z-10 md:text-5xl text-3xl tracking-wide pb-8 text-center">
        RESET PASSWORD
      </h1>
      <Input
        onChange={formik.handleChange}
        required
        placeholder="PASSWORD"
        name="password"
        class="mt-2 text-sm"
        value={formik.values.password}
        type="password"
      />
      {formik.touched.password && formik.errors.password && (
        <div className="text-red-500">{formik.errors.password}</div>
      )}
      <Input
        onChange={formik.handleChange}
        required
        placeholder="CONFIRM PASSWORD"
        name="cPassword"
        class="mt-2 text-sm"
        value={formik.values.cPassword}
        type="password"
      />
      {formik.touched.cPassword && formik.errors.cPassword && (
        <div className="text-red-500">{formik.errors.cPassword}</div>
      )}
      <p className="text-slate-500 text-[10px] md:text-sm mt-10">
        By signing in you accept the Terms and Conditions of Trinity
      </p>
      <div className="text-center text-red-500 tracking-wide font-semibold">
        {error}
      </div>
      <Button
        onClick={formik.handleSubmit}
        class="mt-5 w-full"
        outline
        color="transparent"
      >
        LOG IN
      </Button>
    </div>
  )
}

export default NewPasswordForm