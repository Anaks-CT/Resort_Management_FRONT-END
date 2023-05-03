import * as yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const profileSchema = yup.object().shape({
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
  firstName: yup
    .string()
    .trim()
    .required("First name can't be empty")
    .test("isPerfectString", "Enter a valid name", (arg) =>
      /^[A-Za-z ]+$/.test(arg)
    ),
  lastName: yup
    .string()
    .trim()
    .required("Last name can't be empty")
    .test("isPerfectString", "Enter a valid name", (arg) =>
      /^[A-Za-z ]+$/.test(arg)
    ),
});
