import { Resolvers } from "../../types/types";
import House from "../../models/House";
import Street from "../../models/Street";
import Entrance from "../../models/Entrance";
import PastoralVisit from "../../models/PastoralVisit";

export const resolvers: Resolvers = {
  House: {
    id: (house) => house._id.toHexString(),
    street: async (house) =>
      Street.findOne({ _id: house.street?.toHexString() }),
  },
  Mutation: {
    addHouse: async (_, { input }) => new House(input).save(),
  },
  Query: {
    house: async (_, { input }) => House.findOne({ _id: input.id }),
    findUnused: async (_, { input }) => {
      const [foundHouses, pastoralVisits] = await Promise.all([
        House.find({ street: { $in: input.streets } }),
        PastoralVisit.find({ season: input.season }),
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
  },
};
