import * as Yup from "yup";

export const validationSchema = Yup.object({
    userName: Yup.string()
      .min(2, "At least 2 symbols")
      .required("This field is required"),
    password: Yup.string().required("This field is required"),
  })