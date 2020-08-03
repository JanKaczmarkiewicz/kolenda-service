import { Resolvers } from "../../types/types";
import Street from "../../models/Street";
import House from "../../models/House";
import Day from "../../models/Day";
import PastoralVisit from "../../models/PastoralVisit";
import Entrance from "../../models/Entrance";

export const resolvers: Resolvers = {
  Mutation: {
    addStreet: async (_, { input }) => new Street(input).save(),
    updateStreet: async (_, { input: { id, ...rest } }) =>
      Street.findOneAndUpdate({ _id: id }, { $set: rest }, { new: true }),
  },
  Street: {
    id: (street) => street._id.toHexString(),
    houses: async (street) => House.find({ street: street._id }),
    unusedHouses: async (street, { season }) => {
      // what wrong:  4 dependent database calls, could I made it better?

      // what if (Days <- PastoralVisit <- Entrance) squash into one query?

      const daysIds = await Day.find({ season }).distinct("_id"); // from 60 to 80 results

      const [foundHouses, pastoralVisitsIds] = await Promise.all([
        House.find({ street: street._id }), // from 10 to 100 results
        PastoralVisit.find({ day: { $in: daysIds } }).distinct("_id"), // from (2 to 6) * number of Days results
      ]);

      const foundHousesIds = foundHouses.map(({ _id }) => _id);

      const inUseHousesIds = await Entrance.find({
        pastoralVisit: { $in: pastoralVisitsIds },
        house: { $in: foundHousesIds },
      }).distinct("house");

      const inUseHousesIdsStr = inUseHousesIds.map((houseId) =>
        houseId.toHexString()
      );

      return foundHouses.filter(
        (house) => !inUseHousesIdsStr.includes(house._id.toHexString())
      );
    },
  },
  Query: {
    street: async (_, { input }) => Street.findOne({ _id: input.id }),
    streets: async () => Street.find(),
  },
};
