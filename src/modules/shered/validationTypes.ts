import * as yup from "yup";
import { Types } from "mongoose";
import errors from "./errors";
import { isTimeAfterNow } from "../../utils/visitDateAndReeceDateValidationHelpers";

export const id = yup
  .string()
  .test("isObjectId", errors.id.invalid, (id) =>
    id ? Types.ObjectId.isValid(id) : true
  );

export const futureDate = yup
  .date()
  .test("isBeforeNow", errors.futureDate.beforeNow, isTimeAfterNow);
