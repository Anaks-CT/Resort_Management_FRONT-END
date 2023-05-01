import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { useFormik } from "formik";
import { loginSchema } from "../../../schema/user/auth";
import { ILoginInterface } from "../../../interface/user.interface";
import { useNavigate } from "react-router-dom";

type props = {
  message?: string
  onSubmit: (values: ILoginInterface, setError: any, resetForm: () => void) => void
}

function Login({onSubmit,message}: props) {
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values, setError, resetForm)
    },
  });

  const navigate = useNavigate()
  return (
    <div className="bg-[#1E1E1E] p-16 self-center z-10 w-[300px] md:w-[350px] flex flex-col justify-center rounded-lg items-center opacity-70">
      <div className="text-green-500">{message}</div>
      <h1 className="text-white z-10 md:text-5xl text-3xl tracking-wide pb-8">
        LOG IN
      </h1>
      <Input
        onChange={formik.handleChange}
        required
        placeholder="EMAIL ADDRESS"
        name="email"
        class="mt-8 text-sm"
        value={formik.values.email}
        type="text"
      />
      {formik.touched.email && formik.errors.email && (
        <div className="text-red-500">{formik.errors.email}</div>
      )}
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
      <div className="text-blue-600 cursor-pointer" onClick={() => navigate('/forgotPassword')}>Forgot Password ?</div>
      <div className="text-blue-600 cursor-pointer" onClick={() => navigate('/forgotPassword/setNewPassword')}>forgot top verify</div>
    </div>
  );
}

export default Login;
