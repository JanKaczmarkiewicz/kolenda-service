import * as yup from "yup";
import { UserInputError } from "apollo-server";

interface ValidationError {
  path: string;
  message: string;
}

export const validateArgs = async (
  schema: yup.ObjectSchema,
  args: Object
): Promise<ValidationError[]> => {
  try {
    await schema.validate(args, { abortEarly: false });
  } catch (err) {
    console.log(err);
    const errors = err.inner.map(({ path, message }: ValidationError) => ({
      name: path,
      message,
    }));
    console.log(errors);
    return errors;
  }
  return [];
};
