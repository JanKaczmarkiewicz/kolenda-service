import * as yup from "yup";

export interface ValidationError {
  path: string;
  message: string;
}

export const validateArgs = async (
  schema: yup.ObjectSchema,
  args: object
): Promise<ValidationError[]> => {
  try {
    await schema.validate(args, { abortEarly: false });
  } catch (err) {
    const errors = err.inner.map(({ path, message }: ValidationError) => ({
      path,
      message,
    }));
    return errors;
  }
  return [];
};
