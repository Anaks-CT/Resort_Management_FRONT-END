import * as yup from 'yup'

export const faqSchema = yup.object().shape({
    question: yup.string().trim().required("Question cannot be empty"),
    answer: yup.string().trim().required("Answer cannot be empty"),
  });