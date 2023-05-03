import React, { useState } from 'react'
import { Header2 } from '../../components/User/Header/Header'
import Button from '../../components/UI/Button';
import { useFormik } from 'formik';
import { verfyEmailSchema } from '../../schema/user/auth';
import Input from '../../components/UI/Input';
import { forgotPasswordVerifyEmailApi } from '../../api/user.api';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
    const style = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.7)), url("https://res.cloudinary.com/dxnisjppy/image/upload/v1678359059/wpkwoqgc6ctjqkjeltju.jpg")`,
      };
  const [loading, setloading] = useState(false)

      const [error, setError] = useState('')
      const navigate = useNavigate()
      const formik = useFormik({
        initialValues: {
          email: "",
        },
        validationSchema: verfyEmailSchema,
        onSubmit: (values) => {
          setloading(true)
          forgotPasswordVerifyEmailApi(values.email)
            .then(res => navigate('/forgotPassword/otp-verify',{state: {phone: res?.data?.data, email: values.email}}))
            .catch(err =>  setError(err?.response?.data?.message))
            .finally(() => setloading(false))
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
          VERIFY
        </h1>
        <h2 className="text-white text-sm text-center py-4">
        we will send you a <span className='font-black font-sans'>6-digit</span> verification code to your <span className='font-black font-sans'>Phone</span>.
        </h2>
        <Input
        onChange={formik.handleChange}
        required
        placeholder="EMAIL ADDRESS"
        name="email"
        class="mt-2 text-sm"
        value={formik.values.email}
        type="text"
      />
      {formik.touched.email && formik.errors.email && (
        <div className="text-red-500">{formik.errors.email}</div>
      )}
        <div className="w-36 mx-auto mt-10">
          <Button
            type="submit"
            onClick={formik.handleSubmit}
            color="transparent"
            class="w-full"
            outline
          >
            Send OTP
          </Button>
          <div className="text-red-500 text-center">{error}</div>
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
      </div>

      <div className="bg-gradient-to-b from-transparent to-black absolute w-screen bottom-0 h-64"></div>
    </div>
  </>
  )
}

export default ForgotPasswordPage