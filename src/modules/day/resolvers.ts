import Entrance from "../../models/Entrance";
import Day from "../../models/Day";
import House from "../../models/House";
import PastoralVisit from "../../models/PastoralVisit";
import { Resolvers } from "../../types/types";
import Season from "../../models/Season";

export const resolvers: Resolvers = {
  Day: {
    id: (day) => day._id.toHexString(),
    season: async (day) =>
      day.season ? Season.findOne({ _id: day.season }) : null,
    unusedHouses: async (day) => {
      const { assignedStreets, season } = day;

      const [foundHouses, pastoralVisits] = await Promise.all([
        House.find({ street: { $in: assignedStreets } }),
        PastoralVisit.find({ season: season }),
      ]);

      const pastoralVisitsIds = pastoralVisits.map(({ _id }) => _id);
      const foundHousesIds = foundHouses.map(({ _id }) => _id);

      const foundEntrances = await Entrance.find({
        pastoralVisit: { $in: pastoralVisitsIds },
        house: { $in: foundHousesIds },
      });

      const inUseHousesIds = foundEntrances.map((entrance) =>
        entrance.house!.toHexString()
      );
      return foundHouses.filter(
        (house) => !inUseHousesIds.includes(house._id.toHexString())
      );
    },
    pastoralVisits: async (day) => PastoralVisit.find({ day: day._id }),
  },
  Mutation: {
    addDay: async (_, { input }) => new Day(input).save(),
    updateDay: async (_, { input: { id, ...rest } }) =>
      Day.findOneAndUpdate({ _id: id }, { $set: rest }, { new: true }),
  },
  Query: {
    day: async (_, { input }) => Day.findOne({ _id: input.id }),
    days: async (_, { input }) => Day.find({ season: input.season }),
  },
};
