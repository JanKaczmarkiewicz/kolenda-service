import * as yup from "yup";
import errors from "./errors";
import commonErrors from "../shered/errors";
import { id, futureDate } from "../shered/validationTypes";
import {
  areAddedDatesValid,
  areUpdatedDatesValid,
} from "../../utils/visitTimeAndReeceTimeValidationHelpers";

export const addPastoralVisitSchema = yup.object().shape({
  reeceTime: futureDate
    .required(commonErrors.any.required)
    .test("isBeforeVisitTime", errors.reeceTime.afterVisitTime, function () {
      return areAddedDatesValid(this.parent);
    }),

  visitTime: futureDate
    .required(commonErrors.any.required)
    .test("isAfterReeceTime", errors.visitTime.beforeReeceTime, function () {
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

export const updatePastoralVisitSchema = yup.object().shape({
  id: id.required(commonErrors.any.required),

  reeceTime: futureDate.test(
    "isBeforeVisitTime",
    errors.reeceTime.afterVisitTime,
    function () {
      return areUpdatedDatesValid(this.parent);
    }
  ),

  visitTime: futureDate.test(
    "isAfterReeceTime",
    errors.visitTime.beforeReeceTime,
    function () {
      return areUpdatedDatesValid(this.parent);
    }
  ),
});
