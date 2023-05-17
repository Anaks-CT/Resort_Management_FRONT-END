import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikErrors,
} from "formik";
import PreviewImage from "../../UI/PreviewImage";
import Button from "../../UI/Button";
import { IAddRoom, IRoom } from "../../../interface/room.interface";
import addRoomSchema from "../../../schema/admin/addRoom";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";

type props = {
  data: IRoom | undefined;
  editInitialValues: any;
  initialValues: any;
  formikOnSubmit: (formValues: IAddRoom, roomId?: string) => void;
  loading: boolean;
  error: string;
};
function AddEditRoomForm({
  data,
  editInitialValues,
  initialValues,
  formikOnSubmit,
  loading,
  error,
}: props) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentResort = useSelector((state: IStore) => state.resort.resortName);

  const navigateBack = (message?: string) => {
    if(location.pathname === `/admin/${currentResort}/room/customizeRoom`||location.pathname === `/admin/${currentResort}/Room/customizeRoom`){
      navigate(`/admin/${currentResort}/room`);
    }else if(location.pathname === '/manager/room/customize'||location.pathname === '/manager/Room/customize'){
      navigate(`/manager/room`);
    }
  }
  return (
    <>
      <div className="md:p-20 p-10">
        <h1 className="text-center mb-10">Customize Room</h1>
        <Formik
          initialValues={
            data
              ? editInitialValues
                ? editInitialValues
                : initialValues
              : initialValues
          }
          validationSchema={addRoomSchema}
          onSubmit={(values) => formikOnSubmit(values, data?._id)}
        >
          {({ errors, touched, setFieldValue, values }) => {
            return (
              <Form id="forms">
                <div className="bg-white md:flex md:justify-around  px-10 pt-10">
                  <div className=" lg:h-60 md:w-72 w-52 md:h-32 mx-auto h-32 border">
                    {values.images.length < 1 && data && (
                      <img
                        className="h-full w-full"
                        src={data.images[0]}
                        alt=""
                      ></img>
                    )}
                    {values.images[0] && (
                      <PreviewImage roomCustomize={true}  file={values.images[0]} />
                    )}
                  </div>

                  <div className=" lg:h-60 md:w-72 w-52 md:h-32 mx-auto h-32 border">
                    {values.images.length < 1 && data && (
                      <img
                        className="h-full w-full"
                        src={data.images[1]}
                        alt=""
                      ></img>
                    )}
                    {values.images[1] && (
                      <PreviewImage roomCustomize={true}  file={values.images[1]} />
                    )}
                  </div>
                  <div className=" lg:h-60 md:w-72 w-52 md:h-32 mx-auto h-32 border">
                    {values.images.length < 1 && data && (
                      <img
                        className="h-full w-full"
                        src={data.images[2]}
                        alt=""
                      ></img>
                    )}
                    {values.images[2] && (
                      <PreviewImage roomCustomize={true}  file={values.images[2]} />
                    )}
                  </div>
                  <div className=" lg:h-60 md:w-72 w-52 md:h-32 mx-auto h-32 border">
                    {values.images.length < 1 && data && (
                      <img
                        className="h-full w-full"
                        src={data.images[3]}
                        alt=""
                      ></img>
                    )}
                    {values.images[3] && (
                      <PreviewImage roomCustomize={true}  file={values.images[3]} />
                    )}
                  </div>
                </div>
                <div className="bg-white flex flex-col items-center justify-center pb-10">
                  <input
                    type="file"
                    className="border md:mt-10 mb-10 md:mb-0"
                    onChange={(event) => {
                      event.target.files &&
                        setFieldValue("images", [...event.target.files]);
                    }}
                    placeholder="Choose File"
                    name="images"
                    value={undefined}
                    multiple
                  />
                  <ErrorMessage name={`images`}>
                    {(msg) => (
                      <span
                        className="text-center"
                        style={{ color: "red", textAlign: "left" }}
                      >
                        {msg}
                      </span>
                    )}
                  </ErrorMessage>
                </div>
                <div className="w-full md:flex bg-white md:p-10 pb-10">
                  <div className="md:w-1/2 w-full px-10">
                    <div className="relative">
                      {values.name && (
                        <span className="absolute -top-4  text-[12px] text-[#636c72] left-0 tracking-wider">
                          Room Type
                        </span>
                      )}
                      <Field
                        name="name"
                        class="mt-5 box-border p-[16px] block w-full tracking-wide"
                        placeholder="Room Type"
                        type="text"
                      />
                      {touched.name && errors.name && (
                        <div className="text-red-500 text-left">
                          {errors.name as FormikErrors<"">}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      {values.description && (
                        <span className="absolute -top-4  text-[12px] text-[#636c72] left-0 tracking-wider">
                          Description
                        </span>
                      )}
                      <Field
                        name="description"
                        class="mt-5 box-border p-[16px] block w-full tracking-wide"
                        placeholder="Description"
                        type="text"
                      />
                      {touched.description && errors.description && (
                        <div className="text-red-500 text-left">
                          {errors.description as FormikErrors<"">}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:w-1/2 w-full px-10">
                    <div className="relative">
                      {values.maxPeople && (
                        <span className="absolute -top-4  text-[12px] text-[#636c72] left-0 tracking-wider">
                          Maximum people
                        </span>
                      )}
                      <Field
                        name="maxPeople"
                        class="mt-5 box-border p-[16px] block w-full tracking-wide"
                        placeholder="Maximum people"
                        type="number"
                      />
                      {touched.maxPeople && errors.maxPeople && (
                        <div className="text-red-500 text-left">
                          {errors.maxPeople as FormikErrors<"">}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      {values.noOfRooms && (
                        <span className="absolute -top-4  text-[12px] text-[#636c72] left-0 tracking-wider">
                          Number of Rooms
                        </span>
                      )}
                      <Field
                        name="noOfRooms"
                        class="mt-5 box-border p-[16px] block w-full tracking-wide"
                        placeholder="Number of Rooms"
                        type="number"
                      />
                      {touched.noOfRooms && errors.noOfRooms && (
                        <div className="text-red-500 text-left">
                          {errors.noOfRooms as FormikErrors<"">}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      {values.area && (
                        <span className="absolute -top-4  text-[12px] text-[#636c72] left-0 tracking-wider">
                          Room Area in m^2
                        </span>
                      )}
                      <Field
                        name="area"
                        class="mt-5 box-border p-[16px] block w-full tracking-wide"
                        placeholder="Room Area in m^2"
                        type="number"
                      />
                      {touched.area && errors.area && (
                        <div className="text-red-500 text-left">
                          {errors.area as FormikErrors<"">}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-10 pb-10 bg-white">
                  <h2 className="text-black mb-10 text-3xl font-black text-center">
                    Room Packages
                  </h2>
                  <FieldArray name="packages">
                    {({ insert, remove, push }) => (
                      <div>
                        {values?.packages?.length > 0 &&
                          values.packages.map((friend: any, index: number) => (
                            <>
                              <h3 className="text-black text-center text-2xl mb-5">
                                Package {index + 1}
                              </h3>
                              <div className="row md:flex" key={index}>
                                <div className="w-full md:px-10">
                                  <div className="relative">
                                    {values.packages[index].packageName && (
                                      <span className="absolute -top-4  text-[12px] text-[#636c72] left-0 tracking-wider">
                                        Package Name
                                      </span>
                                    )}

                                    <Field
                                      name={`packages.${index}.packageName`}
                                      placeholder="Package Name"
                                      class="mt-5 box-border p-[16px] block w-full tracking-wide"
                                      type="text"
                                    />
                                    <ErrorMessage
                                      name={`packages.${index}.packageName`}
                                      component="div"
                                      className="field-error text-red-500"
                                    />
                                  </div>
                                </div>
                                <div className="w-full md:px-10">
                                  <div className="relative">
                                    {values.packages[index].cost && (
                                      <span className="absolute -top-4  text-[12px] text-[#636c72] left-0 tracking-wider">
                                        Cost
                                      </span>
                                    )}

                                    <Field
                                      name={`packages.${index}.cost`}
                                      placeholder="Cost"
                                      class="mt-5 box-border p-[16px] block w-full tracking-wide"
                                      type="number"
                                    />
                                    <ErrorMessage
                                      name={`packages.${index}.cost`}
                                      component="div"
                                      className="field-error text-red-500"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="font-normal text-2xl my-5 text-center">Package Features</div>
                                <FieldArray name={`packages.${index}.features`}>
                                  {(fieldArrayProps) => {
                                    const { push, remove, form } =
                                      fieldArrayProps;
                                    const { values } = form;
                                    const { packages } = values;

                                    return (
                                      <div>
                                        {packages[index].features?.map(
                                          (item: any, indexNumber: number) => (
                                            <>
                                              <div
                                                key={indexNumber}
                                                className="flex md:px-10"
                                              >
                                                <span className='py-2 pt-7 w-8'>{indexNumber+1} . </span>
                                                <Field
                                                  class="mb box-border p-[16px] block w-full tracking-wide"
                                                  name={`packages.${index}.features[${indexNumber}]`}
                                                  placeholder={`Feature ${
                                                    indexNumber + 1
                                                  }`}
                                                  type="text"
                                                />

                                                {indexNumber > 0 && (
                                                  <Button
                                                    class="px-3 border"
                                                    color="danger"
                                                    onClick={remove}
                                                    OnClickItem={indexNumber}
                                                  >
                                                    X
                                                  </Button>
                                                )}
                                              </div>
                                              <ErrorMessage
                                                name={`packages.${index}.features[${indexNumber}]`}
                                              >
                                                {(msg) => (
                                                  <div
                                                    className="md:px-10 ml-8"
                                                    style={{
                                                      color: "red",
                                                      textAlign: "left",
                                                    }}
                                                  >
                                                    {msg}
                                                  </div>
                                                )}
                                              </ErrorMessage>
                                            </>
                                          )
                                        )}

                                        <div className="md:px-10 mb-10">
                                          <Button
                                            class="border w-full"
                                            color="black"
                                            onClick={push}
                                            disable={false}
                                          >
                                            Add New Feature
                                          </Button>
                                        </div>
                                      </div>
                                    );
                                  }}
                                </FieldArray>
                              </div>
                              <div className="text-center">
                                {index > 0 && (
                                  <button
                                    onClick={() => remove(index)}
                                    className="p-5 h-14 bg-red-600 text-white mb-10"
                                  >
                                    REMOVE PACKAGE
                                  </button>
                                )}
                              </div>
                            </>
                          ))}
                        <Button
                          type="button"
                          color="primary"
                          class="secondary text-center px-4 py-3 w-full"
                          onClick={() =>
                            push({ name: "", cost: "", features: [""] })
                          }
                        >
                          ADD NEW PACKAGE
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <div className="bg-white p-10">
                  <h2 className="text-black mb-10 text-3xl font-black text-center">
                    Highlights
                  </h2>
                  <FieldArray name="highlights">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { highlights } = values;
                      return (
                        <div className="md:px-10">
                          {highlights?.map((item: any, index: number) => (
                            <>
                              <div key={index} className="flex">
                              <span className='py-2 pt-7 w-8'>{index+1} . </span>

                                <Field
                                  class=" box-border p-[16px] block w-full tracking-wide"
                                  name={`highlights[${index}]`}
                                  placeholder={`Highlight ${index + 1}`}
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
                              <ErrorMessage name={`highlights[${index}]`}>
                                {(msg) => (
                                  <div className="pl-8"
                                    style={{ color: "red", textAlign: "left" }}
                                  >
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </>
                          ))}
                          <div className="pl-8">
                          <Button
                            class="border w-full"
                            color="black"
                            onClick={push}
                            disable={false}
                          >
                            Add New Highlights
                          </Button>
                          </div>
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="bg-white p-10">
                  <h2 className="text-black mb-10 text-3xl font-black text-center">
                    Amenities
                  </h2>
                  <FieldArray name="amenities">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { amenities } = values;
                      return (
                        <div className="md:px-10">
                          {amenities?.map((item: any, index: number) => (
                            <>
                              <div key={index} className="flex">
                              <span className='py-2 pt-7 w-8'>{index+1} . </span>
                                <Field
                                  class=" box-border p-[16px] block w-full tracking-wide"
                                  name={`amenities[${index}]`}
                                  placeholder={`Amenity ${index + 1}`}
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
                              <ErrorMessage name={`amenities[${index}]`}>
                                {(msg) => (
                                  <div className="pl-8"
                                    style={{ color: "red", textAlign: "left" }}
                                  >
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </>
                          ))}
                          <div className="pl-8">
                          <Button
                            class="border w-full"
                            color="black"
                            onClick={push}
                            disable={false}
                          >
                            Add New Amenities
                          </Button>
                          </div>
                        </div>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="bg-white p-10">
                  <h2 className="text-black mb-10 text-3xl font-black text-center">
                    facilities
                  </h2>
                  <FieldArray name="facilities">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { facilities } = values;
                      return (
                        <div className="md:px-10">
                          {facilities?.map((item: any, index: number) => (
                            <>
                              <div key={index} className="flex">
                              <span className='py-2 pt-7 w-8'>{index+1} . </span>
                                <Field
                                  class=" box-border p-[16px] block w-full tracking-wide"
                                  name={`facilities[${index}]`}
                                  placeholder={`Facility ${index + 1}`}
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
                              <ErrorMessage name={`facilities[${index}]`}>
                                {(msg) => (
                                  <div className="pl-8"
                                    style={{ color: "red", textAlign: "left" }}
                                  >
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </>
                          ))}
                          <div className="pl-8">
                          <Button
                            class="border w-full"
                            color="black"
                            onClick={push}
                            disable={false}
                          >
                            Add New Facilities
                          </Button>
                          </div>
                        </div>
                      );
                    }}
                  </FieldArray>
                  {loading && (
                    <div className="flex justify-center">
                      <img
                        width={50}
                        src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
                        alt=""
                      />
                    </div>
                  )}
                  <div className="text-center mt-10 text-red-500">{error}</div>
                  <div className="text-center ">
                    <Button
                      type="submit"
                      class="py-3 px-4 rounded mt-8 mx-10"
                      color="primary"
                      disable={loading ? true : false}
                    >
                      {data ? "EDIT RESORT" : "ADD RESORT"}
                    </Button>
                    <Button
                      class="py-3 px-4 rounded mt-8 mx-10"
                      color="danger"
                      disable={loading ? true : false}
                      onClick={() => navigateBack()}
                    >
                      CANCEL
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default AddEditRoomForm;
