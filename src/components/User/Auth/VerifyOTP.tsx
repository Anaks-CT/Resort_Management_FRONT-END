import React from 'react'
import OtpInput from 'react18-input-otp'
import Button from '../../UI/Button'

type props = {
    error: string
    formik: any
    fourDigits: string
    loading: boolean
}

function VerifyOTP({error, formik, fourDigits, loading}: props) {
  return (
    <div className="bg-[#1E1E1E] px-16 py-10 md:p-16 self-center z-10 w-[300px] md:w-[360px] flex flex-col justify-center rounded-lg items-center opacity-70">
          <h1 className="text-white z-10 md:text-5xl text-3xl tracking-wide pb-5 text-center">
            OTP
          </h1>
          <h2 className="text-white text-sm text-center pb-4">
            Please enter the OTP sent to your ******{fourDigits}.
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

  )
}

export default VerifyOTP