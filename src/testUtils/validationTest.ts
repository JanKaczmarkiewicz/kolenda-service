import { validateArgs } from "../utils/validateArgs";
import * as yup from "yup";
import { ValidationError } from "../utils/validateArgs";

export const createValidationTest = (schema: yup.ObjectSchema) => async (
  input: object,
  expectedErrors: ValidationError[]
) => {
  const errors = await validateArgs(schema, input);
  expect(errors).toEqual(expect.arrayContaining(expectedErrors));
};
