import * as yup from "yup";

export const bookingForm1 = yup.object().shape({
  destination: yup.object().shape({
    name: yup
      .string()
      .matches(
        /^[A-Za-z0-9]+$/,
        "Only alphabetic characters and numbers are allowed"
      )
      .required("Destination name is required"),
    id: yup.string().required("Destination id is required"),
  }),
  roomDetail: yup
    .array()
    .of(
      yup
        .number()
        .typeError("Please provide a number")
        .integer("Please provide an integer")
        .positive("Please provide a positive number")
        .max(10, "Maximum no. of People must be less than 10")
        .min(1, "Minimum atleast 1 person required")
        .required("Please provide the number of people")
    )
    .min(1, "Please provide the number of people"),
  date: yup.object().shape({
    startDate: yup.date().required("Start date is required"),
    endDate: yup.date().required("End date is required"),
    key: yup.string().trim().required("Selection is required"),
  }),
});
