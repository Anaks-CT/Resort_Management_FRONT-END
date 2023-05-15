import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { useFormik } from "formik";
import { loginSchema } from "../../../schema/user/auth";
import { ILoginInterface } from "../../../interface/user.interface";
import { useLocation, useNavigate } from "react-router-dom";
import { RiEyeCloseFill } from "react-icons/ri";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

type props = {
  message?: string;
  onSubmit: (
    values: ILoginInterface,
    setError: any,
    resetForm: () => void
  ) => void;
  loading: boolean;
};

function Login({ onSubmit, message, loading }: props) {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values, setError, resetForm);
    },
  });
  const location = useLocation();
  const navigate = useNavigate();
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
        class="mt-8 text-xs md:text-sm"
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
        class="mt-2 text-xs md:text-sm"
        value={formik.values.password}
        type="password"
      />
      {formik.touched.password && formik.errors.password && (
        <div className="text-red-500">{formik.errors.password}</div>
      )}

      <p className="text-slate-500 text-[10px] md:text-sm mt-10">
        By signing in you accept the Terms and Conditions of Trinity
      </p>
      <div className="text-center text-red-500 mb-5 tracking-wide font-semibold">
        {error}
      </div>
      {loading && (
        <div className="flex justify-center">
          <img
            width={50}
            src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
            alt=""
          />
        </div>
      )}
      <Button
        onClick={formik.handleSubmit}
        class="w-full"
        outline
        color="transparent"
      >
        LOG IN
      </Button>
      {location.pathname !== "/admin/login" &&
        location.pathname !== "/manager/login" && (
          <div
            className="text-white cursor-pointer pt-3"
            onClick={() => navigate("/forgotPassword")}
          >
            Forgot Password ?
          </div>
        )}
    </div>
  );
}

export default Login;
