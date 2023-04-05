import React, { useState, useEffect } from "react";
import { Header } from "../../components/Manager/Header";
import Input from "../../components/UI/Input";
import { addResort } from "../../schema/admin/addResortForm";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Button from "../../components/UI/Button";
import PreviewImage from "../../components/UI/PreviewImage";
import { IAddResort } from "../../interface/resort.interface";
import { createResortApi } from "../../api/resort.api";
import { useDispatch } from "react-redux";
import { updateAllResortDetails } from "../../store/slices/allResortSlice";
import { useSelector } from "react-redux";
import { IStore } from "../../interface/slice.interface";
import { useNavigate } from "react-router-dom";

function AddResort() {
  //////////////////////////// choosing submit function according to add button or edit button click //////////
  const [submitType, setSubmitType] = useState<"add" | "edit">("add");
  //   const formikOnsubmitType = () => {};

  const navigate = useNavigate();
  const allResortDetails = useSelector((state: IStore) => state.allResort);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   navigate('/admin/resortmanagement')
  // }, [allResortDetails])

  ////////////////////////////// state for loading /////////////////////

  const [loading, setloading] = useState<boolean>(false);

  ////////////////////////////// state for error management //////////////////////

  const [error, seterror] = useState<string>("");

  const formikOnSubmit = (formValues: IAddResort) => {
    if (submitType === "add") {
      const data = new FormData();
      data.append("file", formValues.image);
      data.append("upload_preset", "resortManagemen");
      data.append("cloud_name", "dhcvbjebj");
      // uploading to cloudinary and taking the url
      fetch("https://api.cloudinary.com/v1_1/dhcvbjebj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          createResortApi(formValues, data?.url)
            .then((res) => {
              dispatch(updateAllResortDetails(res.data.data));
              navigate("/admin/resortmanagement");
              seterror('')
            })
            .catch((err) => seterror(err.response.data.message)) 
        })
        .catch((err) => {
          seterror("Image not uploaded to cloudinary");
        })
        .finally(() => {
          setloading(false);
        });
    }
  };

  const initialValues = {
    image: "",
    name: "",
    heading: "",
    description: "",
    location: "",
    email: "",
    customerCareNo: "",
    features: [""],
  };

  return (
    <div className="bg-slate-400 flex flex-col items-center w-full min-h-screen  p-10">
      <Header />
      <Formik
        initialValues={initialValues}
        validationSchema={addResort}
        onSubmit={(values, { resetForm }) => {
          formikOnSubmit(values);
          // resetForm();
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <div className="p-12 bg-slate-600 mt-32 w-[780px] text-center">
              {error && <div className="text-red-500">{error}</div>}
              {loading && (
                <img
                  width={50}
                  src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1679738426/Spinner-1s-200px_1_twv42p.gif"
                  alt=""
                />
              )}
              <h1 className="text-center mb-10">ADD RESORT</h1>
              {values.image && <PreviewImage file={values.image} />}
              <Input
                type="file"
                class="bg-black "
                onChange={(event) => {
                  event.target.files &&
                    setFieldValue("image", event.target.files[0]);
                }}
                placeholder="Choose File"
                name="image"
                value={undefined}
              />
              {touched.image && errors.image && (
                <div className="text-red-500 text-left">{errors.image}</div>
              )}
              <Field
                name="name"
                class="border-0 border-b-2 border-white box-border p-[16px] block w-full bg-[#1E1E1E] bg-opacity-70 text-white tracking-wide"
                placeholder="Resort Name"
                type="text"
              />
              {touched.name && errors.name && (
                <div className="text-red-500 text-left">{errors.name}</div>
              )}
              <Field
                name="heading"
                class="border-0 border-b-2 border-white box-border p-[16px] block w-full bg-[#1E1E1E] bg-opacity-70 text-white tracking-wide"
                placeholder="Heading"
                type="text"
              />
              {touched.heading && errors.heading && (
                <div className="text-red-500 text-left">{errors.heading}</div>
              )}
              <Field
                name="description"
                className="border-0 border-b-2 border-white box-border p-[16px] block w-full bg-[#1E1E1E] bg-opacity-70 text-white tracking-wide"
                placeholder="Description"
              />
              {touched.description && errors.description && (
                <div className="text-red-500 text-left">
                  {errors.description}
                </div>
              )}
              <Field
                name="location"
                className="border-0 border-b-2 border-white box-border p-[16px] block w-full bg-[#1E1E1E] bg-opacity-70 text-white tracking-wide"
                placeholder="Location"
              />
              {touched.location && errors.location && (
                <div className="text-red-500 text-left">{errors.location}</div>
              )}
              <Field
                name="email"
                className="border-0 border-b-2 border-white box-border p-[16px] block w-full bg-[#1E1E1E] bg-opacity-70 text-white tracking-wide"
                placeholder="Email"
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-left">{errors.email}</div>
              )}
              <Field
                name="customerCareNo"
                type="text"
                className="border-0 border-b-2 border-white box-border p-[16px] block w-full bg-[#1E1E1E] bg-opacity-70 text-white tracking-wide"
                placeholder="CustomerCareNo"
              />
              {touched.customerCareNo && errors.customerCareNo && (
                <div className="text-red-500 text-left">
                  {errors.customerCareNo}
                </div>
              )}
              <FieldArray name="features">
                {(fieldArrayProps) => {
                  console.log(fieldArrayProps);
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { features } = values;
                  return (
                    <div>
                      {features.map((item: any, index: number) => (
                        <>
                          <div key={index} className="flex">
                            <Field
                              class="order-0 border-b-2 border-white box-border p-[16px] block w-full bg-[#1E1E1E] bg-opacity-70 text-white tracking-wide"
                              name={`features[${index}]`}
                              placeholder={`Feature ${index + 1}`}
                              type="text"
                            />

                            {index > 0 && (
                              <Button
                                class="px-3 border"
                                color="danger"
                                onClick={remove}
                                OnClickItem={index}
                              >
                                X
                              </Button>
                            )}
                          </div>
                          <ErrorMessage name={`features[${index}]`}>
                            {(msg) => (
                              <div style={{ color: "red", textAlign: "left" }}>
                                {msg}
                              </div>
                            )}
                          </ErrorMessage>
                        </>
                      ))}
                      <Button
                        class="border w-full"
                        color="premium"
                        onClick={push}
                        disable={false}
                      >
                        Add New Feature
                      </Button>
                    </div>
                  );
                }}
              </FieldArray>
              <Button
                type="submit"
                class="py-3 px-4 rounded mt-8 mx-10"
                color="primary"
              >
                ADD RESORT
              </Button>
              <Button class="py-3 px-4 rounded mt-8 mx-10" color="danger">
                CANCEL
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddResort;
