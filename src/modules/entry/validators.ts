import * as yup from "yup";

export const addEntryValidation = yup.object().shape({
  house: yup.string().required(),
  pastoralVisit: yup.string().required(),
});

export const updateEntryValidation = yup.object().shape({
  house: yup.string().required(),
  pastoralVisit: yup.string().required(),
});

// const password = yup
//   .string()
//   .required(passwordError.required)
//   .min(8, ({ min }) => passwordError.min(min))
//   .matches(/[a-zA-Z]\w{3,14}/, passwordError.format);

// const email = yup
//   .string()
//   .email(emailError.format)
//   .required(emailError.required);

// const username = yup
//   .string()
//   .matches(/^[_A-z0-9]/, usernameError.format)
//   .required(usernameError.required);

// export const registerSchema = yup.object().shape({
//   password,
//   email,
//   username,
// });

// export const loginSchema = yup.object().shape({
//   username,
//   email,
//   password,
// });
