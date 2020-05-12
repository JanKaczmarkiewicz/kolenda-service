import * as yup from "yup";
import PastoralVisit from "../../models/PastoralVisit";
import errors from "./errors";
import commonErrors from "../shered/errors";
import { id, futureDate } from "../shered/validationTypes";
import { isValidDate } from "../../testUtils/date";

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

type PastoralVisitDates = {
  visitTime: ToDate;
  reeceTime: ToDate;
};

type ToDate = ConstructorParameters<typeof Date>[0];

type UpdatePastoralVisitSchemaContext = Partial<
  {
    id: string;
  } & PastoralVisitDates
>;

const areUpdatedDatesValid = ({
  id,
  visitTime,
  reeceTime,
}: UpdatePastoralVisitSchemaContext) => {
  const noInput: boolean = (!reeceTime && !visitTime) || !id;
  if (noInput) return true; // there actually nothing to check

  return PastoralVisit.findOne({
    _id: id,
  })
    .then((foundPastoralVisit) => {
      if (!foundPastoralVisit) return true; // if id is not valid then this test should pass

      //if date isn't provided in args then pick one from database document
      const visitTimeToCompare = visitTime ?? foundPastoralVisit.visitTime;
      const reeceTimeToCompare = reeceTime ?? foundPastoralVisit.reeceTime;

      return compareDates(
        new Date(visitTimeToCompare),
        new Date(reeceTimeToCompare)
      );
    })
    .catch((err) => {
      return true;
    });
};

const compareDates = (t1: Date, t2: Date) => t1.getTime() - t2.getTime() > 0;

const areAddedDatesValid = (context: PastoralVisitDates) => {
  const reeceTime = new Date(context.reeceTime);
  const visitTime = new Date(context.visitTime);
  if (!isValidDate(visitTime) || !isValidDate(reeceTime)) return true; // other validator take care of that
  return compareDates(visitTime, reeceTime);
};
