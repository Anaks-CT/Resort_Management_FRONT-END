import { Header2 } from "../../components/User/Header/Header";
import OtpInput from "react18-input-otp";
import Button from "../../components/UI/Button";
import { useFormik } from "formik";
import { otpValidationSchema } from "../../schema/user/auth";
import { signupApi, verifyOTPapi } from "../../api/user.api";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function OtpPage() {
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.7)), url("https://res.cloudinary.com/dxnisjppy/image/upload/v1678359059/wpkwoqgc6ctjqkjeltju.jpg")`,
  };

  const navigate = useNavigate();
  const location = useLocation();
  const signupvalues = location?.state
  console.log(signupvalues);
  useEffect(() => {
    if (!location?.state) navigate("/");
  });

  const [error, setError] = useState();

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

        <div className="bg-[#1E1E1E] px-16 py-10 md:p-16 self-center z-10 w-[300px] md:w-[360px] flex flex-col justify-center rounded-lg items-center opacity-70">
          <h1 className="text-white z-10 md:text-5xl text-3xl tracking-wide pb-5 text-center">
            OTP
          </h1>
          <h2 className="text-white text-sm text-center pb-4">
            Please enter the OTP sent to your Phone.
          </h2>
          <OtpInput
            className=" w-7 md:w-10 h-11 rounded-lg border-0 ml-2 mr-2 bg-white text-lg justify-center "
            value={formik.values.otp}
            onChange={formik.handleChange("otp")}
            inputStyle="border-0"
            numInputs={6}
            separator={<span></span>}
          />
          {formik.touched.otp && formik.errors.otp && (
            <div className="text-red-500 mt-4 text-center">
              {formik.errors.otp}
            </div>
          )}
          {error && (
            <div className="text-red-500 mt-4 text-center">{error}</div>
          )}
          <div className="w-36 mx-auto mt-10">
            <Button
              type="submit"
              onClick={formik.handleSubmit}
              color="transparent"
              class="w-full"
              outline
            >
              Verify OTP
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-b from-transparent to-black absolute w-screen bottom-0 h-64"></div>
      </div>
    </>
  );
}

export default OtpPage;
