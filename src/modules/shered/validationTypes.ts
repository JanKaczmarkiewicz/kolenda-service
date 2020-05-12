import * as yup from "yup";
import { Types } from "mongoose";
import errors from "./errors";

export const id = yup
  .string()
  .test("isObjectId", errors.id.invalid, Types.ObjectId.isValid);
