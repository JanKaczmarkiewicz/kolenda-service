import { UserDbObject, SeasonDbObject } from "../types/types";
import PastoralVisit from "../models/PastoralVisit";

const random = (to: number) => Math.floor(Math.random() * to);

type Users = {
  priests: UserDbObject[];
  acolytes: UserDbObject[];
};

export const createPastoralVisits = async (
  season: SeasonDbObject,
  { priests: _priests, acolytes: _acolytes }: Users
) => {
  const initialDate = new Date(season.year, 0, 1);
  const currentDate = new Date(initialDate);

  const res = [];
  while (currentDate.getMonth() < 2) {
    currentDate.setHours(18);
    const reeceTime = currentDate.toISOString();

    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(16);
    const visitTime = currentDate.toISOString();

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

      res.push(
        new PastoralVisit({
          season: season._id.toHexString(),
          visitTime,
          reeceTime,
          priest: participantPriestId,
          acolytes: participantAcolytesId,
        }).save()
      );
    }
  }
  return Promise.all(res);
};
