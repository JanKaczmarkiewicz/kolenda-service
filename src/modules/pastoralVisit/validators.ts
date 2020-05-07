import * as yup from "yup";
import PastoralVisit from "../../models/PastoralVisit";
import * as mongoose from "mongoose";

const checkTimes = async ({
  id,
  visitTime,
  reeceTime,
}: {
  id: string;
  visitTime: string | null | undefined;
  reeceTime: string | null | undefined;
}) => {
  const noInput: boolean = !reeceTime && !visitTime;
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

export const addPastoralVisitSchema = yup.object().shape({
  reeceTime: yup.date().min(new Date(Date.now())).required(),
  visitTime: yup.date().min(yup.ref("reeceTime")).required(),
});

export const updatePastoralVisitSchema = yup.object().shape({
  id: yup
    .string()
    .test("", "Bad id", mongoose.Types.ObjectId.isValid)
    .required(),
  reeceTime: yup
    .date()
    .min(new Date(Date.now()))
    .test("", "reeceTime should be before visitTime", function (reeceTime) {
      return checkTimes({
        id: this.parent.id,
        reeceTime,
        visitTime: this.parent.visitTime,
      });
    }),
  visitTime: yup
    .date()
    .test("", "Visit time should be after reeceTime", function (visitTime) {
      return checkTimes({
        id: this.parent.id,
        reeceTime: this.parent.reeceTime,
        visitTime,
      });
    }),
});
