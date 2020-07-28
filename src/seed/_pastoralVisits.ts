import { UserDbObject, SeasonDbObject } from "../types/types";
import PastoralVisit from "../models/PastoralVisit";
import Day from "../models/Day";

const random = (to: number) => Math.floor(Math.random() * to);

type Users = {
  priests: UserDbObject[];
  acolytes: UserDbObject[];
};

export const createPastoralVisits = async (
  season: SeasonDbObject,
  { priests: _priests, acolytes: _acolytes }: Users,
  streets: string[]
) => {
  const initialDate = new Date(season.year, 0, 1);
  const currentDate = new Date(initialDate);

  const pastoralVisits = [];
  const days = [];

  while (currentDate.getMonth() < 2) {
    const reeceDate = currentDate.toISOString();

    currentDate.setDate(currentDate.getDate() + 1);
    const visitDate = currentDate.toISOString();

    const day = await new Day({
      visitDate,
      reeceDate,
      season: season._id.toHexString(),
      assignedStreets: [],
    }).save();

    days.push(day);

    const priests = [..._priests];
    const acolytes = [..._acolytes];

    const numberOfDayActivities =
      Math.random() > 0.5 ? priests.length : priests.length - 1;

    for (let i = 0; i < numberOfDayActivities; i++) {
      const randomPriestIndex = random(priests.length);
      const randomAcolyteIndex = random(acolytes.length);

      const participantPriestId = priests
        .splice(randomPriestIndex, 1)
        .map(({ _id }) => _id.toHexString())[0];

      const participantAcolytesId = acolytes
        .splice(randomAcolyteIndex, 2)
        .map(({ _id }) => _id.toHexString());

      pastoralVisits.push(
        new PastoralVisit({
          day: day._id.toHexString(),
          hour: 16,
          priest: participantPriestId,
          acolytes: participantAcolytesId,
        }).save()
      );
    }
  }
  return { pastoralVisits: await Promise.all(pastoralVisits), days };
};
