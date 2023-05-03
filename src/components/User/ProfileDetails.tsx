import React from 'react'
import { Iuser } from '../../interface/user.interface';
import PreviewImage from '../UI/PreviewImage';
import { AiFillEdit } from 'react-icons/ai';
import Input from '../UI/Input';
import { FormikErrors } from 'formik';
import Button from '../UI/Button';

type props = {
    user?: Iuser
    formik: any
}

function ProfileDetails({formik, user}: props) {
  return (
    <div className="border border-premium md:border-2 my-5 max-w-[900px] md:w-[900px]">
            <div className="p-5 bg-white bg-opacity-25">
              <div className="text-white md:flex justify-between md:divide-x gap-10">
                <div className="w-full">
                <div className="px-3 text-lg flex flex-col justify-center items-center relative ">
                 {!(user?.image || formik.values.image) &&  <img
                    onClick={() => document.getElementById('file-input')!.click()}
                    className="opacity-70 object-contain h-32 cursor-pointer"
                    src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1683099210/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdjk_al9pem.png"
                    alt=""
                  />}
                  {!formik.values.image && user?.image && (
                    <div className="flex justify-center">
                      <img width={"178px"} src={user?.image} alt=""></img>
                    </div>
                  )}
                  {formik.values.image && (
                    <div className="rounded-full"><PreviewImage freeStyle className='h-[130px] w-[130px] border-white border-2' file={formik.values.image} /></div>
                  )}
                  {formik.values.image && <AiFillEdit className="absolute bottom-0 right-16 md:right-32 cursor-pointer text-2xl" onClick={() => document.getElementById('file-input')!.click()}/>}
                  <input
                    id="file-input"
                    type="file"
                    className="text-xs hidden"
                    onChange={(event) => {
                      event.target.files &&
                        formik.setFieldValue("image", event.target.files[0]);
                    }}
                    placeholder="Choose File"
                    name="image"
                    value={undefined}
                    required={user?.image ? false : true}
                  />
                  {formik.touched.image && formik.errors.image && (
                    <div className="text-red-500 text-sm text-left">
                      {formik.errors.image as FormikErrors<"">}
                    </div>
                  )}
                </div>
                <div className="my-2">
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    required
                    placeholder="First Name"
                    class="text-sm md:text-base"
                    name="firstName"
                    type="text"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.firstName}
                    </div>
                  )}
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    required
                    placeholder="Last Name"
                    class="text-sm md:text-base"
                    name="lastName"
                    type="text"
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                  )}
                </div>
                </div>
                <div className="px-4 md:px-8 mt-5 flex flex-col text-sm md:text-lg gap-2 w-full justify-center">
                  <div className="flex gap-6 w-full">
                    <div className="w-32 justify-between flex">Email <span>:</span></div>
                    <div className="">anaksthayyil@gmail.com</div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-32 justify-between  flex">Phone <span>:</span></div>
                    <div className="">4567813245</div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-32 justify-between  flex">Total Bookings <span>:</span></div>
                    <div className="">5</div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-32 justify-between  flex">Points <span>:</span></div>
                    <div className="">5256 pts</div>
                  </div>
                </div>
                <div className="text-center mt-5 md:hidden"><Button type="submit" outline onClick={formik.handleSubmit} class="px-3 py-1" color="white">Save Changes</Button></div>
              </div>
              <div className="text-center mt-5 hidden md:block"><Button type="submit" outline onClick={formik.handleSubmit} class="px-3 py-1" color="white">Save Changes</Button></div>
            </div>
          </div>
  )
}

export default ProfileDetails