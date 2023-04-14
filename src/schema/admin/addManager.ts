import * as yup from "yup";

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name can't be empty")
    .test("isPerfectString", "Enter a valid name", (arg) =>
      /^[A-Za-z ]+$/.test(arg)
    ),
  phone: yup
    .string()
    .trim()
    .matches(/^[0-9]{10}$/, "Phone number is not valid")
    .required("Phone Number can't be empty"),
  email: yup
    .string()
    .trim()
    .required("Enter you email")
    .test('isvalidEmail', "Enter a valid Email", (arg) => 
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(arg)),
  password: yup
    .string()
    .trim()
    .required("Password can't be empty")
    .min(8, "Too short password")
    .max(16, "Too long password")
    .test("isPerfectPasswrod", "Enter a strong password", (arg) =>
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])(?!.*\s).{8,16})/.test(arg)
    ),
    cPassword: yup
    .string()
    .trim()
    .required("Confirm password can't be empty")
    .oneOf([yup.ref('password')], 'Passwords must match'),
    resortId: yup
    .string()
    .trim()
    .required("Resort can't be empty")
});


