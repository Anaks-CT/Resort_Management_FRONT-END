import { Header2 } from "../../components/User/Header/Header";
import OtpInput from "react18-input-otp";
import Button from "../../components/UI/Button";
import { useFormik } from "formik";
import { otpValidationSchema } from "../../schema/user/auth";
import { signupApi, verifyOTPapi } from "../../api/user.api";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import VerifyOTP from "../../components/User/Auth/VerifyOTP";

function OtpPage() {
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.7)), url("https://res.cloudinary.com/dxnisjppy/image/upload/v1678359059/wpkwoqgc6ctjqkjeltju.jpg")`,
  };

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!location?.state) navigate("/");
  });

  const phoneNumber = location?.state.phone.toString()
  const fourDigits = phoneNumber.slice(-4)

  const [error, setError] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpValidationSchema,
    onSubmit: (values) => {
      verifyOTPapi(values.otp, location?.state.phone)
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
            )
        })
        .catch((err) => {console.log(err); setError(err?.response?.data?.message)});
    },
  });
  return (
    <>
      <Header2 />
      <div
        className="static bg-no-repeat bg-cover bg-center h-screen pt-[60px] flex justify-center"
        style={style}
      >
        <div className="bg-gradient-to-t from-transparent to-black absolute w-screen h-64 "></div>
        <VerifyOTP  error={error} formik={formik} fourDigits={fourDigits}/>
        <div className="bg-gradient-to-b from-transparent to-black absolute w-screen bottom-0 h-64"></div>
      </div>
    </>
  );
}

export default OtpPage;
