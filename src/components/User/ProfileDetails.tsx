import React from "react";
import { Iuser } from "../../interface/user.interface";
import PreviewImage from "../UI/PreviewImage";
import { AiFillEdit } from "react-icons/ai";
import Input from "../UI/Input";
import { FormikErrors } from "formik";
import Button from "../UI/Button";

type props = {
  user?: Iuser;
  formik: any;
  saveButtonClicked: boolean;
  error: string
};

function ProfileDetails({ formik, user, saveButtonClicked, error }: props) {
  return (
    <>
      <div className="text-white md:flex justify-between md:divide-x gap-10">
        <div className="w-full">
          <div className="px-3 text-lg flex flex-col justify-center items-center relative ">
            {!(user?.image || formik.values.image) && (
              <img
                onClick={() => document.getElementById("file-input")!.click()}
                className="opacity-70 object-contain h-32 cursor-pointer"
                src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1683099210/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdjk_al9pem.png"
                alt=""
              />
            )}
            {!formik.values.image && user?.image && (
              <div className="rounded-full">
                <img className="h-[130px] w-[130px] border-white border-2 object-cover rounded-full" src={user?.image} alt=""></img>
              </div>
            )}
            {formik.values.image && (
              <div className="rounded-full">
                <PreviewImage
                  freeStyle
                  className="h-[130px] w-[130px] border-white border-2"
                  file={formik.values.image}
                />
              </div>
            )}
            {(formik.values.image || user?.image) && (
              <AiFillEdit
                className="absolute bottom-0 right-16 md:right-32 cursor-pointer text-2xl"
                onClick={() => document.getElementById("file-input")!.click()}
              />
            )}
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
              value={formik.values.name}
              required
              placeholder="Name"
              class="text-sm md:text-base"
              name="name"
              type="text"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>
        </div>
        <div className="px-4 md:px-8 mt-5 flex flex-col text-sm md:text-lg gap-2 w-full justify-center">
          <div className="flex gap-6 w-full">
            <div className="w-32 justify-between flex">
              Email <span>:</span>
            </div>
            <div className="">{user?.email}</div>
          </div>
          <div className="flex gap-6">
            <div className="w-32 justify-between  flex">
              Phone <span>:</span>
            </div>
            <div className="">{user?.phone}</div>
          </div>
          <div className="flex gap-6">
            <div className="w-32 justify-between  flex">
              Total Bookings <span>:</span>
            </div>
            <div className="">{user?.bookings.length}</div>
          </div>
          <div className="flex gap-6">
            <div className="w-32 justify-between  flex">
              Points <span>:</span>
            </div>
            <div className="">{user?.points}</div>
          </div>
        </div>
        <div className="text-center mt-5 md:hidden">
          <Button
            type="submit"
            outline
            onClick={formik.handleSubmit}
            class="px-3 py-1"
            color="white"
          >
            Save Changes
          </Button>
        </div>
      </div>
      <div className="text-center mt-5 hidden md:block">
        {saveButtonClicked && (
          <div className="flex justify-center">
            <img
              width={50}
              src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
              alt=""
            />
          </div>
        )}
        <Button
          type="submit"
          outline
          onClick={formik.handleSubmit}
          class="px-3 py-1"
          color="white"
          disable={saveButtonClicked}
        >
          Save Changes
        </Button>
        <div className="text-red-500 text-center text-sm">{error}</div>
      </div>
    </>
  );
}

export default ProfileDetails;
