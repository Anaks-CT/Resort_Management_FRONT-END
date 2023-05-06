import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { otpValidationSchema } from "../../schema/user/auth";
import { verifyOTPapi } from "../../api/user.api";
import VerifyOTP from "../../components/User/Auth/VerifyOTP";

function ForgotPasswordOtpVerifyPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!location?.state) navigate("/");
  });

  const phoneNumber = location?.state.phone.toString();
  const email = location?.state.email;
  const fourDigits = phoneNumber.slice(-4);

  const [error, setError] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      verifyOTPapi(values.otp, location?.state.phone)
        .then((res) =>
          navigate("/forgotPassword/setNewPassword", {
            state: { email: email },
          })
        )
        .catch((err) => setError(err?.response?.data?.message))
        .finally(() => setLoading(false));
    },
  });
  return (
    <VerifyOTP
      error={error}
      formik={formik}
      fourDigits={fourDigits}
      loading={loading}
    />
  );
}

export default ForgotPasswordOtpVerifyPage;
