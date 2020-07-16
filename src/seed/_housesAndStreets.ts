import Street from "../models/Street";
import House from "../models/House";
import { HouseDbObject } from "../types/types";

const fs = require("fs");
const path = require("path");

type StreetsAndHousesData = { [key: string]: string[] };
export type Streets = { [key: string]: HouseDbObject[] };

const loadStreetsAndHousesData = () =>
  fs
    .readFileSync(path.join(__dirname, "houses.csv"), { encoding: "utf8" })
    .split("\n")
    .reduce((obj: StreetsAndHousesData, line: string) => {
      const [street, number] = line.split(",");
      if (!(street in obj)) {
        obj[street] = [];
      }
      return { ...obj, [street]: [...obj[street], number] };
    }, {}) as StreetsAndHousesData;

export const createStreetsAndHouses = async () => {
  const streetsAndHousesData = loadStreetsAndHousesData();
  const data: Streets = Object.keys(streetsAndHousesData).reduce(
    async (res, streetName) => {
      const housesNumbers = streetsAndHousesData[streetName];

      const { _id } = await new Street({ name: streetName }).save();

      const houses = await Promise.all(
        housesNumbers.map((houseNumber: string) =>
          new House({ street: _id, number: houseNumber }).save()
        )
      );
      return { ...(await res), [_id.toHexString()]: houses };
    },
    {}
  );

  return data;
};
