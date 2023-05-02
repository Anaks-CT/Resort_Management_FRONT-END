import React, { useState } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { useFormik } from "formik";
import { passwordSchema } from "../../../schema/user/auth";
import { setNewPasswordApi } from "../../../api/user.api";
import { useNavigate } from "react-router-dom";
import { toastMessage } from "../../../helpers/toast";

type props = {
  email: string;
};

function NewPasswordForm({ email }: props) {
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      cPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values, { resetForm }) => {
      setloading(true);
      setNewPasswordApi(email, values)
        .then((res) =>
          navigate("/login", { state: { message: res.data.message } })
        )
        .catch((err) => toastMessage("error", err?.response?.data.message))
        .finally(() => setloading(false));
    },
  });
  return (
    <div className="bg-[#1E1E1E] p-16 self-center z-10 w-[300px] md:w-[350px] flex flex-col justify-center rounded-lg items-center opacity-70">
      <h1 className="text-white z-10 md:text-4xl text-3xl tracking-wide pb-8 text-center">
        PASSWORD RESET
      </h1>
      <Input
        onChange={formik.handleChange}
        required
        placeholder="NEW PASSWORD"
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
      <Button
        onClick={formik.handleSubmit}
        class="mt-5 w-full"
        outline
        color="transparent"
      >
        LOG IN
      </Button>
      {loading && (
        <div className="flex justify-center">
          <img
            width={50}
            src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default NewPasswordForm;
