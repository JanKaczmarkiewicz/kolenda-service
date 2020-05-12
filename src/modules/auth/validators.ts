import * as yup from "yup";
import commonErrors from "../shered/errors";
import errors from "./errors";

const password = yup
  .string()
  .required(commonErrors.any.required)
  .min(8, errors.password.min)
  .matches(/[a-zA-Z]\w{3,14}/, errors.password.format);

const email = yup
  .string()
  .email(errors.email.format)
  .required(commonErrors.any.required);

const username = yup
  .string()
  .matches(/^[_A-z0-9]/, errors.username.format)
  .required(commonErrors.any.required);

export const registerSchema = yup.object().shape({
  password,
  email,
  username,
});

export const loginSchema = yup.object().shape({
  email,
  password,
});
