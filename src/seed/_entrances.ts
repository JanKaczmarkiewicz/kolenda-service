import { Streets } from "./_housesAndStreets";
import { PastoralVisitDbObject, EntranceDbObject } from "../types/types";
import Entrance from "../models/Entrance";

const random = (from: number, to: number) =>
  Math.floor(Math.random() * (to - from)) + from;

export const getKeys = <T extends {}>(o: T): Array<keyof T> =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  <Array<keyof T>>Object.keys(o);

function* houseGenerator(streets: Streets) {
  for (const streetName of getKeys(streets))
    for (const house of streets[streetName]) {
      yield house;
    }
}

const randomComment = () => {
  const preposition = Math.random() > 0.5 ? "po" : "przed";
  return `${preposition} ${random(17, 21)}`;
};

export const createEntrances = async (
  streets: Streets,
  pastoralVisits: PastoralVisitDbObject[]
) => {
  const houses = houseGenerator(streets);

  const entrancesData = pastoralVisits.flatMap((pastoralVisit) => {
    const randomNumberOfHouses = random(25, 36);

    const entrances = [];
    for (let i = 0; i < randomNumberOfHouses; i++) {
      const house = houses.next().value;
      if (!house) break;

      const comment = Math.random() > 0.9 ? randomComment() : null;

      const entrance = {
        house: house._id,
        pastoralVisit: pastoralVisit._id,
        comment,
      };
      entrances.push(entrance);
    }
    return entrances;
  });

  return Promise.all(entrancesData.map((data) => new Entrance(data).save()));
};
