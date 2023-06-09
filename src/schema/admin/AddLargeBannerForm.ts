import * as yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const addBanner = yup.object().shape({
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
  description1: yup.string().trim().required("Description cannot be empty"),
  description2: yup.string().trim().required("Description cannot be empty"),
});

export const editBanner = yup.object().shape({
  description1: yup.string().trim().required("Description cannot be empty"),
  description2: yup.string().trim().required("Description cannot be empty"),
});

export const editImage = yup.object().shape({
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
});
