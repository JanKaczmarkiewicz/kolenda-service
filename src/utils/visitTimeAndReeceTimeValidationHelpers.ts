import PastoralVisit from "../models/PastoralVisit";

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

export const areUpdatedDatesValid = ({
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

      // if date isn't provided in args then pick one from database document
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

export const areAddedDatesValid = (context: PastoralVisitDates) => {
  const reeceTime = new Date(context.reeceTime);
  const visitTime = new Date(context.visitTime);
  if (!isValidDate(visitTime) || !isValidDate(reeceTime)) return true; // other validator take care of that
  return compareDates(visitTime, reeceTime);
};

export const isValidDate = (d: Date) => d instanceof Date && isFinite(+d);

export const isTimeAfterNow = (time: string) =>
  isValidDate(new Date(time))
    ? new Date(time).getTime() - Date.now() > 0
    : true;
