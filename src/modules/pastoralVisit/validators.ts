import * as yup from "yup";
import PastoralVisit from "../../models/PastoralVisit";
import errors from "./errors";
import commonErrors from "../shered/errors";
import { isTimeAfterNow } from "../../testUtils/date";
import { id } from "../shered/validationTypes";

const futureDate = yup
  .date()
  .test("isBeforeNow", commonErrors.futureDate.beforeNow, isTimeAfterNow);

export const addPastoralVisitSchema = yup.object().shape({
  reeceTime: futureDate.required(),
  visitTime: futureDate.required(),
});

export const updatePastoralVisitSchema = yup.object().shape({
  id: id.required(),

  reeceTime: futureDate.test(
    "isBeforeVisitTime",
    errors.reeceTime.afterVisitTime,
    function () {
      return checkTimes(this.parent);
    }
  ),

  visitTime: futureDate.test(
    "isAfterReeceTime",
    errors.visitTime.beforeReeceTime,
    function () {
      return checkTimes(this.parent);
    }
  ),
});

const checkTimes = ({
  id,
  visitTime,
  reeceTime,
}: {
  id: string;
  visitTime: string | null | undefined;
  reeceTime: string | null | undefined;
}) => {
  const noInput: boolean = (!reeceTime && !visitTime) || !id;
  if (noInput) return true; // there actually nothing to check

  return PastoralVisit.findOne({
    _id: id,
  })
    .then((foundPastoralVisit) => {
      if (!foundPastoralVisit) return true; // if id is not valid then this test should pass

      const visitTimeToCompare = visitTime ?? foundPastoralVisit.visitTime;
      const reeceTimeToCompare = reeceTime ?? foundPastoralVisit.reeceTime;

      return (
        new Date(visitTimeToCompare).getTime() -
          new Date(reeceTimeToCompare).getTime() >
        0
      );
    })
    .catch((err) => {
      return true;
    });
};
