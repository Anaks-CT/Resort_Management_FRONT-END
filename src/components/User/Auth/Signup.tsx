import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyPhoneApi } from "../../../api/user.api";
import { signupSchema } from "../../../schema/user/auth";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      cPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values, { resetForm }) => {
      verifyPhoneApi(values.phone, values.email)
        .then((res) => 
            navigate("/signup/otp-verify", {
            state: values,
          })
        )
        .catch((err) => setError(err?.response?.data?.message));
    },
  });
  return (
    <div className="bg-[#1E1E1E] px-16 py-10 md:p-16 self-center z-10 w-[300px] md:w-[360px] flex flex-col justify-center rounded-lg items-center opacity-70">
3        <h1 className="text-white z-10 md:text-5xl text-3xl tracking-wide pb-6 text-center">
          JOIN US
        </h1>
        <Input
          onChange={formik.handleChange}
          value={formik.values.name}
          required
          placeholder="NAME"
          class="text-sm"
          name="name"
          type="text"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500">{formik.errors.name}</div>
        )}
        <Input
          onChange={formik.handleChange}
          value={formik.values.email}
          required
          placeholder="EMAIL ADDRESS"
          class="text-sm"
          name="email"
          type="text"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500">{formik.errors.email}</div>
        )}
        <Input
          onChange={formik.handleChange}
          value={formik.values.phone}
          required
          placeholder="PHONE"
          class="text-sm"
          name="phone"
          type="number"
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500">{formik.errors.phone}</div>
        )}
        <Input
          onChange={formik.handleChange}
          value={formik.values.password}
          required
          placeholder="PASSWORD"
          class="text-sm"
          name="password"
          type="password"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500">{formik.errors.password}</div>
        )}
        <Input
          onChange={formik.handleChange}
          value={formik.values.cPassword}
          required
          placeholder="CONFIRM PASSWORD"
          class="text-sm"
          name="cPassword"
          type="password"
        />
        {formik.touched.cPassword && formik.errors.cPassword && (
          <div className="text-red-500">{formik.errors.cPassword}</div>
        )}
        <p className="text-slate-500 text-[10px] md:text-sm mt-5">
          By Joining Up you accept the Terms and Conditions of Trinity
        </p>
        <div className="text-center text-red-500 tracking-wide font-semibold">
          {error}
        </div>
        <Button
          class="md:mt-10 mt-5 w-full"
          outline
          color="transparent"
          onClick={formik.handleSubmit}
        >
          SIGN UP
        </Button>{" "}
        {/*showToastMessage, formik.handleSubmit*/}
    </div>
  );
}

export default SignUp;
