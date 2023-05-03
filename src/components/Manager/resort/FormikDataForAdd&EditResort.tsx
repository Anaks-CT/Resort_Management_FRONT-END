import { ErrorMessage, Field, Form, Formik, FieldArray, FormikErrors } from 'formik';
import { addResort } from '../../../schema/admin/addResortForm';
import PreviewImage from '../../UI/PreviewImage';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { IAddResort } from '../../../interface/resort.interface';
import { useNavigate } from 'react-router-dom';


type props = {
    data: {
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
    editInitialValues: any
    initialValues: any
    formikOnSubmit: (formValues: IAddResort) => void
    loading: boolean
    error: string
}

function FormikDataForResortManagement({data, editInitialValues, initialValues, formikOnSubmit, loading, error}: props) {
    const navigate = useNavigate()
  //   const [managerDetails, setManagerDetails] = useState<IManager[]>()
  //   useEffect(() => {
  //     if(data){
  //       getMangersByResortApi(data[0]._id)
  //       .then(res => setManagerDetails(res.data.data))
  //       .catch(err => {console.log(err);toastMessage('error', err?.response?.data?.message)})
  //     }
  //   }, [])
    
  //   const renderData = managerDetails?.map((item, i) => (
  //     <option value={item._id}>{item.name}</option>
  // ))
  return (
    <Formik
        initialValues={
          data
            ? editInitialValues
              ? editInitialValues
              : initialValues
            : initialValues
        }
        validationSchema={addResort}
        onSubmit={(values) => {
          formikOnSubmit(values);
          // resetForm();
        }}
      >
        {({ errors, touched, setFieldValue, values, handleChange }) => (
          <Form>
            <div className="p-12 bg-[#1E1E1E] mt-32 mb-20 w-[780px] text-center">
              
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
                class="bg-transparent mt-10"
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
                <div className="text-red-500 text-left">{errors.image as FormikErrors<''>}</div>
              )}
              
              <div className='relative'>
                {values.name && <span className='absolute text-[12px] text-[#636c72] left-3 tracking-wider'>Resort name</span>}
              <Field
                name="name"
                className="border-0 border-b-2 border-white box-border pt-[20px] mt-2 block w-full bg-transparent bg-opacity-70 text-white tracking-wide"
                placeholder="Resort Name"
                type="text"
              />
              {touched.name && errors.name && (
                <div className="text-red-500 text-left">{errors.name as FormikErrors<''>}</div>
              )}
              </div>
              <div className='relative'>
              {values.heading && <span className='absolute text-[12px] text-[#636c72] left-3 tracking-wider'>Heading</span>}
              <Field
                name="heading"
                className="border-0 border-b-2 border-white box-border pt-[20px] mt-2 block w-full bg-transparent bg-opacity-70 text-white tracking-wide"
                placeholder="Heading"
                type="text"
              />
              {touched.heading && errors.heading && (
                <div className="text-red-500 text-left">{errors.heading as FormikErrors<''>}</div>
              )}
              </div>
              <div className='relative'>
              {values.description && <span className='absolute text-[12px] text-[#636c72] left-3 tracking-wider'>Description</span>}
              <Field
                name="description"
                className="border-0 border-b-2 border-white box-border px-3 pt-[20px] mt-2 block w-full bg-transparent bg-opacity-70 text-white tracking-wide"
                placeholder="Description"
              />
              {touched.description && errors.description && (
                <div className="text-red-500 text-left">
                  {errors.description as FormikErrors<''>}
                </div>
              )}
              </div>
              <div className='relative'>
              {values.location && <span className='absolute text-[12px] text-[#636c72] left-3 tracking-wider'>Location</span>}
              <Field
                name="location"
                className="border-0 border-b-2 border-white box-border px-3 pt-[20px] mt-2 block w-full bg-transparent bg-opacity-70 text-white tracking-wide"
                placeholder="Location"
              />
              {touched.location && errors.location && (
                <div className="text-red-500 text-left">{errors.location as FormikErrors<''>}</div>
              )}
              </div>
              <div className='relative'>
              {values.email && <span className='absolute text-[12px] text-[#636c72] left-3 tracking-wider'>Email</span>}
              <Field
                name="email"
                className="border-0 border-b-2 border-white box-border px-3 pt-[20px] mt-2 block w-full bg-transparent bg-opacity-70 text-white tracking-wide"
                placeholder="Email"
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-left">{errors.email as FormikErrors<''>}</div>
              )}
              </div>
              <div className='relative'>
              {values.customerCareNo && <span className='absolute text-[12px] text-[#636c72] left-3 tracking-wider'>CustomerCareNo</span>}
              <Field
                name="customerCareNo"
                type="text"
                className="border-0 border-b-2 border-white box-border pt-[20px] mt-2 block w-full bg-transparent bg-opacity-70 text-white tracking-wide"
                placeholder="CustomerCareNo"
              />
              {touched.customerCareNo && errors.customerCareNo && (
                <div className="text-red-500 text-left">
                  {errors.customerCareNo as FormikErrors<''>}
                </div>
              )}
              </div>
              {/* {data && <select name='resortId' value={values.managerId} onChange={handleChange} className='my-select border-0 border-b-2 w-full border-white box-border block bg-opacity-70 pt-[30px] text-white tracking-wide bg-transparent'>
                <option value="" selected disabled>--select Manager--</option>
                {renderData}
              </select>} */}
              <div className='text-white text-xl tracking-wider my-5'>Features</div>
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
                            <span className='py-2 pt-7 text-white w-10'>{index+1} . </span>
                            <Field
                              className="order-0 border-b-2 border-white box-border pt-[20px] block w-full bg-transparent bg-opacity-70 text-white tracking-wide"
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
                              <div className='pl-11' style={{ color: "red", textAlign: "left" }}>
                                {msg}
                              </div>
                            )}
                          </ErrorMessage>
                        </>
                      ))}
                      <div className='pl-9'>
                        <Button
                          class="border w-full"
                          color="premium"
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
              <div className='mt-10'>
              {loading && (
                <div className="flex justify-center">
                  <img
                    width={50}
                    src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
                    alt=""
                  />
                </div>
              )}
              {error && <div className="text-red-500 text-center">{error}</div>}
              </div>
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
                onClick={() => navigate("/admin/resortmanagement")}
              >
                CANCEL
              </Button>
            </div>
          </Form>
        )}
      </Formik>
  )
}

export default FormikDataForResortManagement