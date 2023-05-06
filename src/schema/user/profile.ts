import * as yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const profileSchema = yup.object().shape({
  image: yup
    .mixed()
    .nullable()
    .test(
      "FILE_FORMAT",
      "Choose a valid file format",
      (value: any) =>
        !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
  name: yup
    .string()
    .trim()
    .required("name can't be empty")
    .test("isPerfectString", "Enter a valid name", (arg) =>
      /^[A-Za-z ]+$/.test(arg)
    ),
});
