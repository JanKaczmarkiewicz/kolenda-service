import * as yup from "yup";
import { Types } from "mongoose";
import errors from "./errors";
import { isTimeAfterNow } from "../../testUtils/date";

export const id = yup
  .string()
  .test("isObjectId", errors.id.invalid, Types.ObjectId.isValid);

export const futureDate = yup
  .date()
  .test("isBeforeNow", errors.futureDate.beforeNow, isTimeAfterNow);
