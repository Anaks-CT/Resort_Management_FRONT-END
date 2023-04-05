import * as yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const addResort = yup.object().shape({
  image: yup
    .mixed()
    .nullable()
    .required("Image file is required")
    .test(
      "FILE_FORMAT",
      "Choose a valid file format",
      (value: any) =>
        !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
  name: yup.string().trim().required("Name cannot be empty"),
  heading: yup.string().trim().required("Heading cannot be empty"),
  description: yup.string().trim().required("Description cannot be empty"),
  location: yup.string().trim().required("Description cannot be empty"),
  email: yup
    .string()
    .trim()
    .required("Enter you email")
    .test("isvalidEmail", "Enter a valid Email", (arg) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(arg)
    ),
  customerCareNo: yup
    .string()
    .trim()
    .matches(/^[0-9]{10}$/, "Customer Care number is not valid"),
    // .required("Customer Care number is required"),
  features: yup
    .array()
    .of(yup.string().required("Feature is required"))
    .min(1, "At least one feature is required"),
});

export const editBanner = yup.object().shape({
  description1: yup.string().trim().required("Description cannot be empty"),
  description2: yup.string().trim().required("Description cannot be empty"),
});
