import * as yup from "yup";
import errors from "./errors";
import commonErrors from "../shered/errors";
import { id, futureDate } from "../shered/validationTypes";
import {
  areAddedDatesValid,
  areUpdatedDatesValid,
} from "../../utils/visitDateAndReeceDateValidationHelpers";

export const addDaySchema = yup.object().shape({
  reeceDate: futureDate
    .required(commonErrors.any.required)
    .test("isBeforeVisitDate", errors.reeceDate.afterVisitDate, function () {
      return areAddedDatesValid(this.parent);
    }),

  visitDate: futureDate
    .required(commonErrors.any.required)
    .test("isAfterReeceDate", errors.visitDate.beforeReeceDate, function () {
      return areAddedDatesValid(this.parent);
    }),

  priest: id.required(commonErrors.any.required),

  acolytes: yup
    .array()
    .of(id)
    .test("required", commonErrors.any.required, (acolytes) =>
      Array.isArray(acolytes)
    ),

  season: id.required(commonErrors.any.required),
});

export const updateDaySchema = yup.object().shape({
  id: id.required(commonErrors.any.required),

  reeceDate: futureDate.test(
    "isBeforeVisitDate",
    errors.reeceDate.afterVisitDate,
    function () {
      return areUpdatedDatesValid(this.parent);
    }
  ),

  visitDate: futureDate.test(
    "isAfterReeceDate",
    errors.visitDate.beforeReeceDate,
    function () {
      return areUpdatedDatesValid(this.parent);
    }
  ),
});
