import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const activateAccountSchema = yup.object().shape({
  pin: yup.string().required(),
});
