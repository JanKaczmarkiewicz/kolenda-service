import { dummySeasonData } from "../dummyData";
import Season from "../../models/Season";
import Day from "../../models/Day";

export const addDay = async () => {
  const mock = await mockDbBeforeAddingDay();

  const reeceDate = new Date().toISOString();
  const visitDate = new Date(Date.now() + 10000).toISOString();

  const day = await new Day({
    season: mock.season._id,
    reeceDate,
    visitDate,
    assignedStreets: [],
  }).save();

  return { ...mock, day };
};

export const mockDbBeforeAddingDay = async () => {
  const season = await new Season(dummySeasonData).save();

  return {
    season,
  };
};
