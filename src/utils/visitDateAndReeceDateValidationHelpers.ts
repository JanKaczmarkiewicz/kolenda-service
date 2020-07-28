import Day from "../models/Day";

type DayDates = {
  visitDate: ToDate;
  reeceDate: ToDate;
};

type ToDate = ConstructorParameters<typeof Date>[0];

type UpdateDaySchemaContext = Partial<
  {
    id: string;
  } & DayDates
>;

export const areUpdatedDatesValid = async ({
  id,
  visitDate,
  reeceDate,
}: UpdateDaySchemaContext) => {
  const noInput: boolean = (!reeceDate && !visitDate) || !id;
  if (noInput) return true; // there actually nothing to check

  const foundDay = await Day.findOne({
    _id: id,
  });

  if (!foundDay) return true; // if id is not valid then this test should pass
  // if date isn't provided in args then pick one from database document
  const visitDateToCompare = visitDate ?? foundDay.visitDate;
  const reeceDateToCompare = reeceDate ?? foundDay.reeceDate;

  return compareDates(
    new Date(visitDateToCompare),
    new Date(reeceDateToCompare)
  );
};

const compareDates = (t1: Date, t2: Date) => t1.getTime() - t2.getTime() > 0;

export const areAddedDatesValid = (context: DayDates) => {
  const reeceTime = new Date(context.reeceDate);
  const visitTime = new Date(context.visitDate);
  if (!isValidDate(visitTime) || !isValidDate(reeceTime)) return true; // other validator take care of that
  return compareDates(visitTime, reeceTime);
};

export const isValidDate = (d: Date) => d instanceof Date && isFinite(+d);

export const isTimeAfterNow = (time: string) =>
  isValidDate(new Date(time))
    ? new Date(time).getTime() - Date.now() > 0
    : true;
