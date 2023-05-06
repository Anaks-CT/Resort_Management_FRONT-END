import { useFormik } from "formik";
import { otpValidationSchema } from "../../schema/user/auth";
import { signupApi, verifyOTPapi } from "../../api/user.api";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import VerifyOTP from "../../components/User/Auth/VerifyOTP";

function OtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!location?.state?.phone) navigate("/");
  });

  const phoneNumber = location?.state?.phone.toString();
  const fourDigits = phoneNumber?.slice(-4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      verifyOTPapi(values.otp, location?.state?.phone)
        .then((res) => {
          signupApi(location?.state)
            .then((res) => {
              //   location?.state.setError("");
              //   location?.state.resetForm();
              navigate("/login", {
                state: {
                  message: res.data.message,
                },
              });
            })
            .catch((err) =>
              navigate("/signup", {
                state: {
                  message: err?.response?.data?.message,
                },
              })
            );
        })
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

export default OtpPage;
