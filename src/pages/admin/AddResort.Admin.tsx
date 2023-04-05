import React, { useState } from "react";
import { Header } from "../../components/Manager/Header";
import Input from "../../components/UI/Input";
import { addResort } from "../../schema/admin/addResortForm";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Button from "../../components/UI/Button";
import PreviewImage from "../../components/UI/PreviewImage";
import { IAddResort } from "../../interface/resort.interface";
import { createResortApi, editResortApi } from "../../api/resort.api";
import { useDispatch } from "react-redux";
import { updateAllResortDetails } from "../../store/slices/allResortSlice";
import { useLocation, useNavigate } from "react-router-dom";

function AddResort() {
  //////////////////////////// message passed from other pages //////////////////////////////
  // current resortDetails of the editClicked resort in resort management table
  const location = useLocation();

  //////////////////////////// choosing submit function according to add button or edit button click //////////
  const [submitType, setSubmitType] = useState<"add" | "edit">("add");
  //   const formikOnsubmitType = () => {};

  const navigate = useNavigate();
  const dispatch = useDispatch();

  ////////////////////////////// state for loading /////////////////////

  const [loading, setloading] = useState<boolean>(false);

  ////////////////////////////// state for error management //////////////////////

  const [error, seterror] = useState<string>("");

  //////////////////////////////////////////// setting up initial values for formik //////////////////////////
  // if(state){}
  // const {state} = location
  const state = location?.state;
  let data:
    | {
        _id: string;
        resortDetails: {
          name: string;
          heading: string;
          description: string;
          image: string;
          features: string[];
        };
        location: string;
        email: string;
        customerCareNo: string;
      }[]
    | undefined;
  if (state) data = state?.data;
  console.log(data);

  let editInitialValues;
  if (data) {
    editInitialValues = {
      image: "",
      name: data[0].resortDetails.name as string,
      heading: data[0].resortDetails.heading as string,
      description: data[0].resortDetails.description as string,
      location: data[0].location as string,
      email: data[0].email as string,
      customerCareNo: data[0].customerCareNo as string,
      features: data[0].resortDetails.features as string[],
    };
  }

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

  ////////////////////////////// formik onsubmit function ////////////////////////
  // function according to add resort or edit resort
  const formikOnSubmit = (formValues: IAddResort) => {
    setloading(true);
    if (!data) {
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
              // updating the all resort slice in redux
              dispatch(updateAllResortDetails(res.data.data));
              navigate("/admin/resortmanagement");
              seterror("");
            })
            .catch((err) => {
              seterror(err.response.data.message)
              setloading(false)
            });
        })
        .catch((err) => {
          seterror("Image not uploaded to cloudinary");
        })
        .finally(() => {
          setloading(false);
        });
    } else {
      if (formValues.image) {
        const formData = new FormData();
        formData.append("file", formValues.image);
        formData.append("upload_preset", "resortManagemen");
        formData.append("cloud_name", "dhcvbjebj");
        // uploading to cloudinary and taking the url
        fetch("https://api.cloudinary.com/v1_1/dhcvbjebj/image/upload", {
          method: "post",
          body: formData,
        })
          .then((res) => res.json())
          .then((responseData) => {
            editResortApi(formValues, responseData?.url, data && data[0]._id)
              .then((res) => {
                console.log(res);
                // updating the all resort slice in redux
                dispatch(updateAllResortDetails(res.data.data));
                navigate("/admin/resortmanagement");
                seterror("");
              })
              .catch((err) => {
                seterror(err.response.data.message);
                setloading(false);
              });
          })
          .catch((err) => {
            seterror("Image not uploaded to cloudinary");
          })
          .finally(() => {
            setloading(false);
          });
      } else {
        editResortApi(formValues, null, data && data[0]._id)
          .then((res) => {
            console.log(res);
            // updating the all resort slice in redux
            dispatch(updateAllResortDetails(res.data.data));
            navigate("/admin/resortmanagement");
            seterror("");
          })
          .catch((err) => {
            seterror(err.response.data.message)
            setloading(false)
          });
      }
    }
  };

  return (
    <div className="bg-slate-400 flex flex-col items-center w-full min-h-screen  p-10">
      <Header />
      <Formik
        initialValues={
          data
            ? editInitialValues
              ? editInitialValues
              : initialValues
            : initialValues
        }
        validationSchema={addResort}
        onSubmit={(values, { resetForm }) => {
          formikOnSubmit(values);
          // resetForm();
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <div className="p-12 bg-slate-600 mt-32 w-[780px] text-center">
              {loading && (
                <div className="flex justify-center">
                  <img
                    width={50}
                    src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
                    alt=""
                  />
                </div>
              )}
              {error && <div className="text-red-500">{error}</div>}
              <h1 className="text-center mb-10">ADD RESORT</h1>
              {!values.image && data && (
                <div className="flex justify-center">
                  <img
                    width={"178px"}
                    src={data && data[0]?.resortDetails.image}
                    alt=""
                  ></img>
                </div>
              )}
              {values.image && <PreviewImage file={values.image} />}
              <Input
                type="file"
                class="bg-black mt-10"
                onChange={(event) => {
                  event.target.files &&
                    setFieldValue("image", event.target.files[0]);
                }}
                placeholder="Choose File"
                name="image"
                value={undefined}
                required={data ? false : true}
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
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { features } = values;
                  return (
                    <div>
                      {features?.map((item: any, index: number) => (
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
                disable={loading ? true : false}
              >
                {state ? "EDIT RESORT" : "ADD RESORT"}
              </Button>
              <Button
                class="py-3 px-4 rounded mt-8 mx-10"
                color="danger"
                disable={loading ? true : false}
                onClick={() => navigate("/admin/resortmanagement")}
              >
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
