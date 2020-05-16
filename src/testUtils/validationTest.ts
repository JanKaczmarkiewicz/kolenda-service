import { validateArgs, ValidationError } from "../utils/validateArgs";
import * as yup from "yup";

export const createValidationTest = (schema: yup.ObjectSchema) => async (
  input: object,
  expectedErrors: ValidationError[]
) => {
  const errors = await validateArgs(schema, input);
  expect(errors).toEqual(expect.arrayContaining(expectedErrors));
};
